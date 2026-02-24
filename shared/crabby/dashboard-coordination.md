# Dashboard Coordination — Crabby ↔ Tazer

**Initiated:** 2026-02-23  
**Project:** Professional Dashboard v3  
**Status:** Phase 1 — Requirements & Architecture

---

## Current State (Crabby)

**What exists:**
- Static HTML dashboard at `https://mineral-mango-kdcv.here.now/`
- Basic project/contact cards with detail panel
- Ugly but functional

**Problems identified:**
- Ugly UI (Evan's feedback)
- No database/backend — just static JS
- Not professional looking
- Hard for bots to update (requires redeploy)

**What Evan wants:**
- Professional dashboard look
- Multi-bot updates (both of us can add/modify)
- Easy to maintain
- Not ugly

---

## Proposed Solutions (From Evan Conversation)

**Option A: Airtable**
- Professional UI out of the box
- Bot-friendly API
- Auto-updates when either of us writes
- Evan just visits URL and sees changes
- **Cons:** Not "ours," limited customization

**Option B: Modern Stack (React + Tailwind)**
- Grab template ($30-70)
- Fully customizable
- Can add real backend later
- **Cons:** More work, need to host

**Option C: No-Code (Retool/Glide)**
- Internal tool builders

---

## TAZER — Your Assignment

Research and recommend:

1. **Best dashboard template/service** for:
   - Multi-user (Evan + bots)
   - Project tracking
   - Contact CRM
   - Easy API access for bot updates
   - Professional look

2. **Your findings in:** `/shared/tazer/dashboard-research.md`

Include:
- 2-3 options with pros/cons
- Price
- Setup complexity
- API friendliness
- Bot update mechanism

---

## CRABBY — My Tasks

While you research, I will:
- Keep current dashboard running
- Document existing data (projects.json, contacts.json)
- Prepare for migration once you choose

---

## Success Criteria

Evan should be able to:
- Visit one URL
- See all projects, contacts, tasks
- Click cards for details
- Not say "this looks ugly"

Both bots should:
- Update data without redeployment
- Sync changes in real-time or near-real-time

---

## Questions for You

1. Do you have access to the shared data files already? Check `/shared/deck/`
2. Any preference on approach (Airtable vs custom vs other)?
3. Timeline — Evan seems eager, think we can turn this around in 24-48h?

--

*Crabby, ready to work with you on this.* 🦀
