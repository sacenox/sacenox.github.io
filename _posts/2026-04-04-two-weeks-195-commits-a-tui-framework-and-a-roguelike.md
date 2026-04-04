---
layout: post
title: two-weeks-195-commits-a-tui-framework-and-a-roguelike
description: cel-tui was born, mini-coder hit v0.4.1, dead-floor became a real game, and orc-code started orchestrating agents. 195 commits across 6 repos in two weeks.
---

# Two Weeks, 195 Commits, a TUI Framework, and a Roguelike

[Last time](/posts/mini-coder-hits-stable-393-commits-later/) I shipped mini-coder v0.2.2 and said "stable doesn't mean done." Apparently what it meant was "time to start four other things simultaneously." Here's what happened in the two weeks since.

---

## cel-tui — A TUI Framework From Scratch

The big new thing. **cel-tui** is a declarative TypeScript TUI framework built from the ground up. The name comes from "cel" — the smallest unit of a terminal display, a single character cell. Start from the smallest meaningful unit and build up, with nothing wasted.

This wasn't planned. I kept running into the same pain building terminal UIs for mini-coder and yoctoselect: layout is hard, rendering flickers, CJK characters break everything, and every project reinvents the same primitives. So I built the primitives properly, once.

In 47 commits, cel-tui went from `Initial commit` to a framework with:

- **Flexbox layout engine** — `justifyContent`, `alignItems`, cross-axis intrinsic sizing, the whole deal
- **Differential rendering** — only repaint cells that actually changed. No flicker, no full redraws
- **Overflow clipping** — proper clip rect propagation so content stays inside its container
- **Scroll with scrollbar indicators** — because knowing there's more content shouldn't be a mystery
- **Full focus system** — Tab/Shift+Tab traversal, Escape to blur, Enter/click to focus, key event bubbling
- **TextInput** — with cursor persistence, auto-scroll, and editing that actually works
- **CJK/emoji-aware layout** — `visibleWidth` with grapheme segmentation so 🎉 takes two cells, not one
- **Terminal hardening** — crash cleanup, resize handling, the boring stuff that makes the difference between a demo and a tool
- **Style inheritance** — container `bgColor`, `focusStyle`, uncontrolled focus mode

There's a virtual pet example. There's a hello world. There's documentation. It's preparing for npm publishing as `@cel-tui/core`. I'm unreasonably proud of the differential rendering — watching a complex layout update by repainting only the 12 cells that changed is deeply satisfying.

---

## mini-coder v0.2.2 → v0.4.1

87 more commits. Four more releases. mini-coder kept moving fast.

**v0.3.0 — Streaming and OAuth**
The render pipeline got consolidated — tool input now streams delta-by-delta instead of buffering. You can watch the agent "think through" file edits in real time. Also added OpenAI Codex OAuth login, so you can authenticate with `codex` credentials directly. And Rob Pike's programming rules made it into the system prompt, because good taste is a feature.

**v0.3.1 — Cleanup Pass**
Removed the Claude Code Anthropic OAuth support (it was fragile and arguably against TOS), raised the shell output truncation limit (long `ls` outputs were getting clipped), and fixed a nasty bug where loaded skill context was getting silently dropped between turns.

**v0.4.0 — Provider Alignment**
Decoupled provider discovery from session setup so errors in one don't cascade. Smaller release, but the kind of plumbing work that prevents "why did everything break when my OpenRouter key expired" moments.

**v0.4.1 — Quality of Life**
Now shows a `mc --resume <id>` command when you exit a session, so getting back to where you were is a copy-paste. Also fixed multiline frontmatter parsing — turns out skills with multi-line descriptions were silently truncating. Oops.

---

## dead-floor — From Prototype to Playable

My pixel art roguelike went from "a tile grid with a player dot" to an actual game you can play and die in. 36 commits of pure game dev joy.

The full feature list reads like a roguelike checklist: **three enemy types** (Bones chases you, Shambler is slow but hits hard, Wraith phases through walls, Husk shoots projectiles), **items** (health, max HP, damage pickups), **timed buffs** (shield, haste, ghost), **procedural rooms** (L-shapes, crosses, T-shapes), **floor transitions** with depth scaling, a **score system** with persistent high scores, a death screen, and play-again on Enter.

The 16×16 pixel art sprites are in. The z-ordering bug I mentioned last post? Actually fixed now, with a visual verification pipeline so it doesn't regress. Rooms are centered on screen with a black background that doesn't look like a terminal accident anymore.

It's still a side project, but it's a side project you can actually *play*.

---

## orc-code — The Orchestrator Idea

Brand new repo, 7 commits, still early. **orc-code** is a terminal-native orchestrator for coding agent CLIs. The idea: instead of implementing yet another agent, treat existing tools like Claude Code, Codex, and mini-coder as interchangeable execution backends.

You authenticate with each agent's CLI directly. Orc handles orchestration, agent selection, and session proxying through a plugin system. There are already plugins for Claude and Codex, the monorepo is split into `orc-core` (library) and a separate CLI package, and it can do one-shot prompts through either backend.

It's a bet that the future isn't "one agent to rule them all" — it's "the right agent for the right task, with one stable UX on top."

---

## The Supporting Cast

- **yoctoselect** — 15 commits. Got word-prefix matching in the filter, viewport scrolling past `maxVisible`, a stdin buffer parsing fix, and shipped v0.0.3 to npm.
- **coder-skills** — 3 commits. A new repo for reusable agent skills. Has a code-review skill and a systematic-debugging skill so far. These are the skills mini-coder (and eventually orc-code) can load.

---

## By the Numbers

| Stat | Value |
|------|-------|
| Commits since last post | 195 |
| Active repos | 6 |
| New repos created | 2 (cel-tui, orc-code) |
| mini-coder releases | 4 (v0.3.0 → v0.4.1) |
| Enemy types in dead-floor | 4 |
| TUI features built from scratch | Too many to count |
| Times I said "this will be quick" | At least 5 |
| Times it was actually quick | 0 |

---

## What's Next

cel-tui is heading toward its first npm publish. mini-coder is getting a spec-driven refactor. orc-code needs to prove it can actually orchestrate a multi-step task across agents. dead-floor needs more floors and maybe a boss. And I need to stop starting new projects.

(I will not stop starting new projects.)

```bash
bun add -g mini-coder
mc
```

---

*GitHub: [sacenox/mini-coder](https://github.com/sacenox/mini-coder) · [sacenox/cel-tui](https://github.com/sacenox/cel-tui) · [sacenox/orc-code](https://github.com/sacenox/orc-code) · sacenox/dead-floor (private repo) · [sacenox/yoctoselect](https://github.com/sacenox/yoctoselect)*
