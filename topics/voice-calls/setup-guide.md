# ElevenLabs Voice Call + OpenClaw Setup Guide

## What This Is
Call your OpenClaw (Tazer) from any phone — full voice conversation using ElevenLabs ConvAI.

## Prerequisites
- ✅ ElevenLabs account (you have)
- ✅ Twilio number (you have)  
- ✅ OpenClaw running on Mac mini (port 18789)
- ⬜ ngrok for public URL (need to install)

## Step 1: Install ngrok on Mac Mini

```bash
# Option A: Homebrew (easiest)
brew install ngrok

# Option B: Download
# https://ngrok.com/download

# Authenticate (sign up free at ngrok.com first)
ngrok config add-authtoken YOUR_NGROK_TOKEN

# Start tunnel to OpenClaw
cd ~
ngrok http 18789
```

**You'll get:** `https://abc123-def.ngrok-free.app` — save this URL.

---

## Step 2: Simple Bridge (Recommended First)

Create `voice-bridge.js`:

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// ElevenLabs calls this endpoint
app.post('/api/conversation', (req, res) => {
  const { message } = req.body;
  
  console.log('Voice message:', message);
  
  // TODO: Connect to OpenClaw to get Tazer's response
  // For now, echo back
  res.json({
    text: `I heard: ${message}. Tazer will respond here.`,
    end_call: false
  });
});

app.listen(3001, () => console.log('Bridge on http://localhost:3001'));
```

Run:
```bash
cd /Users/evanborenstein/clawd/builds/voice-call-setup
npm init -y
npm install express
node voice-bridge.js
```

---

## Step 3: Expose Bridge with ngrok

```bash
# New terminal
ngrok http 3001
```

Get public URL: `https://xyz789.ngrok-free.app`

---

## Step 4: Configure ElevenLabs Agent

1. Go to https://elevenlabs.io/app/conversational-ai
2. Create agent
3. **System prompt:** "You are Tazer, Evan's AI executive assistant. Help with tasks, ideas, and organization."
4. **Server URL:** `https://xyz789.ngrok-free.app/api/conversation`

---

## Step 5: Add Phone Number

ElevenLabs → Agent → Phone Numbers
- Use their number: Free
- Or connect Twilio: Add credentials

---

## Call and Test

Dial the number → "Hey Tazer, what's my day look like?"

---

## To Connect Real OpenClaw

Replace the echo in voice-bridge.js with actual OpenClaw call.

Options:
- Use `openclaw` CLI to send message to session
- Use `sessions_send` tool via API
- Direct memory/file writes

---

*Created: 2026-02-24*
