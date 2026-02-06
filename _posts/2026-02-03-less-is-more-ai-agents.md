---
layout: post
title: less-is-more-what-i-learned-about-working-with-ai
description: Lessons learned from spending $300 on API credits and why simplicity wins.
---

# Less is More: What I Learned About Working with AI After Blowing Through $300 in API Credits

I spent last weekend building an MMO client using AI, and it cost me three hundred bucks in API credits. Worth every penny for what I learned.

## The Context Window Isn't What You Think

Here's the thing that clicked for me: LLMs don't read like we do. We scan conversations chronologically, assuming "later means more recent." But agents? They're doing in-memory grepping across their entire context window for every single response.

This creates weird problems. You can literally type "Don't do X" and watch the AI do exactly X because when it scanned the context, it only found the wrong example and repeated it. Frustrating as hell.

I've been experimenting with configs, skills, agent rules - the whole stack. My conclusion? Less is more. Way less. Too many prompt layers and you're guaranteed to create contradictions that confuse the model. When token counts get high, LLMs start fumbling everything because they can't figure out what the baseline truth is.

## We're All Engineering Managers Now

The role shift is wild. I'm basically an engineering manager and product manager for my AIs now. Code became the low-level language overnight - we program with natural language.

A friend put it perfectly: "Specs are the new source code." I'm now part architect, part QA lead. And honestly? I love it. But it requires a different skillset than pure coding.

The developers I see struggling are the ones who haven't built up that architect gut feeling yet. You know - that immediate sense when something "feels wrong" or "feels right" early in planning. Without that muscle, you can't catch when Claude is sending you down a bad path.

## Natural Language is the New Syntax

I get frustrated and produce garbage results when I'm tired and don't type out all the details. Natural language is literally our new syntax, and like any syntax, precision matters.

Voice input helps, but the core truth remains: if you can't express what you want clearly, the AI can't deliver it clearly.

## The Calculator Moment

We're living through the "new calculator" scenario. AI isn't going away. We need to learn to use it like people learned to go from abacus to calculator for math.

The fear makes sense - change is scary, especially when you don't understand it. I probably would've been more resistant if I hadn't dove in early. I even built and trained a mini model with my GitHub data. It sucked, but it demystified the whole thing for me.

Code went from being a precious, durable asset to basically throwaway overnight. I'm still oscillating between feeling incredibly behind and bleeding edge. But that's the point - we're all figuring this out together.

The key is good architecture so it doesn't turn into dev hell. The AI handles the implementation; we handle the vision.

## Sources

Personal conversation and weekend experimentation with AI-assisted MMO client development.
