When OpenCode Can’t See Your Docs

I just spent 20 minutes watching Claude flail around like a lost tourist.

The Setup
You know that feeling when you’ve got everything organized perfectly? I had this beautiful `.agent-docs/` folder full of debugging guides, programming principles, writing tips—the works. All cross-referenced in `AGENTS.md` with a nice little index.
Then I fired up OpenCode and asked Claude to help with a bug.

The Confusion
“Read the systematic debugging guide first,” I said, pointing at the file path.
Claude squinted at the screen. “I don’t see that file. Let me search for debugging patterns instead…”
Then it started making stuff up. Generic debugging advice pulled from training data instead of my carefully crafted, battle-tested process. It was like watching someone reinvent the wheel when I’d already built a Ferrari.
I tried again. “It’s in `.agent-docs/debugging/01-overview-iron-law.md`.”
More confusion. Claude could see the current directory files just fine, but anything in my docs folder might as well have been on Mars.

The Lightbulb
That’s when it hit me—OpenCode only knows about files you tell it about. I’d spent all this time organizing documentation but forgot the most basic step: letting the tool actually access it.
Five minutes later, I created `opencode.json`:

```json
{
  "instructions": [
    ".agent-docs/**/*.md",
    ".agent-docs/**/*.ts",
    ".agent-docs/**/*.sh"
  ]
}
```

The Relief
Restarted OpenCode. Asked the same question.
This time Claude immediately said, “Let me read the systematic debugging guide first” and pulled up the exact file. No more generic advice. No more reinventing wheels. Just my actual process, refined through months of real debugging sessions.

The Takeaway
Your docs are only as good as your tool’s ability to find them. Spend five minutes on `opencode.json` and save yourself hours of watching Claude guess at what you’ve already figured out.
