# ElevenLabs ConvAI Setup Guide — Research Summary

## Overview
Source: ElevenLabs docs + official integrations page

---

## Two Separate Webhook Settings

### 1. Server URL (Conversation Webhook) — **THIS IS WHAT WE NEED**
**Where:** Agent → Settings → Server/Webhook section
**Purpose:** Called for EVERY message during conversation
**Method:** POST
**Request body:**
```json
{
  "message": "The user's spoken text",
  "user_id": "user-identifier",
  "conversation_id": "conv-123",
  "voice_id": "voice-xyz"
}
```
**Response format:**
```json
{
  "text": "Response to speak back to user",
  "end_call": false,
  "transfer_to": null
}
```

**What we set:**
```
https://unindulgent-fatigued-tierra.ngrok-free.app/api/conversation
```

---

### 2. Conversation Initiation Webhook — **OPTIONAL (What you configured)**
**Where:** Agents Settings (workspace level) OR Agent → Initiation tab
**Purpose:** Called ONCE when call starts to fetch custom data
**Method:** POST
**Request body:**
```json
{
  "type": "conversation_initiation_client_data_request"
}
```
**Use case:** Fetch user context (caller ID, customer data) before conversation begins

**You already configured this at workspace level**

---

## Where to Find Server URL Setting

**Path to Conversation Server URL:**
1. ElevenLabs Dashboard → "Conversational AI" (sidebar)
2. Click on **Your Agent** (not Settings)
3. Look for tabs at top: "Agent" / "Knowledge Base" / "Tools" / "Server" / "Calls"
4. Click **"Server"** or **"Configuration"**
5. Look for: "Server URL" or "Webhook URL" field
6. Paste the ngrok URL: `https://unindulgent-fatigued-tierra.ngrok-free.app/api/conversation`

---

## Twilio Integration Flow

**Twilio native integration steps (from ElevenLabs docs):**

1. **Import Twilio credentials** to ElevenLabs
   - Account SID
   - Auth Token
   
2. **Import your Twilio phone number**
   - Choose the number from your Twilio account
   
3. **Link number to agent**
   - In number settings, select which agent answers

4. **Done** — calls go through Twilio → ElevenLabs → Our Server → Tazer response

---

## Authentication (Optional but Recommended)

### Option A: Header secret in ElevenLabs Server URL
- Add request headers in agent settings
- Name: `Authorization`
- Value: `Bearer YOUR_SECRET`
- Update bridge to verify this header

### Option B: URL token
- Include in URL: `https://url/api/conversation?token=SECRET`
- Bridge verifies query param

**Status:** Currently running without auth (fine for testing)

---

## Current System State

| Component | Status | Notes |
|-----------|--------|-------|
| Bridge v2 | ✅ Running | Port 3005, live Tazer polling |
| ngrok | ✅ Active | `unindulgent-fatigued-tierra.ngrok-free.app` |
| Initiation webhook | ✅ Set | (Optional, workspace level) |
| Server webhook | ⬜ **PENDING** | Need to configure on agent |
| Twilio number | ✅ Ready | (From your account) |

---

## When ElevenLabs Site is Back

**To complete setup:**

1. Go to: https://elevenlabs.io/app/conversational-ai
2. Click your agent
3. Find **"Server"** tab
4. Paste: `https://unindulgent-fatigued-tierra.ngrok-free.app/api/conversation`
5. Save

**Test:** Call your Twilio number → Should hear bot respond with actual Tazer replies

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Webhook not responding" | Check bridge is running: `curl http://localhost:3005/health` |
| ngrok tunnel down | Restart: `ngrok http 3005` |
| Tazer not responding | Check `shared/voice-inputs/` has new files |
| 30s timeout | Bridge waits 30s for response, then "Tazer response timeout" |

---

*Research completed: 2026-02-25*
*Source: ElevenLabs docs, integration pages*
