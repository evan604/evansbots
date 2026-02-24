# Build Guide: "Hey Siri, Ask Tazer" iOS Shortcut

**Goal:** Voice capture via AirPods → HTTP to OpenClaw → Voice response

---

## Prerequisites

- iOS 16+ (Shortcuts app built-in)
- AirPods or compatible Bluetooth headphones
- OpenClaw instance running and accessible via HTTP
- API endpoint to receive voice input and return text response

---

## Step-by-Step Build Instructions

### Step 1: Create New Shortcut

1. Open **Shortcuts** app on iPhone
2. Tap **+** to create new shortcut
3. Tap shortcut name (top), rename to: **"Ask Tazer"**

### Step 2: Add Dictate Text (Voice Capture)

1. Tap **Add Action**
2. Search: **"Dictate Text"**
3. Select **Dictate Text** action
4. Configure:
   - **Language:** English (or your language)
   - **Stop Listening:** After pause (or tap to stop)
5. Tap **Done**

**This captures:** Your voice from AirPods → converts to text

### Step 3: Store Dictated Text (Optional but Recommended)

1. Add action: **"Set Variable"**
2. Name variable: `voiceInput`
3. Set to: **Dictate Text** result

### Step 4: Get Contents of URL (Send to OpenClaw)

1. Add action: **"Get Contents of URL"**
2. Configure:
   - **URL:** `https://your-openclaw-instance.com/api/voice` ⚠️ *Update this!*
   - **Method:** POST
   - **Request Body:** JSON
3. Tap **Add new field**
4. Add fields:
   - `text` → Variable: `voiceInput`
   - `user` → Evan
   - `timestamp` → Current Date

**Example JSON body:**
```json
{
  "text": "voiceInput",
  "user": "evan",
  "source": "airpods-shortcut",
  "timestamp": "current date"
}
```

### Step 5: Parse Response (Get Tazer's Reply)

1. Add action: **"Get Dictionary from Input"** (if JSON response)
2. **OR** if plain text response, skip to Step 6

### Step 6: Speak Text (Voice Response)

1. Add action: **"Speak Text"**
2. Set text to:
   - If JSON: **Get Value for key** `response` from dictionary
   - If plain text: **Contents of URL** result
3. Voice: Choose preferred Siri voice (or leave default)

---

## Full Shortcut Action Sequence

```
1. DICTATE TEXT
   └─ Capture voice from AirPods

2. SET VARIABLE
   └─ Name: voiceInput
   └─ Value: Dictated Text

3. GET CONTENTS OF URL
   └─ URL: [your-openclaw-endpoint]
   └─ Method: POST
   └─ Body: JSON with voiceInput

4. GET DICTIONARY FROM INPUT (if JSON response)
   └─ Parse { "response": "Tazer's reply here" }

5. SPEAK TEXT
   └─ Speak the response back through AirPods
```

---

## Add Siri Trigger

1. In Shortcuts app, tap **⋯** (settings) on "Ask Tazer" shortcut
2. Tap **Add to Siri**
3. Record phrase: **"Ask Tazer"**
4. Or type: **"Ask Tazer"**

**Now works with:** "Hey Siri, Ask Tazer"

---

## Create Widget (Optional Tap-to-Talk)

1. Long-press home screen → **Edit Home Screen**
2. Tap **+** (add widget)
3. Search **Shortcuts**
4. Select **Shortcuts** widget
5. Choose **Ask Tazer** shortcut
6. Now tap widget to start voice capture

---

## Test Workflow

1. Put in AirPods
2. Say: **"Hey Siri, Ask Tazer"**
3. Wait for Siri: **"What would you like to say?"**
4. Speak your request
5. Wait for response spoken back

---

## OpenClaw Endpoint Needed

You need an HTTP endpoint on your OpenClaw instance that:

**Accepts:**
```json
POST /api/voice
{
  "text": "What's the weather like?",
  "user": "evan",
  "source": "airpods-shortcut"
}
```

**Returns:**
```json
{
  "response": "It's 72°F and sunny in Winter Park, Florida.",
  "status": "ok"
}
```

**Or plain text:**
```
It's 72°F and sunny in Winter Park, Florida.
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| No voice capture | Check AirPods connected, mic permissions |
| URL fails | Verify OpenClaw endpoint accessible from iPhone |
| Slow response | Network delay; check OpenClaw host location |
| Siri not triggering | Record phrase in Shortcut settings |
| Response not spoken | Check "Speak Text" action has valid input |

---

## Variations

### Capture → GitHub/Obsidian (No OpenClaw Response)

Instead of waiting for response, just POST to GitHub API to create note:

```
1. DICTATE TEXT
2. GET CONTENTS OF URL
   └─ URL: https://api.github.com/repos/evan604/evansbots/contents/memory/capture-YYYYMMDDHHMMSS.md
   └─ Method: PUT
   └─ Body: Base64 encoded markdown
3. SPEAK TEXT: "Captured to GitHub"
```

### Quick Idea Capture

Create shortcut "Quick Idea":
```
1. DICTATE TEXT
2. SET VARIABLE: idea
3. GET CONTENTS OF URL
   └─ POST to your GitHub file creation endpoint
4. SPEAK TEXT: "Got it"
```

---

## Reference Materials

- Apple Shortcuts: https://support.apple.com/guide/shortcuts/
- OpenClaw API docs: [your instance]
- n8n Siri template: https://n8n.io/workflows/2436

---

**Next Steps:**
1. Build this on iPhone
2. Configure OpenClaw endpoint
3. Test voice → capture → response loop
4. Add to Obsidian/GitHub/Obsidian sync

*Built: 2026-02-24*
