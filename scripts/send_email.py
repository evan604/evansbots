#!/usr/bin/env python3
"""Send email via AgentMail API"""

import os
import sys
import json
import base64
from urllib.request import Request, urlopen
from urllib.error import HTTPError

API_KEY = os.getenv("AGENTMAIL_API_KEY", "")
BASE_URL = "https://api.agentmail.to/v0"
SEND_ENDPOINT = "/inboxes/{inbox_id}/messages/send"  # POST to send

def send_email(from_inbox, to, subject, text, html=None, attachments=None):
    """Send an email via AgentMail API"""
    
    if not API_KEY:
        print("Error: AGENTMAIL_API_KEY not set", file=sys.stderr)
        sys.exit(1)
    
    url = f"{BASE_URL}/inboxes/{from_inbox}/messages"
    
    payload = {
        "to": to if isinstance(to, list) else [to],
        "subject": subject,
        "text": text
    }
    
    if html:
        payload["html"] = html
    
    if attachments:
        payload["attachments"] = attachments
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    req = Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers=headers,
        method='POST'
    )
    
    try:
        with urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            print(f"✉️  Email sent: {result.get('message_id', 'success')}")
            return result
    except HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f"❌ Error: {e.code} - {error_body}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Send email via AgentMail")
    parser.add_argument("--from", "-f", dest="from_inbox", required=True, help="From inbox (e.g., tazer@agentmail.to)")
    parser.add_argument("--to", "-t", required=True, help="To address")
    parser.add_argument("--cc", "-c", help="CC addresses (comma-separated)")
    parser.add_argument("--subject", "-s", required=True, help="Email subject")
    parser.add_argument("--text", required=True, help="Plain text body")
    parser.add_argument("--html", help="HTML body (optional)")
    
    args = parser.parse_args()
    
    send_email(
        from_inbox=args.from_inbox,
        to=args.to,
        subject=args.subject,
        text=args.text,
        html=args.html
    )
