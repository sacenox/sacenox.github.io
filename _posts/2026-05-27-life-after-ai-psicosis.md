---
layout: post
title: life-after-ai-psicosis
description: A few months of agent experiments, mini-coder rewrites, spec-driven scars, and where AI fits in my workflow now.
---

# Life after AI Psicosis

Last time, [I was poking holes from Pi into Neovim and the Linux desktop](/posts/editor-assist-linux-desktop-use-and-farol-ai/). This one is less of a dev log and more of a field report from the little AI fever dream that started around December.

No medical diagnosis here, just the extremely normal developer condition where every tool, workflow, side project, and bad idea suddenly becomes: "what if an agent did it?"

For a few months, I had enough time to dive into AI seriously. That turned into a long loop of research, experiments, rewrites, benchmark rabbit holes, and occasionally watching a model confidently build something I immediately regretted being responsible for.

The blog has accidentally documented a lot of that path: the [OpenCode setup](/posts/my-opencode-setup/), the [$300 lesson about agents](/posts/less-is-more-what-i-learned-about-working-with-ai/), the [SpaceMolt agent swarm](/posts/launching-zoea-nova-a-swarm-commanders-dream/), then the escalating saga of [mini-coder](/posts/meet-mini-coder-the-pocket-knife-of-ai-coding-agents/) and [cel-tui](/posts/cel-tui-shipped-and-mini-coder-got-faster/).

So, with a bit of distance: what actually stuck?

## Before the spiral

Before December I was already using AI lightly, mostly through Cursor. Sometimes the autocomplete was good. Sometimes it felt like an intern had read half the file and guessed the rest from vibes.

I was not impressed enough to change how I worked. Curious, yes. Skeptical, absolutely. My default mode was still: write the code, understand the code, own the code.

Then I tried OpenCode more seriously because, like Cursor, it gave me access to multiple models in one package. That was the first time I really started asking the dangerous question:

> How much could agents actually do?

Not "can they autocomplete a function?" Not "can they summarize this file?" More like: if I give this thing a repo, tools, instructions, and enough rope, does it build software or a haunted puppet show?

The answer, annoyingly, is both.

## The first agent projects

I started small: simple GitHub projects, little agent interfaces, maybe a search tool here and there. Then the experiments got bigger around [SpaceMolt](https://www.spacemolt.com/), with game clients and agents trying to play inside that universe.

That was where the shape of the problem became interesting. Agents were not just "a better autocomplete". They were loops. They needed tools. They needed memory, context boundaries, retries, logs, prompts, escape hatches, and occasionally adult supervision.

That led to [`mini-coder`](https://github.com/sacenox/mini-coder). I wanted a more minimal, bare CLI agent: less product ceremony, more terminal creature. This was still mostly AI research, so I approached it from every angle I could find: Terminal-Bench style tasks, different tool surfaces, different prompts, different session models, different ways to let the machine hurt itself safely.

The first version was basically a Ralph loop with a prompt I kept extending like a legal contract written during a house fire. That line of history is archived now in the `0.4.x` branch.

It worked. It was useful. It was also a nightmare.

The AI had written the code, picked the dependencies, shaped the architecture, and I had gradually become the unlucky human who owned the consequences. I could operate the thing, but I did not feel like I knew the code underneath it. That is a very bad feeling when your name is on the repo.

## The spec-driven detour

So I archived that version and split the problem. Let mini-coder focus on the agent, and build a separate terminal rendering framework for the UI. That became [`cel-tui`](https://github.com/sacenox/cel-tui).

At the time, spec-driven development was the hype cycle's favorite new hammer, so I tried that too. The funny part is that for a framework, it kind of worked. The spec was detailed enough, the boundaries were clear enough, and the agents produced something usable and fast.

I still have not personally written a line of code in that project.

That sounds cool until you open parts of the implementation and feel your soul leave through the nearest ANSI escape sequence. The library is useful. The performance is good. The public API does the job. But the code itself? Some of the most horrific machine-owned nonsense I have seen.

At this point the machines own that repo. If I ever truly need to work deep inside it by hand, I am probably starting from scratch. Ahah. But as an experiment, it taught me a lot.

## The agent hype sampler platter

Then came the full sampler platter: MCP vs CLI tools, short sessions vs long-living sessions, context management, compaction, no compaction, subagents, delegation, benchmark harnesses, skills, rules, repo-local instructions, the whole circus.

You can see that period in mini-coder's `0.5.x` archive branch: MCP support, compaction experiments, delegation, virtualized logs, tool streaming, skill pickers, and a lot of attempts to make agents more autonomous without making the repo more cursed.

I mixed spec-driven development, test-driven development, comment-heavy guidance, benchmark-driven changes, and several unnamed variants of "please do what I mean, not what I accidentally implied".

The result was educational, but I was never happy with the generated code. More importantly, I was increasingly dreading being responsible for it.

That is the line for me. If I am scared to touch the code without an agent, I do not own the software. I am just managing a haunted artifact.

## Back to the code

A few weeks ago I snapped back the other way and started the current mini-coder from scratch, old-school. No LLM-authored code in that version. Just me, the editor, the compiler, and the usual quiet suffering.

It is mostly stable now, and I expect it to stay that way with only maintenance and small updates. Publicly, mini-coder still moves, but the big philosophical rewrite is over. The point is no longer "how much can I make the agent do?" The point is "where does the agent actually make the work better?"

That is a much healthier question.

In the last couple of days I have been experimenting with a different shape again: a small Neovim plugin, [`vim-pi-complete`](https://github.com/sacenox/vim-pi-complete), for quick AI-assisted edits and refactors. It is tiny, direct, and local to the moment. Select text, ask for a transformation, inspect the diff with your actual human eyes.

That feels closer to the right center of gravity.

## What I learned

Spec-driven development does not really work for me if I care about **how** something is coded. Every ambiguity in natural language becomes a gap where the agent invents a little bridge. Then the job turns into checking what the agent made up. At that point, I would rather be in the code and use the code as the spec.

Tests and comments are also more dangerous around LLMs than people like to admit. Good tests are great. Good comments are useful. Outdated tests and stale comments, though, become cursed instructions. If you let an agent work completely unsupervised, it can happily preserve the wrong thing because the wrong thing looked official.

Agents are still incredible tools. I am literally writing this blog post in the Pi message box. They can augment workflows a ton. But I do not think you can manage them purely top-down. You need to be engrossed in the project with them. You need to be the one thinking. You need to make the decisions.

Delegate the boring bits. Use them to research options. Let them explain unfamiliar code. Let them automate repeatable workflows. Let them draft, compare, summarize, and rubber-duck. And sure, if you are feeling lucky, let them code here and there.

But do not abdicate ownership.

## Going forward

For me, the path now is back to the code.

I will use AI completion where it makes sense. I will keep agents in my CLI for knowledge access, rubber-ducking, workflow automation, and running skills programmatically or on schedules. I will probably keep making small AI tools because I still enjoy the shape of the problem.

What does that mean for mini-coder, cel-tui, and the other AI-focused repos? Not much, really. I am not an AI detractor now. If anything, I finally have enough scar tissue to understand the floor and ceiling of these tools.

Within those limits, they are awesome.

I grew up dreaming of the day I could chat with a computer. We are living that now. That is still magical. Just take it for what it is: an awesome tool, not your intelligent friend.
