---
layout: post
title: mini-coder-hits-stable-393-commits-later
description: mini-coder went from release candidate to v0.2.2 stable in two weeks. Here's the story of 393 commits, a newborn library, and an agent that helped build itself.
---

# mini-coder Hits Stable — 393 Commits Later 🎉

Two weeks ago I posted that mini-coder had reached its [first release candidate](/posts/mini-coder-v1-0-rc-is-here-fast-focused-and-ready-to-ship/). "Expect v1 stable to follow quickly," I said.

What actually followed was **393 commits**, four release tags, two new micro-libraries, a full codebase audit, and at least one existential crisis about context pruning. But we made it: **mini-coder is stable.** Version `0.2.2` is on npm right now, and it's the best terminal coding agent I've ever shipped. (It's also the only one I've ever shipped, but still.)

---

## The Road from RC to Stable

Here's the condensed timeline of what happened after I hit "publish" on that RC post:

**v0.1.0 — The Real v1 (March 16)**
The RC tag was `0.0.14`. The actual stable v1 landed as `0.1.0` because semver is a lifestyle, not a science. This was the big one: a full UI audit, parallel tool call rendering with those cute `↳` labels, and a refactored CLI that actually made sense.

**v0.1.2 — Small but Mighty**
Model sync was caching provider lists for *seven days*. That's fine until a provider ships a new model and you're stuck wondering why you can't use it. Dropped it to 24 hours. Also added reasoning/verbose status to the banner because knowing what mode you're in shouldn't require guesswork.

**v0.2.0 — The Big Refactor**
This one was intense. Context pruning got completely reworked — the old approach had a blunt step-prune fallback that literally caused amnesia on long conversations. Turns out, an agent that forgets what it's working on mid-task is not, in fact, useful. Who knew? Also reformatted the entire codebase with Prettier, consolidated skills, and cleaned up a bunch of dead Anthropic thinking code.

**v0.2.1 — Interactive Everything**
Spawned a whole new library ([yoctoselect](https://github.com/sacenox/yoctoselect)) just so model and session pickers could have fuzzy filtering. Because typing `anthropic/claude-sonnet-4-20250514` from memory is a party trick, not a workflow.

**v0.2.2 — Ship It**
Safety hardening, stale skill dedup fixes, and the banner now shows your connected MCP servers. The kind of polish pass that means "okay, this is actually ready."

---

## Things I Fixed That I'm Weirdly Proud Of

- **The amnesia bug.** Context pruning was silently dropping important conversation history on long turns. The agent would just… forget what it was doing. Imagine pair programming with someone who blacks out every 20 minutes. Fixed by moving to per-step pruning instead of a dumb fallback.

- **The exit hang.** Closed stdin + a dangling event loop = a process that never dies. The kind of bug that makes you mass-kill terminal tabs and question your life choices.

- **ESC interrupt double-prompt.** Hitting Escape to cancel would print the prompt twice. Minor? Yes. Infuriating after the 50th time? Also yes.

- **The audit skill that killed tmux.** I wrote an audit skill that would helpfully `exit` when it was done. Unfortunately, "done" meant "kill the entire tmux session." The fix was one line. The debugging was not.

---

## Side Quests

Mini-coder wasn't the only thing moving. A few supporting projects got love too:

- **[yoctoselect](https://github.com/sacenox/yoctoselect)** — Born out of necessity. A tiny interactive select/filter widget for the terminal. Now powering mini-coder's model and session pickers.

- **[yoctomarkdown](https://github.com/sacenox/yoctomarkdown)** — Got flicker-free streaming with append-only partial rendering and proper Unicode width calculation. Markdown in the terminal shouldn't feel like a strobe light.

- **dead-floor** — My pixel art roguelike side project got 16×16 sprites and a z-ordering fix. Because sometimes you need to make tiny skeletons instead of debugging context windows.

---

## By the Numbers

| Stat | Value |
|------|-------|
| Commits since RC post | 393 |
| Release tags shipped | 6 (v0.0.23 → v0.2.2) |
| New libraries born | 2 (yoctoselect, yoctomarkdown improvements) |
| Bugs where the fix was one line | At least 4 |
| Bugs where the *debugging* was one line | 0 |

---

## What's Next

Stable doesn't mean done. There's a roadmap brewing — conversation summarization when you hit max context, better MCP workflows, and some ideas around multi-repo coordination. But for now, v0.2.2 is solid, fast, and does what a terminal coding agent should do: help you code without getting in the way.

```bash
bun add -g mini-coder
mc
```

That's it. Go try it. And if something breaks, well — there's always v0.2.3. 🐢

---

*GitHub: [sacenox/mini-coder](https://github.com/sacenox/mini-coder)*
