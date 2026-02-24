#!/usr/bin/env python3
"""
Example OpenClaw API endpoint for iOS Shortcut integration
Receives voice input from AirPods via iOS Shortcuts
Returns voice response for text-to-speech

Usage:
    python opencat-endpoint-example.py

Expects POST to /api/voice with JSON:
{
    "text": "What should I do about the project?",
    "user": "evan",
    "source": "airpods-shortcut"
}

Returns:
{
    "response": "Here's what I'd recommend...",
    "status": "ok"
}
"""

from flask import Flask, request, jsonify
import datetime

app = Flask(__name__)

# Mock "knowledge" - replace with real memory/search
RECENT_CONTEXT = """
Current projects:
- Highland Private Office growth
- AI brain system development
- Dashboard for client
- AirPods voice agent

Recent ideas:
- Walking with an AI blog post
- Second brain organization (capture → categorize → curate → kill)
"""


@app.route("/api/voice", methods=["POST"])
def voice_endpoint():
    data = request.json
    
    user_text = data.get("text", "")
    user = data.get("user", "unknown")
    source = data.get("source", "unknown")
    
    print(f"[{datetime.datetime.now()}] {user} via {source}: {user_text}")
    
    # Simple response logic (replace with real Tazer logic)
    response_text = process_with_context(user_text)
    
    return jsonify({
        "response": response_text,
        "status": "ok",
        "timestamp": datetime.datetime.now().isoformat()
    })


def process_with_context(text: str) -> str:
    """
    Simple response logic.
    In real implementation, this would:
    - Search MEMORY.md for context
    - Call OpenClaw sessions with voice input
    - Get Tazer's actual response
    """
    
    text_lower = text.lower()
    
    # Pattern matching for common commands
    if any(w in text_lower for w in ["note", "capture", "remember"]):
        # Would actually write to GitHub/memory file
        return f"Captured: {text}. I'll save this to your memory."
    
    if "weather" in text_lower:
        return "It's 72 degrees and sunny in Winter Park, Florida."
    
    if "task" in text_lower or "todo" in text_lower:
        return "I'll add that to your task list. Anything else?"
    
    if "idea" in text_lower:
        return "Great idea. I'll log it to your second brain system."
    
    # Default generic response
    return f"I heard: {text}. I'm processing this with your full context, but this is a demo response."


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    print("Starting OpenClaw Voice Endpoint...")
    print("Test with:")
    print('curl -X POST http://localhost:5000/api/voice -H "Content-Type: application/json" -d \'{"text":"hello","user":"evan"}\'')
    app.run(host="0.0.0.0", port=5000, debug=True)
