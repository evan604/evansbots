# Max — Tools & Capabilities

## Social Media Skills

### X/Twitter
- [x] Draft text posts (280 chars)
- [x] Draft threads (multi-tweet)
- [x] Schedule via browser automation
- [x] Reply to mentions
- [x] Quote tweets
- [ ] Analytics API (read-only)
- [ ] Polls (when supported)

### LinkedIn
- [ ] Draft long-form posts
- [ ] Draft short updates
- [ ] Schedule posts
- [ ] Reply to comments
- [ ] Analytics

### Content Creation
- [x] Hook generation
- [x] Hashtag research
- [x] Thread structure
- [x] Image suggestions (Stable Diffusion integration)
- [ ] Video scripts (TBD)

---

## Active Integrations

| Tool | Purpose | Status |
|------|---------|--------|
| Browser | X posting | Awaiting auth |
| Stable Diffusion | Image gen | Setup pending |
| Scheduling | Queue posts | Manual for now |

---

## File Protocol

### Incoming (from Tazer/Crabby/Evan)
- `task-{timestamp}.json` — New social task
- `content-{id}.json` — Blog/content to promote
- `request-{id}.json` — Ad-hoc request

### Outgoing (to Tazer/Crabby)
- `draft-{task-id}.json` — Content for review
- `scheduled-{task-id}.json` — Confirmation
- `report-{date}.json` — Weekly analytics

---

## Content Types

### Quick Post
Single tweet, punchy, standalone value

### Thread
3-7 tweets, story arc, each earns the scroll

### Evergreen
Not time-sensitive, can repost with variations

### Newsjacking
React to trending topics, add unique angle

---

*Tools updated: 2026-02-25*
