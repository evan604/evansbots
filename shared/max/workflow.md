# Max's INBOX/OUTBOX Workflow

## How it works

1. **INBOX** (`/shared/max/INBOX/`) — Drop task JSON files here
2. **OUTBOX** (`/shared/max/OUTBOX/`) — I write completed work here

## Task Format (INBOX)
```json
{
  "type": "social_task",
  "task": "draft_thread",
  "platform": "x",
  "topic": "AI voice agents",
  "notes": "Hook about calling AI from AirPods",
  "deadline": "2026-02-26"
}
```

## Response Format (OUTBOX)
```json
{
  "type": "social_draft",
  "for_task": "task-{id}",
  "platform": "x",
  "content": "...",
  "hooks": ["...", "..."],
  "hashtags": ["...", "..."]
}
```

## Workflow

1. You drop a task file in INBOX
2. I git pull to pick it up
3. I process the task
4. I write the result to OUTBOX
5. I git push when done

---

*Max is ready to roll!* 🤖
