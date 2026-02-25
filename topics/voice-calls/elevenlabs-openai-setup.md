# ElevenLabs + Tazer Setup — OpenAI-Compatible Custom LLM

## Summary
Tazer becomes the agent brain via OpenAI-compatible API. Full context, memory, tools.

---

## Architecture

```
Phone → ElevenLabs → ngrok → Bridge (/v1) → File-based → Tazer
                                  ↓
                           OpenAI format
```

---

## ElevenLabs Configuration

### Step 1: Custom LLM Mode

**Location:** Agent → LLM section → Select `Custom LLM`

**Settings:**

| Field | Value |
|-------|-------|
| **Server URL** | `https://unindulgent-fatigued-tierra.ngrok-free.app/v1` |
| **Model** | `openclaw-tazer` (any name works) |
| **Secret** | None needed, or create if you want auth |

**Optional flags:**
- `Limit token usage` — Set to 5000
- `Custom LLM extra body` — Can be true

---

## How It Works

### ElevenLabs sends:
```json
{
  "model": "openclaw-tazer",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant..."},
    {"role": "user", "content": "What's on my calendar today?"}
  ]
}
```

### Bridge receives → Saves to file → Polls for Tazer's response

### Bridge returns (OpenAI format):
```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "Let me check your calendar..."
    }
  }]
}
```

---

## Tazer's Side: File Watcher

Tazer monitors: `~/clawd/shared/voice-inputs/`

On new file, Tazer:
1. Reads the message + conversation history
2. Uses tools/memory as needed
3. Writes response to: `~/clawd/shared/voice-outputs/response-{id}.json`
4. Bridge picks up response → returns to ElevenLabs

---

## Current Status

| Component | Status |
|-----------|--------|
| Bridge v3 (OpenAI-compatible) | ⏳ Starting...
| ngrok tunnel | ✅ Active |
| File directories | ✅ Ready |
| ElevenLabs config | ⬜ Awaiting site recovery |

---

## When ElevenLabs is Back Up

1. Go to **Agent → LLM**
2. Select **Custom LLM**
3. Paste: `https://unindulgent-fatigued-tierra.ngrok-free.app/v1`
4. Save settings
5. Call your Twilio number
6. Talk to Tazer! 🐺

---

## Test Commands

```bash
# Check bridge health
curl http://localhost:3005/health

# Test OpenAI endpoint
curl -X POST http://localhost:3005/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}]}'
```

---

*Updated: 2026-02-25*
