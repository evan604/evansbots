# AI Executive Deployment Guide
## Highland Private Office — Consultant Playbook

**Version:** 1.0  
**Last Updated:** 2026-02-18

---

## Overview

This guide walks HPO consultants through deploying OpenClaw AI Executives for clients. Follow these steps for consistent, professional delivery.

**Time per deployment:**
- Starter: 4-6 hours
- Professional: 8-12 hours
- Executive: 16-24 hours

---

## Pre-Deployment

### Client Discovery Call (60 min)

**Goals:**
- Understand client's daily workflow and pain points
- Identify automation opportunities
- Assess technical setup (Mac vs cloud vs both)

**Key Questions:**

| Category | Questions |
|----------|-----------|
| **Profile** | Name, email, location, timezone |
| **Work Style** | Hours active, preferred channels (Telegram, WhatsApp, iMessage, email) |
| **Communication** | Prefers brevity? Urgent after hours? |
| **Goals** | Top 3 current priorities |
| **Pain Points** | What eats their time? What's repetitive? |
| **Tools** | Calendar (Google/Apple/Outlook), Notes app, existing automation |
| **Vibe Match** | Formal? Casual? Dry humor? Technical? Warm? |

**Deliverable:** Fill in `CLIENT_QUESTIONNAIRE.md`

---

## Deployment Process

### Phase 1: Environment Setup (1-2 hrs)

**Step 1: Model Provider Selection**
- **Local Mac:** NVIDIA NIM (Kimi K2.5) or MiniMax
- **Cloud (EC2):** Same, or OpenAI if client prefers
- **Get API keys:** Have client register or use HPO account

**Step 2: OpenClaw Installation**

```bash
# Client's Mac
npm install -g openclaw
openclaw setup
openclaw gateway start

# Or AWS EC2 (for power users)
# Provision t3.medium, Ubuntu 22.04, 30GB
# Install Node.js, then same commands
```

**Step 3: Install Core Skills**

```bash
# Universal
clawhub install weather
clawhub install brave-search

# Mac-specific (if local)
clawhub install apple-notes
clawhub install apple-reminders
clawhub install imsg
clawhub install sag

# Cloud-specific (if EC2)
clawhub install ical-reader
clawhub install gcal
```

**Step 4: Configure Channels**

Options:
- **Telegram** (most popular) — Add bot token, pair chat
- **WhatsApp** — Link QR code
- **iMessage** — Mac only, requires permissions

**Verification:** Send test message, confirm working both ways.

---

### Phase 2: Template Customization (1-2 hrs)

**Copy templates to workspace:**

```bash
cp /templates/&#42;.md ~/client-workspace/
```

**Customize with Discovery answers:**

| File | Section | What to Fill |
|------|---------|--------------|
| **IDENTITY.md** | All | AI name, vibe, emoji |
| **SOUL.md** | Vibe section | Personality description |
| **USER.md** | All | Client profile, goals, hours |
| **MEMORY.md** | All | Consolidated context |
| **AGENTS.md** | All | Keep standard (subagent rules) |
| **HEARTBEAT.md** | Time windows | Match client's active hours |
| **tasks/todo.md** | Active | Client's current projects |
| **tasks/lessons.md** | 2026-MM-DD | Log of deployment |

**Example - SOUL.md Vibe:**

Ask client: "How do you want your AI to sound?"

Options:
- "Concise and direct. Gets to the point."
- "Warm and conversational. Friendly but efficient."
- **"Professional with dry humor. Competent but human."**
- "Playful and casual. Makes work enjoyable."
- "Technical but approachable."
- "Startup advisor — strategic and candid."

---

### Phase 3: Heartbeat Automation (1-3 hrs)

**Understand client's day:**
- Morning routine time?
- When do they check messages?
- What info do they need daily?

**Standard heartbeat slots:**

| Window | Time | Typical Check |
|--------|------|---------------|
| morning | Client's start time | Weather, calendar, tasks |
| midday | Noon | Follow-ups, urgent items |
| afternoon | 2-4 PM | Action items, progress |
| evening | 6 PM+ | Wrap-up, tomorrow prep |

**Customize to client:**
- Add business-specific slots (if applicable)
- Adjust times to their timezone
- Set "quiet hours" to match sleep schedule

**Implementation:**
1. Edit `HEARTBEAT.md`
2. Add cron jobs using `cron` tool
3. Test each window manually
4. Verify subagent parallel spawning works

---

### Phase 4: Skill Configuration (1-4 hrs)

**Per-client skill setup:**

| Skill | Setup Steps |
|-------|-------------|
| **weather** | Default: Client's location |
| **brave-search** | Add API key to config |
| **apple-notes** | Grant Reminders permission in System Settings |
| **apple-reminders** | Grant Reminders permission |
| **imsg** | Grant Automation permission, test send |
| **sag** | Add ElevenLabs API key, test voice |
| **gcal/ical** | Link calendar, verify event reading |

**Verification:** Run each skill once, confirm output.

---

### Phase 5: Integration Testing (1-2 hrs)

**Test Checklist:**

| Feature | Test | Expected Result |
|---------|------|-----------------|
| Message receipt | Client sends message on Telegram | I receive and reply |
| File handling | Client sends file | I can read/analyze |
| Voice (if sag) | Trigger TTS | Audio plays on Mac |
| Calendar read | "What's on my calendar today?" | Returns events |
| Notes write | "Add to Apple Notes: ..." | Created in Notes app |
| Reminders | "What's on my reminders?" | Returns list |
| Web search | "Search for ..." | Returns results |
| Heartbeat | Wait for scheduled time | Automated check runs |

**Fix Issues:** Document in `tasks/lessons.md`

---

## Handoff & Training

### Phase 6: Client Training Call (60 min)

**Agenda:**

1. **System Overview** (10 min)
   - "Here's how we'll communicate"
   - Channels available (Telegram, etc.)
   - When I'll reach out vs. when they message me

2. **Daily Workflow** (20 min)
   - Morning heartbeat walkthrough
   - How to add tasks
   - How to ask for research
   - File sharing (images, PDFs, etc.)

3. **Live Examples** (20 min)
   - "Check my calendar today"
   - "Add to my notes: ..."
   - "Research [topic] and summarize"
   - "Remind me to ... tomorrow at 3pm"

4. **Q&A** (10 min)
   - What should they expect?
   - What won't I do?
   - How to get help?

### Phase 7: Documentation Delivery

** Deliver to client:**

1. `QUICK_START.md` — One-page reference
2. `COMMAND_REFERENCE.md` — All the things I can do
3. `TROUBLESHOOTING.md` — Common issues

---

## Post-Deployment

### 30-Day Support (Starter)

- Check in weekly
- Fix any integration issues
- Fine-tune heartbeat timing
- Answer "how do I ...?" questions

### 90-Day Support (Professional)

- Monthly check-ins
- Performance review: "What's working? What's not?"
- Skill additions (if needed)
- Template updates

### Ongoing (Executive)

- Quarterly strategy sessions
- Custom skill development
- Process optimization
- Expansion planning

---

## Pricing & Packaging

| Tier | Price | Best For |
|------|-------|----------|
| **Starter** | $2,500 | Individual professionals wanting basic automation |
| **Professional** | $5,000 | Executives with complex schedules, multiple tools |
| **Executive** | $10,000 | Business owners needing custom development |

**Add-ons:**
- Additional skills: $500/skill
- Custom skill dev: $2,500+
- Monthly retainer: $500-1,500/mo

---

## Templates Included

See `/templates/` folder for:
- All .md template files
- Sample filled versions
- Customization guide

---

## Marketing Materials

See `/advertising/` folder for:
- Sales page copy
- Email sequences
- One-pager PDF content
- Social media posts

---

*Questions? Ping the HPO AI team.*
