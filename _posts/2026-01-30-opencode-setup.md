---
layout: post
title: my-opencode-setup
description: agents, commands, and the one skill I always load
---

# My OpenCode Setup: Agents, Commands, and Skills

Ever wonder what happens when you get tired of repeating the same AI prompts? You build your own personal army of specialized agents. That's exactly what I did with my OpenCode configuration.

## The Three Amigos: My Agent Collection

I've got three main agents doing the heavy lifting, each with their own personality and purpose.

**The Debug Agent** is my systematic detective. This guy follows a strict four-phase process: root cause investigation, pattern analysis, hypothesis testing, and implementation. No shortcuts allowed. It tracks fix attempts and stops after three failures to question whether we're solving the wrong problem. The iron law? No fixes without root cause investigation first.

**The Plan Agent** is my read-only strategist. It can't touch any files—just thinks, analyzes, and delegates to explore agents. It breaks down planning into understanding the idea, exploring approaches (usually 2-3 options), and presenting designs in digestible chunks. It applies YAGNI ruthlessly and guards against overengineering.

**The Blog Writer Agent** (which is writing this post) specializes in personal, informal content. It researches topics, structures posts with hooks and takeaways, and always includes sources. Temperature is cranked up to 0.7 for creativity.

Model choice is simple, the Debug and Plan agents use Claude Opus, and the Build mode I switch between Codex and Gemini.  This keeps token usage and costs down, while still using good coding models for hard tasks.

## Quick Commands for Common Tasks

I've got three slash commands that handle the boring stuff:

**`/commit-all`** stages everything and creates conventional commits. It does safety checks for sensitive files and handles pre-commit hook failures gracefully.

**`/format-then-lint`** detects available tools (npm, make, cargo, etc.) and runs formatters before linters. If anything fails, it stops and reports issues.

**`/review`** does code reviews with programming principles in mind. It can review uncommitted changes, specific commits, branches, or even pull requests. It focuses on bugs first, then structure and performance.

## The Skill That Keeps Me Honest

The **good-programming-principles** skill is loaded whenever I'm designing or reviewing code. It enforces KISS, DRY, YAGNI, and SOLID principles while guarding against feature creep and overengineering. It's not dogmatic—just keeps solutions simple and scoped.

## Why This Setup Works

The global `AGENTS.md` file sets communication rules: be concise, never lie, find root causes before fixing, and minimize token usage. It mandates using exploration agents for multi-file tasks and structured tools over bash utilities.

What I love about this setup is how it codifies good practices. The debug agent prevents me from guessing and checking. The plan agent forces me to think before building. The review command catches issues I'd miss.

It's like having a team of specialists who never get tired, never forget the process, and always apply best practices. Plus, they're available 24/7 and don't need coffee breaks.

## Sources

- [OpenCode config directory](https://github.com/sacenox/dotfiles/tree/main/opencode)
