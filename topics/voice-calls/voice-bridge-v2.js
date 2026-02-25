#!/usr/bin/env node
/**
 * Voice Bridge v2: ElevenLabs ConvAI → OpenClaw → Tazer (LIVE)
 *
 * Receives voice input from ElevenLabs webhook
 * Forwards to OpenClaw session via file-based messaging
 * Polls for Tazer's response and returns it
 */
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3002;

const INPUT_DIR = path.join(__dirname, '../../shared/voice-inputs');
const OUTPUT_DIR = path.join(__dirname, '../../shared/voice-outputs');

// Ensure dirs exist
async function ensureDirs() {
    await fs.mkdir(INPUT_DIR, { recursive: true });
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
}

/**
 * Main endpoint - ElevenLabs calls this
 * POST /api/conversation
 */
app.post('/api/conversation', async (req, res) => {
    const { message, user_id, conversation_id } = req.body;

    console.log('\n📞 Voice message received:', message);
    console.log('   From:', user_id || 'evan-voice');
    console.log('   Time:', new Date().toISOString());

    try {
        const response = await processWithTazer(message, user_id || 'evan-voice');
        console.log('📤 Sending response:', response.slice(0, 100) + '...');
        res.json({ text: response, end_call: false });
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.json({
            text: "I'm having trouble connecting to Tazer right now. He should be back online shortly.",
            end_call: false
        });
    }
});

/**
 * Live processing via file-based communication with Tazer
 */
async function processWithTazer(message, userId) {
    await ensureDirs();

    const turnId = Date.now().toString();
    const voiceInput = {
        type: 'voice-call',
        turnId: turnId,
        timestamp: new Date().toISOString(),
        user: userId,
        message: message,
        source: 'elevenlabs-phone'
    };

    // Write input for Tazer
    const inputFile = path.join(INPUT_DIR, `voice-${turnId}.json`);
    await fs.writeFile(inputFile, JSON.stringify(voiceInput, null, 2));
    console.log('  📝 Queued for Tazer:', turnId);

    // Poll for response (max 30 seconds)
    const responseFile = path.join(OUTPUT_DIR, `response-${turnId}.json`);

    for (let i = 0; i < 30; i++) {
        await new Promise(r => setTimeout(r, 1000));

        try {
            const data = await fs.readFile(responseFile, 'utf8');
            await fs.unlink(responseFile).catch(() => {});
            const parsed = JSON.parse(data);
            console.log('  ✅ Got response from Tazer');
            return parsed.text;
        } catch (e) {
            // Still waiting
        }
    }

    // Timeout - clean up input file
    await fs.unlink(inputFile).catch(() => {});
    throw new Error('Tazer response timeout');
}

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'voice-bridge-v2',
        mode: 'LIVE',
        timestamp: new Date().toISOString()
    });
});

// Root info
app.get('/', (req, res) => {
    res.json({
        service: 'OpenClaw Voice Bridge v2',
        mode: 'LIVE (Tazer-connected)',
        endpoints: {
            '/api/conversation': 'POST - ElevenLabs webhook',
            '/health': 'GET - Health check'
        }
    });
});

// Cleanup old files periodically
setInterval(async () => {
    try {
        const files = await fs.readdir(INPUT_DIR);
        const now = Date.now();
        for (const file of files) {
            if (file.startsWith('voice-') && file.endsWith('.json')) {
                const id = parseInt(file.replace('voice-', '').replace('.json', ''));
                if (now - id > 5 * 60 * 1000) { // 5 min old
                    await fs.unlink(path.join(INPUT_DIR, file)).catch(() => {});
                }
            }
        }
    } catch (e) {}
}, 60 * 1000);

app.listen(PORT, '0.0.0.0', () => {
    console.log('🎙️ Voice Bridge v2 — LIVE MODE');
    console.log('   Local: http://localhost:' + PORT);
    console.log('   Health: http://localhost:' + PORT + '/health');
    console.log('');
    console.log('   ElevenLabs URL:');
    console.log('   https://unindulgent-fatigued-tierra.ngrok-free.app/api/conversation');
    console.log('');
    console.log('   Tazer will poll: ~/clawd/shared/voice-inputs/');
    console.log('   Tazer will write: ~/clawd/shared/voice-outputs/');
});
