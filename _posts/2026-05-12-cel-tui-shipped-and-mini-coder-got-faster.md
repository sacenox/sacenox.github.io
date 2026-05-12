---
layout: post
title: cel-tui-shipped-and-mini-coder-got-faster
description: cel-tui grew from yak shave to TUI framework, mini-coder got a rebuild, and a few tiny tools escaped the lab.
---

# cel-tui Shipped, mini-coder Got Faster, and the Yak Has a Framework Now

Last time, [mini-coder v1.0 RC was here](/posts/mini-coder-v1-0-rc-is-here-fast-focused-and-ready-to-ship/). Since then I did the perfectly normal engineering thing: I looked at the terminal UI, muttered "I can make this smaller," and accidentally built a framework.

The headline is **cel-tui**: a TypeScript TUI framework built around plain objects, a flexbox-ish layout engine, differential cell-buffer rendering, and Kitty-first keyboard input that behaves nicely in `tmux`.

Naturally, this began as a small yak shave. The yak now has packages, docs, benchmarks, examples, and a streaming syntax tokenizer. Very healthy. Nothing to see here.

## The scoreboard since March

| Project | Commits | What changed |
| --- | ---: | --- |
| `cel-tui` | 142 | Born, packaged, benchmarked, and released through package version `0.8.3` |
| `mini-coder` | 58 | Reworked around the new TUI stack, provider settings, sessions, compaction, and streaming polish |
| `coder-skills` | 6 | Reusable agent skills, including human-writing and testing practices |
| `diff-scope` | 5 | A tiny terminal diff viewer built with `cel-tui` |
| `dotfiles` | 5 | Agent config and shell cleanup |
| `alfred` | 2 | Early Google Workspace butler skills |
| **Total** | **218** | Several responsible decisions, probably |

## cel-tui: the terminal UI yak shave

`cel-tui` is the thing I wanted under mini-coder: fast, boring in the right places, and easy for an agent to reason about. The API is functional and declarative:

```ts
VStack({ height: "100%" }, [
  Text("Hello, cel-tui!", { bold: true }),
  TextInput({ value, onChange }),
]);
```

Under that small surface area is the pile of terminal work you always forget exists until it bites you:

- grapheme-aware width measurement for CJK and emoji
- flex layout, wrapping, padding, clipping, layers, focus, hit testing, and scrollbars
- a differential cell buffer renderer
- Kitty keyboard protocol support with legacy fallbacks
- uncontrolled focus and scroll, with controlled escape hatches when needed
- `TextInput` editing shortcuts, cursor stability, bracketed paste, and sane wheel scrolling
- components like `Button`, `Select`, `Markdown`, `SyntaxHighlight`, `Divider`, and `VDivider`

There is also `@cel-tui/clew`, a stream-first syntax tokenizer that now handles TypeScript highlighting and diff output. Because apparently one package was not enough rope.

## Benchmarks, because vibes are not a profiler

The benchmark suite grew alongside the framework. The headline synthetic case is still pleasantly tiny: an Ink-comparable 80×24 render comes in around **67 µs**, or about **14,900 renders/sec** on the measured machine.

The more useful work was adding real app-shaped benchmarks. Those caught the unglamorous truth: long unvirtualized conversation layout is the actual villain. That led to line-count caching, virtualized scrollback shapes, and a much clearer sense of what mini-coder needs from the renderer.

In other words: the benchmark suite did its job by being rude.

## mini-coder kept moving too

mini-coder did not sit quietly while its UI foundation turned into a project. The recent run added or reworked:

- headless one-shot mode and the interactive TUI loop
- streaming assistant text, reasoning, tool calls, and tool output
- settings, env-key providers, custom providers, and OAuth-backed providers
- session persistence and `/new`
- context pressure tracking and conversation compaction
- better prompt/tool reminders
- a simpler `read` tool
- a `nono` starter config for isolation-friendly runs

One funny casualty: the `task` tool got removed after benchmarks showed it was underperforming. It is always nice when the profiler does product management.

## Small tools escaped

A few side quests also wandered out of the workshop.

[`diff-scope`](https://github.com/sacenox/diff-scope) is a small terminal git diff viewer built with `cel-tui`. It has staged/unstaged snapshots, diff highlighting, wrapped long lines, a status bar, auto-refresh, and a help modal. It mostly exists to prove the framework can build something real without requiring a blood pact.

[`coder-skills`](https://github.com/sacenox/coder-skills) became a home for reusable agent skills: code review, debugging, programming practices, testing, and human-writing guidance. The pattern is simple: write the workflow once, reuse it everywhere agents can read Markdown.

[`alfred`](https://github.com/sacenox/alfred) is the early digital-butler direction, starting with Google Workspace support. Still small, but useful enough to keep around.

## Try it

For the TUI framework:

```bash
bun add @cel-tui/core @cel-tui/components
```

Docs and source:

- [`cel-tui` on GitHub](https://github.com/sacenox/cel-tui)
- [`cel-tui` API docs](https://sacenox.github.io/cel-tui/)

For the coding agent:

```bash
bun add -g mini-coder
mc
```

- [`mini-coder` on GitHub](https://github.com/sacenox/mini-coder)

The next stretch is less glamorous and more important: hardening the APIs, using the real-world benchmarks to keep latency honest, and making sure the tiny tools stay tiny. Famous last words, yes.