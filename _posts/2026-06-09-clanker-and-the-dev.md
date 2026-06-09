---
layout: post
title: clanker-and-the-dev
description: A new comic project about AI coding gremlins, from deterministic terminal cartoons to an open-weight Python generation pipeline.
---

# Clanker and the Dev

Last time, [I wrote about climbing back out of the AI fever dream and getting closer to the code again](/posts/life-after-ai-psicosis/). Naturally, the responsible follow-up was to make a comic strip about developers, AI tools, terminal gremlins, and all the little disasters that happen when the machine is *almost* helpful.

Meet [Clanker and the Dev](https://github.com/sacenox/clanker-and-the-dev): a small Jekyll comic blog for jokes that compile into neon terminal chaos. It is live at [sacenox.github.io/clanker-and-the-dev](https://sacenox.github.io/clanker-and-the-dev/), because apparently even the jokes need CI now.

## The first version: clockwork cartoons

The project started with a deterministic cartoon comic generation algorithm.

That sounded very comforting at first. Panels were rules. Characters were rules. Speech bubbles were rules. Layout was rules. If I could encode enough geometry and enough little terminal-art constraints, surely the comic would simply obey.

And it did. Sort of.

The deterministic version was controllable, which was great. It was also a tiny puppet theater where every new joke needed more strings attached to it. The style was consistent, but the process felt like manually explaining slapstick to a spreadsheet.

## Then the model entered the panel

So the pipeline moved toward LLM-assisted comic generation.

The current version uses an agent skill, LLMs, and a Python script. The LLM helps turn a joke or premise into a structured comic spec and dialogue, then the Python side renders the panels with open-source weights: SDXL, IP-Adapter references, ControlNet layout guides, and Pillow compositing to drag the result back into crisp terminal-comic territory.

That shift made the whole thing much more expressive. Instead of hand-arranging every little cartoon decision, I can give the system a premise like "AI coding assistant discovers it has a limb budget" and let the pipeline produce an actual strip.

Which is magical.

Also, because this is generative AI, sometimes the magic has seven fingers and a speech bubble written in cursed oatmeal.

## The real work: accuracy and consistency

Most of the development has been refinement, not just generation.

The hard part is getting the comic to be accurate enough to the prompt, consistent enough across panels, and still weird in the right way. The pipeline now uses reference images, layout guides, character anchoring, panel-by-panel generation, clipping, and compositing passes to reduce drift.

A tiny status table from the first burst:

| Thing | Status |
| --- | --- |
| Public repo | [sacenox/clanker-and-the-dev](https://github.com/sacenox/clanker-and-the-dev) |
| Site | [GitHub Pages](https://sacenox.github.io/clanker-and-the-dev/) |
| Main stack | Jekyll, Python, SDXL, IP-Adapter, ControlNet |
| Recent activity | 11 commits since the last blog post |
| Current mood | Improved, but still haunted |

It is already quite a bit better than the first pass. The comics are more fun, the style is more interesting, and the generation is much closer to something I can keep using.

But it still needs more fine tuning. There are still errors in the generated panels: character drift, strange hands, occasional layout confusion, and the usual model habit of confidently misunderstanding a visual instruction. The machine is funnier now, but it is not yet house-trained.

## Community-driven comedy :D

The fun part is that this does not have to be just my joke machine.

If you have a joke about AI coding, burnout, terminals, yak shaving, overconfident bots, or software nonsense, please fork the repo and add it. The README has the comic-generation flow, including the `add-new-comic` skill and the Python command that builds a strip from a spec.

Small premises are welcome. Half-baked ideas are welcome. Pull requests are welcome. If the premise is funny, Clanker can probably ruin it beautifully.

Fork it here: [github.com/sacenox/clanker-and-the-dev](https://github.com/sacenox/clanker-and-the-dev)

Community-driven comedy. What could possibly go wrong?
