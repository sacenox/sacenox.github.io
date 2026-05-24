---
layout: post
title: editor-assist-linux-desktop-use-and-farol-ai
description: Two tiny Pi-powered extensions landed, mini-coder got a lighter UI, and Farol AI lit up as a consulting project.
---

# Editor Assist, Linux Desktop Use, and a Small Lighthouse for AI Consulting

Last time, [cel-tui shipped and mini-coder got faster](/posts/cel-tui-shipped-and-mini-coder-got-faster/). Since then I did the obvious next thing: instead of leaving the agent safely inside one terminal app, I started poking holes into the rest of my tools.

The result is two tiny extensions: one for **Neovim**, one for **Pi**. Both are intentionally small, slightly dangerous in the fun way, and built around the same idea: let the agent help exactly where I already am.

## The scoreboard since May 12

| Project | Commits | What changed |
| --- | ---: | --- |
| `mini-coder` | 6 | v0.6.3, lighter TUI state, better compaction boundaries, and cleaner git/session handling |
| `pi-linux-use` | 4 | New Pi extension for observe/action Linux desktop control |
| `vim-pi-complete` | 2 | New Neovim plugin for selection-based Pi edits |
| `farol-ai` | 6 | New Astro/Tailwind site for my AI consulting project |
| `cel-tui` | 0 | Quiet this round, which is what a UI foundation is allowed to be sometimes |
| **Total** | **18** | A totally normal amount of yak grooming |

## vim-pi-complete: `:Pi` for selected text

[`vim-pi-complete`](https://github.com/sacenox/vim-pi-complete) is a small Neovim plugin that copies the current visual selection, sends it to Pi in non-interactive mode, and replaces the selection with the model output.

The workflow is deliberately simple:

1. select some text in Neovim
2. run `:Pi make this clearer` or `:Pi refactor this`
3. wait while the editor briefly becomes a philosophical device
4. get the selection replaced

There is no big UI yet, no continuation state, and no heroic abstraction layer. It passes file path, file name, the user prompt, and the selected text to `pi`, then tells the model to return only the exact replacement text.

Tiny? Yes. Useful? Also yes. Dangerous? Only in the traditional "I let a robot rewrite my buffer" sense.

## pi-linux-use: Pi can look at the desktop now

[`pi-linux-use`](https://github.com/sacenox/pi-linux-use) is a proof-of-concept Pi extension for Linux desktop computer-use.

It gives Pi two tools:

- `desktop_observe` captures the visible desktop with KDE Spectacle and returns a screenshot image to vision-capable models
- `desktop_input` sends mouse and keyboard actions through `dotool`

There is also a companion `linux-desktop-use` skill that teaches the agent the boring-but-important loop:

```text
observe → act → observe → try not to click the wrong thing
```

Coordinates are pixels in the latest screenshot, which keeps the first version very plain. It is currently KDE/Plasma Wayland-first, because that is the desktop in front of me and I enjoy finishing prototypes before turning them into portability conferences.

The longer-term direction is still interesting: portal ScreenCast, PipeWire, better metadata, crop/zoom helpers, wait-for-change, maybe accessibility/OCR. But the first version is intentionally humble: screenshot plus input. A robot with eyes and a poking stick.

## mini-coder v0.6.3: lighter UI, cleaner context

[`mini-coder`](https://github.com/sacenox/mini-coder) kept moving and is now at **v0.6.3**.

The main change is that the TUI display state is now separated from the model context. That lets the interface stay readable without treating every rendered detail as sacred prompt cargo. Tool calls can be displayed in a more compact way, thinking blocks can collapse into token estimates, and bash/read output does not need to turn the conversation pane into a landfill.

A few other useful bits landed too:

- compaction moved down into the agent core
- compacted messages are no longer saved back into session history
- git handling got consolidated, including the branch/dirty label
- the TUI got trimmed into a lighter conversation view

This is the glamorous part of agent tooling where the product gets better because old tool output stops haunting the present. Very seasonal.

## cel-tui: no drama is also a feature

[`cel-tui`](https://github.com/sacenox/cel-tui) did not get new commits in this window. That is not a complaint.

The useful update is indirect: mini-coder is now leaning on it harder, and the framework is staying out of the way. After the previous sprint of layout, rendering, components, docs, and package work, a quiet stretch where the app can build on top of it is exactly the kind of boring I like.

The packages are still the foundation under this TUI pile, including `@cel-tui/core`, `@cel-tui/components`, and `@cel-tui/clew`.

## Farol AI: lighting a consulting path

I also started [`farol-ai`](https://github.com/sacenox/farol-ai), a small site for my new AI consulting project.

It is built with Astro and Tailwind, with a straightforward Portuguese landing page around AI strategy, agents and automation, prototyping, and production architecture. I also added a design system pass, contact CTAs, and PostHog analytics so the site can be more than a decorative lighthouse JPEG in project form.

This one is less about a package release and more about making the consulting work explicit: helping teams turn fuzzy AI ideas into scoped, buildable, production-minded systems.

## Try the tiny things

For the Neovim plugin:

```bash
cd ~/.config/nvim/pack/local/start
git clone https://github.com/sacenox/vim-pi-complete.git
```

Then restart Neovim, visually select text, and run:

```vim
:Pi rewrite this with fewer weasel words
```

For the Linux desktop Pi extension:

```bash
git clone https://github.com/sacenox/pi-linux-use.git
cd pi-linux-use
pi
```

You will need `spectacle` and `dotool` installed, then ask Pi to look at the desktop. If it clicks the wrong thing, naturally that is research.

And the usual suspects:

```bash
bun add -g mini-coder
mc
```

- [`mini-coder`](https://github.com/sacenox/mini-coder)
- [`cel-tui`](https://github.com/sacenox/cel-tui)
- [`Farol AI`](https://github.com/sacenox/farol-ai)

Next up: make the tiny integrations less tiny, keep mini-coder's context under control, and see how far the desktop-use loop can go before it starts demanding a clipboard budget.
