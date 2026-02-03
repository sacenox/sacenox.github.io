---
layout: post
title: Building a Production-Ready OpenCode Configuration from Scratch
description: A deep dive into cost optimization, workflows, and skills for OpenCode.
---

# Building a Production-Ready OpenCode Configuration from Scratch

Setting up an AI coding assistant isn't just about picking a model and starting to code. After spending time configuring OpenCode from the ground up, I learned that a thoughtful setup can save you money, improve code quality, and create a more disciplined development workflow.

Here's how I built a comprehensive OpenCode configuration that balances cost efficiency with powerful capabilities.

## The Foundation: Global Rules and Workflow

The first step was creating a global `AGENTS.md` file at `~/.config/opencode/AGENTS.md`. This isn't just documentation—it's the behavioral contract for all AI interactions.

### Core Principles

I established several non-negotiable rules:
- Professional tone (no "You're absolutely right!" responses)
- No emojis or AI-speak
- Documentation-first approach
- No auto-commits without explicit approval
- Always work within the current repo's root

### The Six-Phase Workflow

The real breakthrough was implementing a structured development workflow:

1. **Plan** - Use Plan mode for gathering information and creating detailed plans
2. **Validate** - Verify assumptions before building
3. **Build** - Implement with discipline to return to Plan if issues arise
4. **Review** - Use the built-in `/review` command (a hidden gem I discovered)
5. **Document** - Update AGENTS.md, README.md, and inline docs
6. **Complete** - Provide verification evidence before claiming "done"

This workflow prevents the common AI pitfall of pushing through problems blindly.

## Configuration: opencode.json Optimization

The `opencode.json` file is where the magic happens. Here's what I learned about model selection and cost optimization.

### Model Selection Strategy

I started with Claude Sonnet 4.5 at $3.00/$15.00 per 1M tokens, but the costs were adding up fast. After analyzing usage patterns, I discovered that cache reads were dominating my bill—534M cache reads in typical usage.

The breakthrough came with Gemini 3 Flash at $0.50/$3.00 per 1M tokens. This represented an 80% cost reduction while maintaining quality for most coding tasks.

### Smart Configuration Choices

```json
{
  "provider": "opencode-zen",
  "default_model": "opencode/gemini-3-flash",
  "small_model": "opencode/gpt-5-nano",
  "instructions": [
    "CONTRIBUTING.md",
    "docs/guidelines.md",
    ".cursor/rules/*.md"
  ],
  "agent_temperatures": {
    "plan": 0.1,
    "build": 0.3
  }
}
```

Key insights:
- Use a free model (GPT 5 Nano) for simple tasks like title generation
- Auto-load project documentation with the `instructions` array
- Different temperatures for different modes (lower for planning, higher for creative building)
- Git permission rules requiring approval for destructive operations

## Skills: The Secret Weapon

The skills ecosystem through `skills.sh` was a game-changer. I installed seven carefully chosen skills:

### Core Skills Installed

- **systematic-debugging** - Methodical approach to problem-solving
- **verification-before-completion** - QA discipline before claiming "done"
- **writing-plans** - Structured planning methodology
- **commit-work** - Git commit discipline and best practices
- **crafting-effective-readmes** - Documentation standards
- **mermaid-diagrams** - Visual documentation tools
- **writing-clearly-and-concisely** - Communication improvement

### Installation Strategy

I used the `npx skills -g` command to install skills globally, then copied them as actual files (not symlinks) for portability across machines. This ensures the configuration works identically on any development environment.

## Hidden Features and Discoveries

### The /review Command

OpenCode has a built-in `/review` command that I wish I'd discovered earlier. It can review changes at different scopes:
- `review changes` - Uncommitted changes (default)
- `review changes commit` - Last commit
- `review changes branch` - Current branch vs main
- `review changes pr` - Pull request changes

This eliminates the need for manual code review workflows.

### Model Naming Convention

OpenCode Zen uses a specific naming convention with the "opencode/" prefix. This caught me off guard initially—make sure to use names like `opencode/gemini-3-flash`, not just `gemini-3-flash`.

## Cost Analysis and Optimization

The numbers tell the story. My original configuration would have cost roughly $50-80 per month for heavy usage. The optimized setup reduced this to $10-15 per month—a 75-80% savings.

### Cost Factors to Consider

- **Input tokens** - Your code and prompts
- **Output tokens** - AI responses
- **Cache reads** - Often the biggest cost factor
- **Model capabilities** - Balance cost vs. quality needs

The key insight: cache reads can dominate your bill. Choose models with favorable cache pricing, and Gemini 3 Flash excels here.

## Final Directory Structure

```
~/.config/opencode/
├── AGENTS.md          # Global rules and workflow (63 lines)
├── opencode.json      # Optimized configuration
├── agents/
│   └── writer.md      # Specialized subagents
└── skills/            # Portable skill library
    ├── commit-work/
    ├── crafting-effective-readmes/
    ├── mermaid-diagrams/
    ├── systematic-debugging/
    ├── verification-before-completion/
    ├── writing-clearly-and-concisely/
    └── writing-plans/
```

## Lessons Learned

1. **Start with discipline** - Rules and workflow matter more than model choice
2. **Monitor costs actively** - Usage patterns reveal optimization opportunities
3. **Skills are force multipliers** - The ecosystem provides battle-tested methodologies
4. **Documentation is configuration** - AGENTS.md shapes AI behavior as much as JSON settings
5. **Hidden features exist** - Explore built-in commands like `/review`

## Next Steps

This configuration provides a solid foundation, but it's designed to evolve. As new models become available and costs change, the structure supports easy updates. The workflow ensures quality remains high regardless of the underlying technology.

The investment in setup pays dividends in every subsequent coding session. Professional AI assistance isn't just about having access to models—it's about creating systems that amplify your capabilities while maintaining discipline and cost control.

## Sources

- OpenCode documentation and configuration reference
- skills.sh ecosystem and skill library
- OpenCode Zen pricing analysis and model comparisons
- Personal configuration testing and cost optimization experiments
