# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:
- Camera names and locations
- SSH hosts and aliases  
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras
- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH
- home-server → 192.168.1.100, user: admin

### TTS
- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

### Email / AgentMail
- Address: tazer@agentmail.to
- API Key: `am_us_9d4e7bb9137551bed1f1ac3982d5f28ee962ee85486802330f1d3d8797ec501c`
- Send script: `/Users/evanborenstein/clawd/scripts/send_email.py`
- API Endpoint: `POST https://api.agentmail.to/v0/inboxes/{inbox_id}/messages/send`

---

## Group Chat Limitations
- I **cannot see other bot messages** (@EvansCrabbyBot, etc.) in group chats
- Even when tagged/mentioned, bot→bot messages are filtered from my context
- **Workaround:** Copy/paste bot responses you want me to see
- **Alternative:** Use DMs for direct Tazer↔Crabby coordination

---

Add whatever helps you do your job. This is your cheat sheet.
