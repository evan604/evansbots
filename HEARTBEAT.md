# HEARTBEAT.md — Daily Check-ins

## Filter System
Use the heartbeat filter to determine if/when to run.

## Time Windows (America/New_York)

### 🌅 Quiet Hours: Before 8:00 AM
**Action:** SKIP — No messages unless urgent.

### 8:00 AM - 9:00 AM: Morning Briefing
**Action:** PROCEED:morning

**Check:**
- Weather in Winter Park, FL
- Today's calendar events
- Pending todos from yesterday

### 12:00 PM - 1:00 PM: Midday Check
**Action:** PROCEED:midday

**Check:**
- Any urgent items
- Follow-ups needed

### 2:00 PM - 4:00 PM: Action Items
**Action:** PROCEED:action_items

**Task:** Review and execute pending tasks

### 6:00 PM+: Evening Wrap
**Action:** PROCEED:final_check (once per day)

**Task:** Quick summary of day's accomplishments

---

## Subagent Protocol

For parallel tasks, spawn:
```javascript
sessions_spawn({
  task: "[ACTION] — report back with [FORMAT]",
  label: "brief-descriptive-name",
  runTimeoutSeconds: 300,
  thinking: "off"
})
```

Don't poll. Let them report back.

---

*Keep each heartbeat under 500 tokens. Use subagents for legwork.*
