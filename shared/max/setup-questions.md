# Questions for MiniMax Team/Support

## Core Capabilities

### API Access
1. **Can Max make HTTP requests to external APIs?** (GitHub, webhooks, etc.)
2. **Does Max support function calling / tool use?**
3. **What protocols can Max use?** (REST, WebSocket, GraphQL)
4. **Is there a rate limit on API calls?** What's the limit?

### Authentication
5. **Can Max store secrets/environment variables?** (tokens, keys, passwords)
6. **How do I set a GitHub Personal Access Token for Max?**
7. **Is there a secure vault or secrets manager?**
8. **Can Max use headers like `Authorization: Bearer TOKEN`?**

### File System / Storage
9. **Does Max have any persistent storage?** (database, files, key-value store)
10. **Can Max read/write files or only access via API?**
11. **Is there a way for Max to access my local machine's filesystem?** (SSH, tunnel, etc.)

## Specific Integrations

### GitHub
12. **Is there native GitHub integration?** (or do we build via API?)
13. **Can Max call GitHub's REST API directly?**
14. **Can Max handle JSON responses and parse them?**
15. **Can Max write (create/update) files to GitHub?** (not just read)

### Webhooks/HTTP Server
16. **Can Max receive webhooks/incoming HTTP requests?**
17. **Is there a URL I can POST to that Max will receive?**
18. **Or can Max only make outbound calls?** (not listen inbound)

### MCP (Model Context Protocol)
19. **Does MiniMax support MCP servers?**
20. **Can I connect an MCP server (like GitHub MCP) to Max?**

## Communication

### Chat Interface
21. **Where does Max run?** (web app, desktop app, CLI, API)
22. **What interface do I use to talk to Max?**
23. **Can Max send me push notifications or alerts?**
24. **Is there a way to programmatically send messages to Max?** (not just chat)

### Multi-Agent
25. **Can I have multiple "agents" or roles in one account?**
26. **Can Max coordinate with other MiniMax agents?**
27. **Is there agent-to-agent communication?**

## Practical Usage

28. **How do I give Max a system prompt / instructions?**
29. **Can Max remember context across sessions?**
30. **What's the context window size?** (how much can Max remember)
31. **Can Max execute shell commands or code?**
32. **Does Max have access to a browser?** (automation, scraping)

## Cost & Limits

33. **Is this free or paid?** What's the pricing?
34. **Are there usage limits I should know about?**
35. **What happens if I hit rate limits?**

---

## Priority Questions (Ask these first)

If you only ask a few, these are the key ones:

1. **Can Max make HTTP API calls to GitHub?** (YES/NO)
2. **How do I store a GitHub token securely?**
3. **Can Max read AND write files to a GitHub repo?**
4. **How do I set a system prompt or give Max instructions?**

---

*Document created: 2026-02-25*  
*Purpose: Configure GitHub access for Max (social media agent)*
