---
layout: post
title: "agents.md migration"
description: "A weekend migration from skill files to AGENTS.md, with focused docs, faster lookups, and lower token use."
---

# Ditching Skills for AGENTS.md: How I Restructured My AI Documentation

I just finished a pretty big refactor of how my AI agents access their instructions. After reading Vercel's research showing AGENTS.md outperforms skills, I decided to test it myself. Spoiler: they're right.

## What I Had Before

I was using a skills-based system where agents would load specific skill files when they needed guidance. It worked, but it felt clunky. The systematic debugging skill was this massive file with everything crammed in. The writing skill mixed basic grammar with advanced patterns. Finding the right info took too long.

## What Changed

Here's the breakdown of my migration:

- **Replaced skills with AGENTS.md** that points to a compressed docs index
- **Split systematic debugging** into 21 focused files instead of one giant skill
- **Condensed writing guidance** to essentials plus AI pattern avoidance
- **Added programming principles** covering KISS, DRY, YAGNI, SOLID, and scope management
- **Created .agent-docs folder** with 29 total files: 21 debugging, 6 programming, 2 writing
- **Kept skills/ folder** but removed the content (for now)
- **Updated README** to document the new structure

The biggest change is retrieval-led reasoning. Instead of loading entire skills, agents now read specific sections based on what they actually need.

## Why This Works Better

The new system fixes several pain points:

- **Faster lookups** - agents find relevant info without loading everything
- **Better organization** - debugging phases are separate files, not buried in walls of text
- **Reduced token usage** - only load what you need, when you need it
- **Easier maintenance** - updating one concept doesn't require editing massive files
- **More targeted guidance** - specific files for specific problems

The debugging documentation especially benefits from this. Instead of hunting through a 5,000-word skill file, agents can jump straight to "Phase 2: Pattern Analysis" or "Red Flags to Watch For."

## The Implementation

The core insight from Vercel's research is that structured documentation with clear entry points beats monolithic skills. My AGENTS.md now includes a compressed docs index that maps topics to specific files. When an agent needs debugging help, it reads the overview first, then drills down to the relevant phase.

I kept all the debugging content but broke it into logical chunks. The writing guidance got streamlined - just Strunk's essentials plus common AI patterns to avoid. Programming principles got their own section because code quality deserves focused attention.

## Results So Far

Early testing shows agents find answers faster and use fewer tokens. They're not loading irrelevant sections or getting lost in long files. The debugging workflow especially feels smoother - agents can follow the phases without getting overwhelmed.

Don't forget to update your `opencode.json` like me - [here's the short cautionary tale](/2026/01/31/when-opencode-cant-see-your-docs/) on why that matters.

The migration took a few prompts and reviews, but the payoff is immediate. Sometimes the research is right: AGENTS.md with targeted docs really does work better than monolithic skills.

_[EDIT]: Token usage is way down._

## Sources

- [Vercel's AGENTS.md research](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals)
- [Refactored AGENTS.md](https://github.com/sacenox/dotfiles/blob/main/opencode/AGENTS.md)
