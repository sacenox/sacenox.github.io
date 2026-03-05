---
layout: post
title: mini-coder-v1-0-rc-is-here-fast-focused-and-ready-to-ship
description: mini-coder v1 release candidate 0.0.14 is feature-complete, fast in the terminal, and ready for final validation.
---

# mini-coder v1.0 RC Is Here — Fast, Focused, and Ready to Ship

After a string of development builds, we're hitting a milestone worth calling out: **mini-coder v1.0 is in release candidate.** Tag `0.0.14` is the first public RC — every tag before it was a development build. This one is feature-complete for v1 scope and ready for final validation.

If you want a coding agent that lives in your terminal, stays out of your way, and actually moves fast — this is it.

---

## 🚀 What's New in v1 RC

mini-coder ships as `mc`, a terminal-native CLI coding agent built on Bun + TypeScript. No IDE plugin. No Electron wrapper. Just a sharp tool in your shell.

Here's what's baked in:

- **Core code tools:** `glob`, `grep`, `read`, `create`, `replace`, `insert`, `shell`, and `subagent` — everything you need to explore and edit a codebase autonomously.
- **Multi-provider model support:** OpenCode/Zen, Anthropic, OpenAI, Google, and Ollama all work out of the box. Set whichever key you have and go.
- **Persistent session memory:** Sessions are stored in a local SQLite database. Resume exactly where you left off with `-c` or `-r <id>`.
- **Custom slash commands:** Drop a `.md` file in `.agents/commands/` and it becomes a `/command`. Supports argument placeholders and shell interpolation — no plugin system required.
- **Custom agents and skills:** Reference a custom agent with `@agent-name` or inject a reusable skill with `@skill-name`. Both are explicit, composable, and live alongside your code.
- **Post-tool hooks:** Place an executable at `.agents/hooks/post-<tool>` and mini-coder runs it automatically after every matching tool call.
- **Undo support:** Every turn snapshots state, so `/undo` actually works.
- **Clean terminal UX:** A live status bar, compact tool output, and markdown-aware streaming — without any visual bloat.
- **MCP integration:** Connect to MCP servers (like Exa for web search) when you need to go beyond the local repo.

---

## ✅ v1 Goals: All Met

The original v1 scope was tight and deliberate, and we hit all of it:

- **Small and fast runtime** — Bun keeps startup near-instant and the footprint tiny.
- **Extensible `.agents` ecosystem** — local `.agents/` overrides global `~/.agents/`, and the same folder works with Claude Code, OpenCode, and other compatible tools. Write skills and agents once; use them everywhere.
- **Practical autonomous coding loop** — `shell` + file primitives give the agent a real editing loop, not just a chatbot with file-read access.
- **Repo-focused workflows** — mini-coder is designed around the structure of a real project, not a generic assistant interface.

---

## 🧪 Release Candidate Note

`0.0.14` is the **v1 release candidate**. Functionality is complete — this tag exists for final real-world validation before we mark it stable. If you run into anything unexpected, now is exactly the right time to file an issue.

Expect v1 stable to follow quickly once RC feedback is clear.

---

## ⚡ Try It Right Now

```bash
# Install globally
bun add -g mini-coder
# or: npm install -g mini-coder

# Set a provider key (pick one)
export ANTHROPIC_API_KEY=your-key
export OPENAI_API_KEY=your-key
export OPENCODE_API_KEY=your-zen-key  # recommended

# Launch
mc

# Or fire off a one-shot task
mc "Add error handling to the fetch calls in src/api.ts"

# Continue your last session
mc -c
```

That's it. No config file to set up, no extension marketplace to browse. If you've been waiting for a coding agent that fits into your terminal workflow without fighting it — v1 RC is the one to try.
