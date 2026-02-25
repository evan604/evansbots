#!/usr/bin/env node
/**
 * OpenClaw Voice Bridge v3 — OpenAI-Compatible Custom LLM
 * 
 * ElevenLabs ConvAI → Custom LLM (OpenAI format) → Tazer Live
 * This makes Tazer the actual agent brain with full tool access
 */
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.use(express.json({ limit: '10mb' }));
const PORT = process.env.PORT || 3005;

const INPUT_DIR = path.join(__dirname, '../../shared/voice-inputs');
const OUTPUT_DIR = path.join(__dirname, '../../shared/voice-outputs');

// Ensure dirs exist
async function ensureDirs() {
    await fs.mkdir(INPUT_DIR, { recursive: true });
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
}

/**
 * OpenAI-compatible chat completions endpoint
 * ElevenLabs Custom LLM mode calls this
 * POST /v1/chat/completions
 */
app.post('/v1/chat/completions', async (req, res) => {
    const { messages, model, tools, tool_choice } = req.body;
    
    // Get the latest user message
    const userMessage = messages.filter(m => m.role === 'user').pop();
    const userText = userMessage?.content || '';
    
    console.log('\n🎙️ Voice call received:', userText.slice(0, 100));
    console.log('   Messages:', messages.length);
    console.log('   Model requested:', model);
    
    try {
        const responseText = await processWithTazer(userText, messages);
        
        // Return OpenAI-compatible response
        const openaiResponse = {
            id: `chatcmpl-${Date.now()}`,
            object: 'chat.completion',
            created: Math.floor(Date.now() / 1000),
            model: model || 'openclaw-tazer',
            choices: [{
                index: 0,
                message: {
                    role: 'assistant',
                    content: responseText
                },
                finish_reason: 'stop'
            }],
            usage: {
                prompt_tokens: JSON.stringify(messages).length / 4,
                completion_tokens: responseText.length / 4,
                total_tokens: (JSON.stringify(messages).length + responseText.length) / 4
            }
        };
        
        console.log('   📤 Response sent:', responseText.slice(0, 100) + '...');
        res.json(openaiResponse);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({
            error: {
                message: error.message,
                type: 'internal_error'
            }
        });
    }
});

/**
 * Legacy ElevenLabs Tools webhook (optional)
 * POST /api/conversation
 */
app.post('/api/conversation', async (req, res) => {
    const { message, user_id } = req.body;
    console.log('\n📞 [Legacy] Voice message:', message);
    
    try {
        const response = await processWithTazer(message || req.body.text);
        res.json({ text: response, end_call: false });
    } catch (error) {
        res.json({ text: "Having trouble connecting. Please try again.", end_call: false });
    }
});

/**
 * File-based Tazer communication
 */
async function processWithTazer(message, conversationHistory = []) {
    await ensureDirs();
    
    const turnId = Date.now().toString();
    const turnData = {
        type: 'voice-call',
        turnId: turnId,
        timestamp: new Date().toISOString(),
        user: 'evan-voice',
        message: message,
        conversation_history: conversationHistory,
        source: 'elevenlabs-openai',
        headers: {
            system: "You are Tazer, Evan's AI Executive at Highland Private Office. Help with tasks, ideas, and organization. Keep responses conversational and actionable.",
            tools_available: [
                "web_search",
                "web_fetch", 
                "file_operations",
                "exec",
                "sessions_send",
                "message"
            ]
        }
    };

    // Write input
    const inputFile = path.join(INPUT_DIR, `voice-${turnId}.json`);
    await fs.writeFile(inputFile, JSON.stringify(turnData, null, 2));
    console.log('   📝 Queued for Tazer:', turnId);

    // Poll for response
    const responseFile = path.join(OUTPUT_DIR, `response-${turnId}.json`);
    
    for (let i = 0; i < 30; i++) {
        await new Promise(r => setTimeout(r, 1000));
        try {
            const data = await fs.readFile(responseFile, 'utf8');
            await fs.unlink(responseFile).catch(() => {});
            const parsed = JSON.parse(data);
            console.log('   ✅ Got Tazer response');
            return parsed.text;
        } catch (e) {
            // Still waiting
        }
    }
    
    // Timeout fallback
    await fs.unlink(inputFile).catch(() => {});
    throw new Error('Tazer response timeout');
}

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'openclaw-bridge-v3',
        mode: 'OPENAI_COMPATIBLE',
        timestamp: new Date().toISOString()
    });
});

// Root info
app.get('/', (req, res) => {
    res.json({
        service: 'OpenClaw Voice Bridge v3',
        mode: 'OpenAI-Compatible Custom LLM',
        endpoints: {
            '/v1/chat/completions': 'POST - OpenAI chat completions (Custom LLM)',
            '/api/conversation': 'POST - Legacy ElevenLabs webhook',
            '/health': 'GET - Health check'
        },
        elevenlabs_config: {
            type: 'Custom LLM',
            server_url: 'https://your-ngrok-url/v1',
            supports_tools: true
        }
    });
});

// Cleanup old files
setInterval(async () => {
    try {
        const files = await fs.readdir(INPUT_DIR);
        const now = Date.now();
        for (const file of files) {
            if (file.startsWith('voice-') && file.endsWith('.json')) {
                const id = parseInt(file.replace('voice-', '').replace('.json', ''));
                if (now - id > 5 * 60 * 1000) {
                    await fs.unlink(path.join(INPUT_DIR, file)).catch(() => {});
                }
            }
        }
    } catch (e) {}
}, 60 * 1000);

app.listen(PORT, '0.0.0.0', () => {
    console.log('🎙️ OpenClaw Bridge v3 — OpenAI-Compatible');
    console.log('   Local:     http://localhost:' + PORT);
    console.log('   Health:    http://localhost:' + PORT + '/health');
    console.log('   OpenAI:    http://localhost:' + PORT + '/v1/chat/completions');
    console.log('');
    console.log('   ElevenLabs Custom LLM URL:');
    console.log('   https://YOUR_NGROK/v1');
    console.log('');
    console.log('   Or (with trailing slash handling):');
    console.log('   https://YOUR_NGROK/v1/chat/completions');
});
