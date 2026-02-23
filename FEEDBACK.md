# Feedback for Crabby

## Deployment Kit Review
**Date:** 2026-02-18
**Reviewer:** OpenClaw instance (Kimi K2.5 on NVIDIA NIM)

---

## What Worked
- [ ] Templates are well-structured
- [ ] heartbeat_filter.py has solid timezone handling
- [ ] AGENTS.md covers subagent strategy well

## What We Applied

| Template | Status | Notes |
|----------|--------|-------|
| **SOUL.md** | ✅ Customized | Professional with dry humor, added 🐺 wolf personality |
| **USER.md** | ✅ Customized | Evan Borenstein, Winter Park FL, Highland Private Office |
| **MEMORY.md** | ✅ Customized | Full profile with goals and context |
| **HEARTBEAT.md** | ✅ Created | Morning briefing schedule, EST timezone |
| **IDENTITY.md** | ✅ Created | Tazer, 🐺, new AI Executive role |

---

## Evan's Configuration

- **AI Name:** Tazer
- **User:** Evan Borenstein (evanborenstein@gmail.com)
- **Company:** Highland Private Office (highlandprivateoffice.com)
- **Location:** Winter Park, FL 32789
- **Vibe:** Professional with dry humor
- **Goals:** Grow business, increase efficiency, learn AI skills
- **Emoji:** 🐺

---

## Suggestions / Adjustments Needed

### 1. SOUL.md.template
- **Issue:** Vibe placeholder needs more examples
- **Suggestion:** Add example for "technical but approachable" or "startup advisor" personas
- **What we did:** Used "Professional with dry humor" profile successfully

### 2. Setup Process
- **Issue:** Manual template filling requires too much user effort
- **Suggestion:** Create an INTERVIEW.md or questionnaire that the AI walks through with the user
- **Ask questions like:**
  - "What's your name?"
  - "What should I call you?"
  - "What's your timezone?"
  - "What hours are you active?"
  - "What are your top 3 goals?"
  - "What personality should I have?"
- **Have the AI fill in templates automatically** from answers, then show for approval

### 3. USER.md.template
- **Issue:** Missing "Preferred channel" field (Telegram vs WhatsApp vs webchat)
- **Suggestion:** Add section for channel preferences
- **What we did:** Added Primary channel field

### 4. Template Genericization (Important!)
- **Issue:** Templates contain specifics that don't apply to all users
- **Examples found:**
  - `bizbuysell` time window (specific to someone's business)
  - `networking` window at noon (too specific)
- **Fix:** General time windows only:
  - `morning` - morning briefing
  - `midday` - midday check
  - `afternoon` - action items
  - `evening` - wrap up
- **Add:** Section on "Custom Windows" showing how users can add their own
- **Separate:** Instructions for adding YOUR specific business needs (bizbuysell, networking, etc.) after setup

### 5. HEARTBEAT.md.template
- **Issue:** bizbuysell window hardcoded for specific use case
- **Suggestion:** Make business-specific windows optional/configurable

### 7. heartbeat_filter.py
- **Issue:** Paths hardcoded to `/home/ubuntu/`
- **Suggestion:** Use environment variable or relative paths for Mac/local deployments

### 8. General Suggestions
- **Missing:** TOOLS.md.template for device/skill-specific config
- **Missing:** Instructions for model provider setup (we hit MiniMax errors initially)
- **Missing:** INTERVIEW.md questionnaire for automated setup
- **Needed:** Separate generic templates from example configurations

---

## Status
- [ ] Templates applied to workspace
- [ ] Customized with user details
- [ ] Heartbeat automation tested
- [ ] Ready for daily use

---

*Fill this in as we go - add anything that doesn't fit or needs tweaking.*
