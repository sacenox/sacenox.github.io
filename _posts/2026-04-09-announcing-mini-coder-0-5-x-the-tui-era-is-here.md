---
layout: post
title: announcing-mini-coder-0-5-x-the-tui-era-is-here
description: mini-coder 0.5.0 is on npm with a full TUI rewrite, a cleaner core, and cel-tui underneath it all.
---

# Announcing mini-coder 0.5.x — The TUI Era Is Here

[Last time](/posts/two-weeks-195-commits-a-tui-framework-and-a-roguelike/) I said mini-coder was getting a spec-driven refactor. That turned into the biggest rewrite the project has had so far. `mini-coder@0.5.0` is now on npm, and this is the version that finally feels like the product I wanted on day one.

```bash
bun i -g mini-coder && mc
```

---

## It started as a Ralph loop and a dare

mini-coder began with one extremely normal prompt:

> "Make a coding agent for the terminal cli, use tmux to verify it's done. Say DONE when you have a working application."

That was the seed. No product plan. No brand deck. Just "give the agent shell access, make it useful, and prove it in tmux."

The funny part is that this origin still explains the project better than any polished mission statement. mini-coder was always supposed to be a sharp terminal tool first, not a chatbot wearing a CLI costume.

---

## The no-TUI era was fast, useful, and increasingly cursed

For a while, the no-TUI approach was the point. Keep it shell-like. Keep it append-only. Keep the interface out of the way.

Then scope creep showed up with a baseball bat.

Sessions, skills, provider discovery, OAuth, MCP, shell integration, markdown streaming, `mc-edit`, web search, more commands, more edge cases. The original architecture kept accepting all of it right up until it very much did not.

A lot of that pain ended up in provider glue. The old codebase talked directly to a pile of provider SDK packages and spent way too much energy on model lists, OAuth weirdness, compatibility quirks, and "why does this provider almost match the others except for the important parts" debugging. The git history from late March is basically a little diary of that phase: add OAuth, align provider discovery, fix teardown, remove Anthropic OAuth, fix another provider edge case, keep moving.

It shipped, but it was fragile. One feature would land and two unrelated parts would start making concerning noises. By `v0.4.1`, mini-coder was good enough to use every day and annoying enough to rewrite.

---

## Then the side quest ate the roadmap

While working on the rewrite I hit the same wall over and over: terminal UI code is miserable when you're hand-gluing ANSI, input handling, layout math, scrolling, and Unicode width fixes together.

So naturally I did the reasonable thing and built a whole new framework.

That's **[cel-tui](https://github.com/sacenox/cel-tui)**. It started as infrastructure for mini-coder and quickly turned into its own project: declarative components, flexbox-ish layout, differential rendering, proper text measurement, a focus system, and keyboard input that treats the terminal a little more like the platform it deserves to be.

The inspiration was basically "what if building a terminal app felt a bit more like building a web app, but without dragging a browser into it?" Compose small pieces. Keep state external. Let layout be layout. Re-render cleanly.

It was supposed to be a side quest. It is now on npm too, and mini-coder is not the only thing using it anymore. So that escalated nicely.

---

## 0.5.x is the clean break

On April 4 I did the scary version of "refactor": `feat: clean rewrite — add spec.md, reset repo for v2`.

Since `v0.4.1`, mini-coder picked up **81 commits** and the diff from `v0.4.1` to `v0.5.0` touched **217 files**. Under the hood, this is a much simpler system than the one it replaced.

A few big shifts:

- **Real TUI, not terminal glue** — conversation log, tool blocks, diff previews, overlays, multiline input, and a status bar built on cel-tui
- **Provider handling via pi-ai** — less bespoke SDK babysitting, more time spent on actual agent behavior
- **Smaller core tool surface** — `shell`, `edit`, and `readImage`, with plugins for extras instead of turning core into a junk drawer
- **Spec-driven rebuild** — the product has an explicit shape now, which turns out to be useful when you're trying not to reinvent it every three days
- **Headless mode** — `mc -p "..."` now works cleanly for scripts and benchmark harnesses too

This version feels more focused. Fewer weird historical accidents. More deliberate product.

---

## What's in the new TUI era

The headline isn't just "it looks nicer now," though it does. The important part is that the UI and the architecture finally agree about what mini-coder is.

The current `0.5.x` release has:

- streaming markdown conversation rendering
- interactive `/model`, `/session`, `/help`, `/login`, `/logout`, `/new`, `/fork`, `/undo`, `/reasoning`, `/verbose`, and `/effort`
- persistent settings and session history
- image and skill input flows
- Ctrl+R prompt history search
- cleaner status reporting, including tone-based context and effort hints
- a much flatter repo and test surface than the pre-rewrite codebase

In other words: still small, still fast, but no longer held together by optimism and ANSI escape codes.

---

## By the numbers

| Stat | Value |
|------|-------|
| Days from first commit to `v0.5.0` | 48 |
| Total mini-coder commits | 658 |
| Commits since `v0.4.1` | 81 |
| Rewrite diff | 217 files changed |
| cel-tui commits so far | 102 |
| mini-coder npm version | `0.5.0` |
| cel-tui npm version | `0.5.0` |
| Times a "quick fix" became a new library | At least 1 |

---

## Try it

mini-coder is on npm right now:

```bash
bun i -g mini-coder && mc
```

If you've tried an older version, this is the one I'd recommend coming back to. It's closer to the original idea: a coding agent that lives in the terminal, uses the terminal properly, and gets out of your way when it's doing its job.

And yes, it still traces back to that first dumb-beautiful Ralph loop prompt in tmux. Some ideas are good enough to survive a full rewrite.

---

*GitHub: [sacenox/mini-coder](https://github.com/sacenox/mini-coder) · [sacenox/cel-tui](https://github.com/sacenox/cel-tui)*
