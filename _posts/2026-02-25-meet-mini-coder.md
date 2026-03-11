---
layout: post
title: meet-mini-coder-the-pocket-knife-of-ai-coding-agents
description: Mini-coder is a CLI coding agent that lives in your terminal — fast, minimal, and built by an agent itself.
---

# Meet Mini-Coder: The Pocket Knife of AI Coding Agents

I've been using AI coding tools for a while now, and most of them feel like they were designed by someone who's never actually been in the zone. Heavy GUIs, slow startups, a dozen config files before you write a single line of code. Mini-coder is the opposite of all that.

## What Is It?

Mini-coder (`mc`) is a CLI coding agent that lives in your terminal. You run `mc`, type a prompt, and it gets to work — reading files, searching code, making edits, running shell commands. It talks to whatever LLM you've got handy: Anthropic, OpenAI, Google, a local Ollama model, or Zen. It auto-discovers your API keys from environment variables, so there's no special setup dance.

The whole thing runs on [Bun.js](https://bun.com), which means fast startup and native TypeScript. Your sessions are saved in a local SQLite file, so you can pick up where you left off with `-c` or jump back to a specific conversation with `-r <id>`.

## The Tools It Has

Mini-coder gives the LLM a tight, reliable set of tools: `glob`, `grep`, `read`, `create`, `replace`, `insert`, `shell`, and `subagent`. That last one is my favorite — it can spawn parallel copies of itself to tackle independent subtasks at the same time. Divide and conquer, with AI.

The `replace` and `insert` tools use hashline anchors (line numbers + a short hash) so edits land exactly where they should. No more "replace all occurrences and hope for the best."

## The Little Things That Matter

The slash commands are genuinely useful. `/plan` puts it in read-only thinking mode so it can reason without touching anything. `/ralph` kicks off an autonomous loop. `/review` spins up a subagent focused purely on code review. `/undo` rolls back the last turn if it went sideways.

There's also a `.agents` folder convention for custom commands, agents, and skills — and it's the same convention used by Claude Code, Opencode, and other tools in the ecosystem. Write a skill once, use it everywhere.

One detail I love: it only uses the 16 standard ANSI colors. That means its output inherits your terminal theme automatically. Dark mode, light mode, Gruvbox, Solarized — it just looks right, every time.

And yes, mini-coder was built *by* a mini-coder agent. Agents all the way down. 🐢

## The Takeaway

Mini-coder isn't trying to replace your IDE or become the center of your workflow. It wants to disappear into it. If you're the kind of developer who lives in the terminal and gets annoyed when tools get in the way, `mc` is worth a try. Install it with `bun add -g mini-coder` and you're off.

---

## Sources

- [mini-coder README](https://github.com/sacenox/mini-coder) — local repo `README.md`
- [mini-coder idea doc](https://github.com/sacenox/mini-coder/blob/main/mini-coder-idea.md) — local repo `mini-coder-idea.md`
- [Bun.js](https://bun.com)
- [AI SDK](https://ai-sdk.dev)
- [yoctocolors](https://github.com/sindresorhus/yoctocolors)
- [.agents convention](https://github.com/agentsmd/agents.md)
