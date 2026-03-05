# Blog to Social Automation

## Setup

### 1. Install Claude Code
```bash
curl -fsSL https://CLAUDE.ai/code/install.sh | sh
```

### 2. Environment Variables
Create `.env` file:
```bash
# Netlify
NETLIFY_SITE_ID=your_site_id
NETLIFY_AUTH_TOKEN=your_token

# Twitter
TWITTER_API_KEY=your_key
TWITTER_API_SECRET=your_secret
TWITTER_ACCESS_TOKEN=your_token
TWITTER_ACCESS_SECRET=your_secret

# LinkedIn
LINKEDIN_ACCESS_TOKEN=your_token
```

### 3. Run Automation
```bash
claude --continuous --allowed-dir /path/to/evansbots/shared/blog_drafts
```

## Automation Rules (CLAUDE.md)

When told to "publish a blog post":

1. **Read the draft** from `shared/blog_drafts/`
2. **Convert to HTML** if needed
3. **Push to Netlify** (git add → commit → push)
4. **Wait for deploy** (check Netlify status)
5. **Post to Twitter** with the blog URL
6. **Post to LinkedIn** with the blog URL + summary

## Usage

Tell Claude:
> "Publish the 3-hour-workday blog post"

And it will:
1. Read `draft-3-hour-workday.md`
2. Push to your Netlify site
3. Tweet a link
4. Post to LinkedIn
