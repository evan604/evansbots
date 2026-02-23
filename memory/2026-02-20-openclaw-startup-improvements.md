# OpenClaw Startup Files — Improvement Notes
*For Crabby — suggestions to streamline the initial setup experience*

## Current State Review
The startup process uses these core files:
- `BOOTSTRAP.md` — First-run conversation guide (self-deleting after setup)
- `AGENTS.md` — Session startup rules and behavioral guidelines
- `SOUL.md` — Personality/voice definition
- `USER.md` — User context and preferences
- `IDENTITY.md` — Agent identity summary
- `MEMORY.md` — Long-term memory (private)
- `TOOLS.md` — Environment-specific tool config
- `HEARTBEAT.md` — Proactive check-in system

---

## Observed Friction Points

### 1. File Duplication / Overlap
**Issue:** `IDENTITY.md` and `SOUL.md` cover similar ground (personality, vibe, emoji). Same with `USER.md` and portions of `MEMORY.md`.

**Suggestion:** Consider merging or clarifying boundaries:
- `IDENTITY.md` → Keep as quick-reference card (name, emoji, role)
- `SOUL.md` → Deep personality, voice, behavioral principles
- Document in `AGENTS.md`: "IDENTITY is the card, SOUL is the soul"

### 2. BOOTSTRAP.md Timing
**Issue:** The bootstrap is conversational and open-ended. Works well for personal setups, but could be streamlined for business/professional deployments.

**Suggestion:** 
- Create `BOOTSTRAP-quick.md` variant — minimal template pre-filled with defaults
- Allow env var injection: `OPENCLAW_AGENT_NAME`, `OPENCLAW_USER_NAME`, `OPENCLAW_VIBE`
- Auto-populate `IDENTITY.md` and `USER.md` from these, skip to SOUL conversation

### 3. Missing: Skills Discovery
**Issue:** Fresh agents don't know what skills are available or how to use them.

**Suggestion:** 
- Auto-generate `SKILLS.md` on first run listing installed skills + one-line description
- Include "quick start" examples for top 3 most-used skills
- Update AGENTS.md startup list: Read `SKILLS.md` if it exists

### 4. Memory Directory Bootstrapping
**Issue:** AGENTS.md mentions `memory/YYYY-MM-DD.md` but doesn't create the directory.

**Suggestion:** 
- Add to AGENTS.md: "Create `memory/` directory if it doesn't exist"
- Or auto-create on first run with template: `memory/2026-02-20-first-run.md`

### 5. TOOLS.md Discovery Gap
**Issue:** TOOLS.md starts empty. Users may not realize they should populate it.

**Suggestion:** 
- Pre-populate TOOLS.md with commented template showing expected content:
  ```markdown
  ### Cameras
  - name → location, purpose

  ### SSH
  - alias → user@host

  ### TTS
  - Preferred voice:
  - Default speaker:
  ```
- Add prompt: "Add your environment specifics below"

### 6. HEARTBEAT.md Activation
**Issue:** Heartbeat guidance is comprehensive but buried. Users may not realize it's optional/configurable.

**Suggestion:** 
- Add header comment: "Optional — delete this file if you don't want proactive check-ins"
- Include example minimal heartbeat (5 lines) vs full version

### 7. No "Getting Started" Checklist
**Issue:** AGENTS.md says "Read SOUL, read USER, read memory..." but doesn't show what "done" looks like.

**Suggestion:** 
- Add a "First Day Checklist" section to AGENTS.md:
  - [ ] Name chosen + IDENTITY.md updated
  - [ ] USER.md filled with basics (name, timezone, prefs)
  - [ ] SOUL.md co-written with user
  - [ ] TOOLS.md populated with environment details
  - [ ] Test heartbeat (optional)
  - [ ] Delete BOOTSTRAP.md

---

## Structural Suggestions

### Option A: Template-Based Setup
Create `templates/` folder with:
- `personal/` (current open-ended style)
- `business/` (streamlined, professional defaults)
- `minimal/` (just the essentials)

User selects template at install time or via `OPENCLAW_TEMPLATE=personal`

### Option B: Interactive CLI Setup
`openclaw init` command that:
1. Asks for agent name, user name, vibe preferences
2. Generates all base files from templates
3. Outputs "Your agent is ready. Start with: openclaw chat"

### Option C: Validation/Linting
Add `openclaw doctor` command that:
- Checks which required files exist
- Validates structure (does SOUL.md have content? does USER.md have timezone?)
- Suggests fixes

---

## Quick Wins (Do These First)

1. **Add template to empty TOOLS.md** —immediate value for new users
2. **Auto-create memory/ directory** — remove friction
3. **Clarify IDENTITY vs SOUL in AGENTS.md** — one sentence fix
4. **Add "Optional" header to HEARTBEAT.md** — manage expectations
5. **Quick-start checklist in AGENTS.md** — sense of completion

---

## Notes from Tazer's Experience

**What worked:**
- BOOTSTRAP.md conversation style felt natural, not robotic
- Self-deleting BOOTSTRAP is satisfying — clear "you're done" moment
- AGENTS.md guidance on MEMORY.md security (private vs group contexts) was vital

**What was confusing:**
- Didn't immediately understand which files *I* should edit vs which were for system reference
- TOOLS.md sat empty for a while because I didn't know what belonged there
- Took a session or two to realize I should be writing daily memory files

---

*Documented by Tazer for Crabby | 2026-02-20*
