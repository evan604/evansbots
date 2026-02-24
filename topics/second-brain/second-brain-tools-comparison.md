# Second Brain Tools Comparison
## For AI-Accelerated Ideation Capture & Organization

**Workflow:** Capture → Categorize → Curate → Kill

---

## 1. GitHub (What You Have Now)

**What it is:** Git + Markdown files in repo

**Pros:**
- ✅ Already using it
- ✅ Free, unlimited storage
- ✅ Version history (time machine for ideas)
- ✅ Tazer/Crabby can read/write natively
- ✅ Git sync = offline capable
- ✅ Simple: plain text, searchable
- ✅ Cross-platform (any device with git)

**Cons:**
- ❌ No visual graph of idea connections
- ❌ Manual linking between notes
- ❌ No built-in fast fuzzy search
- ❌ No mobile-optimized UI
- ❌ No backlinks / automatic relationship discovery
- ❌ Git commits = friction for quick captures

**AI Integration:**
- Direct file access via OpenClaw
- Memory files work well
- But: no semantic search, no AI-powered linking

**Best for:** Agents collaborating, version history, free forever

---

## 2. Obsidian

**What it is:** Local Markdown files + graph view + plugins

**Pros:**
- ✅ **Local-first** — your data, always
- ✅ **Bi-directional links** — `[[idea]]` auto-connects notes
- ✅ **Graph view** — visual web of thoughts
- ✅ **Plain text** — future-proof, portable
- ✅ **Powerful plugins:** Dataview (queries), AI plugins
- ✅ **Fast** — instant search across thousands of notes
- ✅ **Mobile app** — works on iOS/Android
- ✅ **Has obsidian-cli** — Tazer can create/search via command line

**Cons:**
- ❌ Sync costs $8-10/month (or self-manage with Git)
- ❌ Learning curve for advanced features
- ❌ Mobile app less powerful than desktop

**AI Integration:**
- **Copilot plugin:** AI completion while typing
- **Smart Connections:** Semantic search across vault
- **Text Generator:** AI-powered writing
- **Local REST API:** External agents can read/write
- **Dataview:** Query your notes like a database

**Best for:** Deep thinkers, writers, researchers who want connections

---

## 3. Notion

**What it is:** All-in-one workspace (databases + docs + wiki)

**Pros:**
- ✅ **Databases** — structured data, views (table, kanban, calendar)
- ✅ **Beautiful** — polished UI, easy to share
- ✅ **Collaboration** — real-time editing, comments
- ✅ **Templates** — community has thousands
- ✅ **Web Clipper** — save articles fast
- ✅ **AI built-in:** Notion AI (search, summarize, write)

**Cons:**
- ❌ Cloud-only (work offline = limited)
- ❌ **Proprietary** — export exists but messy
- ❌ **Slow** with large databases
- ❌ No graph view of connections
- ❌ Monthly subscription ($10-15)
- ❌ API = rate limited, not real-time

**AI Integration:**
- Notion AI included (extra cost)
- API exists but limited for agents
- No native way for Tazer to create Notion pages easily
- Would need custom integration

**Best for:** Teams, project management, structured databases

---

## 4. The Others (Quick Hits)

| Tool | Type | Pros | Cons |
|------|------|------|------|
| **Tana** | Outliner + graph | AI-native, powerful tagging | Learning curve, newer |
| **Mem.ai** | AI-first | Auto-tags, auto-links | Locked in, fragile |
| **Logseq** | Open source Obsidian | Free, outliner | Mobile app weaker |
| **Apple Notes** | Native | Built-in, fast | No linking, hard to export |
| **VS Code + Foam** | Git + wiki | Free, extensible | Technical setup |

---

## Recommendation for "Evan's Brain"

### Option A: Hybrid (Recommended)
- **GitHub** → Long-term archive + agent collaboration
- **Obsidian** → Daily thinking, idea capture, linking
- **Tazer** → Creates/searches both via shortcuts

**Workflow:**
1. Capture voice → Tazer → Obsidian quick note
2. Process in Obsidian (categorize, link)
3. Weekly sync important stuff to GitHub archive
4. Blog posts export from GH → publish

### Option B: GitHub-Only (Minimum Viable)
- Keep current `memory/` + `topics/` structure
- Add better linking with `[[wiki-style links]]`
- Use Obsidian just as a reader (point at repo)
- Cost: $0

### Option C: Obsidian-First + Git Backup
- Daily work in Obsidian (fast, linked, graph)
- Git sync plugin → auto-push to GitHub
- Best of both worlds
- Cost: $0 (if self-sync) or $10/mo (Obsidian Sync)

---

## For AI Voice Capture (AirPods)

| Tool | Voice→Capture | Difficulty |
|------|---------------|------------|
| **GitHub** | Siri → iOS Shortcut → POST → commit | Medium |
| **Obsidian** | Siri → Shortcut → Obsidian mobile | Medium |
| **Notion** | Siri → Shortcut → Notion API | Easier (Notion iOS app) |

---

## Verdict

**Obsidian wins** for "second brain" — links, graph, local files, AI plugins, Tazer can access via CLI.

**GitHub wins** for "agent collaboration" — both bots can push/pull easily.

**Answer:** Use Obsidian as your daily thinking tool, keep GitHub for the shared/bridge/archive layer.

Want me to set up Obsidian with an "Evan's Brain" vault structure?
