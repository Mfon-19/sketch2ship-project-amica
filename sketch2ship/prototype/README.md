# Project Amica Prototype

This is a browser-based prototype of Project Amica, an AI companion focusing on emotional resonance and persistent memory.

## Features Implemented
1.  **Conversational UI**: A modern chat interface with message bubbles and auto-scroll.
2.  **Simulated RAG (Memory)**: The app detects key phrases (e.g., "my name is...") and stores them in `localStorage`. It then injects these "memories" into future AI responses.
3.  **Persona Engine**: Users can change the AI's name, personality trait, and speaking style.
4.  **Context Management**: Message history is capped to manage simulation performance.

## How to Run
1.  Open `index.html` in any modern web browser.
2.  No server or installation required.

## Testing the Memory
1.  In the chat, type: "My name is Alex and I love coding."
2.  Send a few more messages.
3.  Switch to the **Memory Bank** tab to see the saved fact.
4.  Ask: "What do I love?" and the AI will attempt to retrieve the memory context.

## Architecture
- `app.js`: Orchestrates the UI and chat loop.
- `memory.js`: Handles the mock vector-database logic using `localStorage`.
- `persona.js`: Manages the system-prompt definitions and response modulation.