#!/usr/bin/env node
/**
 * Voice Bridge: ElevenLabs ConvAI → OpenClaw → Tazer
 * 
 * Receives voice input from ElevenLabs webhook
 * Forwards to OpenClaw session
 * Returns response for ElevenLabs to speak
 */

const express = require('express');
const { spawn, exec } = require('child_process');
const path = require('path');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Simple in-memory conversation context
const sessions = new Map();

/**
 * Main endpoint - ElevenLabs calls this
 * POST /api/conversation
 */
app.post('/api/conversation', async (req, res) => {
  const { message, user_id, conversation_id } = req.body;
  
  console.log('📞 Voice message received:', message);
  console.log('   From:', user_id || 'unknown');
  
  try {
    // Method 1: Write to shared file for Tazer to pick up
    // Method 2: Direct OpenClaw integration (if available)
    // Method 3: Simple echo with context
    
    const response = await processWithOpenClaw(message, user_id);
    
    console.log('📤 Sending response:', response);
    
    res.json({
      text: response,
      end_call: false
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
    res.json({
      text: "I'm having trouble connecting right now. Please try again.",
      end_call: false
    });
  }
});

/**
 * Attempt to connect to OpenClaw/Tazer
 */
async function processWithOpenClaw(message, userId = 'evan-voice') {
  
  // Option 1: Write voice input to shared file
  // Tazer can poll this and reply via Telegram
  const timestamp = new Date().toISOString();
  const voiceInput = {
    type: 'voice-call',
    timestamp: timestamp,
    user: userId,
    message: message,
    source: 'elevenlabs-phone'
  };
  
  // Write to shared folder for Tazer
  const fs = require('fs').promises;
  const sharedDir = path.join(__dirname, '../../shared/voice-inputs');
  
  try {
    await fs.mkdir(sharedDir, { recursive: true });
    const filename = `voice-${Date.now()}.json`;
    await fs.writeFile(
      path.join(sharedDir, filename),
      JSON.stringify(voiceInput, null, 2)
    );
    console.log('   📁 Saved to:', filename);
  } catch (e) {
    console.error('   Failed to save:', e);
  }
  
  // For now, return a contextual response
  // TODO: Connect to actual OpenClaw session
  
  const responses = [
    `I heard you say: "${message}". I'm processing this through your OpenClaw agent.`,
    "This is a demo response. The full bridge would: (1) receive your voice, (2) forward to Tazer via OpenClaw, (3) get actual response, (4) speak it back.",
    `Voice bridge active! You said: ${message}. Status: Waiting for full OpenClaw integration.`
  ];
  
  // Simple pattern matching for demo
  const lower = message.toLowerCase();
  
  if (lower.includes('weather')) {
    return "It's 72 degrees and sunny in Winter Park, Florida. Perfect day for a walk!";
  }
  
  if (lower.includes('task') || lower.includes('todo')) {
    return "You have 4 items on today's list: Research AI in AirPods, Build Evan's Brain system, Set up Twitter agent, and one pending book promotion task.";
  }
  
  if (lower.includes('idea') || lower.includes('brain')) {
    return "Got it! I've saved your idea. This bridge will eventually write directly to your second brain system.";
  }
  
  if (lower.includes('crabby')) {
    return "Crabby is your other agent, coordinating via GitHub. I can see your shared context. We're both tracking your open tasks.";
  }
  
  // Default contextual response
  return responses[0];
}

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'voice-bridge',
    timestamp: new Date().toISOString()
  });
});

/**
 * Root - show info
 */
app.get('/', (req, res) => {
  res.json({
    service: 'OpenClaw Voice Bridge',
    version: '0.1.0',
    endpoints: {
      '/api/conversation': 'POST - ElevenLabs webhook',
      '/health': 'GET - Health check'
    },
    instructions: `
      Configure ElevenLabs ConvAI:
      1. Server URL: https://your-ngrok-url/api/conversation
      2. System prompt: "You are Tazer, Evan's AI executive assistant. Treat conversations as short, actionable responses."
      3. Call the assigned number and speak naturally.
    `
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('🎙️  Voice Bridge running');
  console.log('   Local:   http://localhost:' + PORT);
  console.log('   Health:  http://localhost:' + PORT + '/health');
  console.log('');
  console.log('   Ready for ElevenLabs configuration:');
  console.log('   1. Copy your ngrok HTTPS URL');
  console.log('   2. Add /api/conversation to the end');
  console.log('   3. Paste into ElevenLabs agent settings');
  console.log('');
});

module.exports = app;
