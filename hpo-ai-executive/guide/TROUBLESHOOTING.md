# Troubleshooting Guide
## HPO AI Executive — Common Issues & Fixes

---

## Issue 1: AI Not Responding

**Symptoms:** Messages sent, no reply.

**Likely Cause:** Gateway down or model provider error.

**Fix:**
1. Check if `openclaw gateway status` shows "running"
2. If not, run `openclaw gateway start`
3. Check model API key in `~/.openclaw/openclaw.json`
4. Try sending test message again

**Contact:** If still down, email evanborenstein@gmail.com

---

## Issue 2: Telegram Messages Not Coming Through

**Symptoms:** Telegram not receiving or sending.

**Likely Cause:** Chat not paired or bot token invalid.

**Fix:**
1. Check Telegram bot token in config
2. Send `/start` to bot
3. If pairing needed, pairing code appears — run: `openclaw pairing approve telegram [CODE]`
4. Test: Send "ping" — should get reply

---

## Issue 3: iMessage Not Working

**Symptoms:** Cannot send/receive iMessages.

**Likely Cause:** Missing Automation permission.

**Fix:**
1. Open System Settings → Privacy & Security → Automation
2. Find Terminal (or your OpenClaw Terminal)
3. Check "Messages" permission
4. Test: Try sending message to yourself

**Note:** iMessage sometimes takes 30-60s to deliver. Be patient.

---

## Issue 4: Apple Notes Permission Denied

**Symptoms:** "Cannot access Notes" or empty results.

**Likely Cause:** macOS privacy restriction.

**Fix:**
1. System Settings → Privacy & Security → Reminders
2. Add Terminal (or your terminal app)
3. May also need "Notes" permission (if separate)
4. Re-run command

**Note:** First access triggers system prompt — click "Allow."

---

## Issue 5: Brave Search Not Working

**Symptoms:** "missing_brave_api_key" error.

**Likely Cause:** API key not set in environment.

**Fix:**
1. Get API key from brave.com/search/api
2. Add to config: `openclaw configure --key brave_api_key --value [KEY]`
3. Or: `export BRAVE_API_KEY=[KEY]` in shell
4. Restart gateway: `openclaw gateway restart`

---

## Issue 6: Heartbeat Not Triggering

**Symptoms:** No automated morning/midday checks.

**Likely Cause:** No cron job set up.

**Fix:**
1. Verify `HEARTBEAT.md` exists and has time windows
2. Check if cron job exists: `openclaw cron list`
3. If missing, create job via `cron` tool
4. Ensure timezone set correctly (EST/EDT for Evan)

**Alternative:** Manual check by asking "What time is it?" and "Check heartbeat"

---

## Issue 7: Subagent Timeout

**Symptoms:** "Task timed out" or long delays.

**Likely Cause:** Task too complex or API slow.

**Fix:**
1. Simplify task — break into smaller requests
2. Increase timeout: `runTimeoutSeconds: 600` (10 min)
3. Check model provider status (NVIDIA NIM may be slow)
4. Try again later

---

## Issue 8: File Upload Failing

**Symptoms:** Cannot open/read files sent.

**Likely Cause:** Format not supported or file too large.

**Fix:**
1. Check file size: under 50MB for Telegram
2. Supported formats: .txt, .md, .pdf, .jpg, .png, .zip
3. Try compressing large files
4. For unsupported formats, describe contents instead

---

## Issue 9: Calendar Not Syncing

**Symptoms:** "Cannot read calendar" or empty results.

**Likely Cause:** Calendar permissions or account not linked.

**Fix:**
1. Check calendar skill installed: `clawhub list`
2. For Google Calendar: ensure API key and calendar ID set
3. For Apple Calendar: grant permission in System Settings
4. Verify calendar has events on requested date

---

## Issue 10: Voice Announcements Not Playing

**Symptoms:** sag skill installed but no audio.

**Likely Cause:** ElevenLabs API key missing or output device wrong.

**Fix:**
1. Add ElevenLabs API key to config
2. Test volume on Mac
3. Check default audio output device
4. Try: "Say hello out loud" — should play audio

---

## Quick Diagnostics

**Check what I can see:**
```
"What's my name?" → Should say your name from USER.md
"What's my timezone?" → Should match your location
"List my skills" → Shows installed capabilities
```

**Check connectivity:**
```
"Send test message to Telegram" → Should confirm delivery
"Check weather" → Should return local weather
"Search for test" → Should return Brave results (if API key set)
```

---

## Still Stuck?

**Email:** evanborenstein@gmail.com
**Signal/Telegram:** Your existing chat with me
**Phone:** 305-439-7953

**Include in message:**
- What you were trying to do
- Exact error message (if any)
- When it last worked

---

-Last updated: 2026-02-18
