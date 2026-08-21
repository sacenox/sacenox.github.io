---
layout: post
title: optimizing-for-speed-without-losing-comprehension
description: I've arrived at a workflow I'm happy with, and I'm getting good results from it.
---

# Catching up

Last time I talked about my obsession with AI and AI tooling/harness, and how all-consuming it had become.
Since then I've experimented a lot, produced nightmare quantities of slop to try things out, and then threw that slop away instead of pretending it had some value. It didn't, the value was what I learned along the way.

> But Sean, what did you learn?

You might ask, and yes, here it goes:

The useful tools are not autonomous systems that own a project, they are small adapters that bring an agent into a workflow that I already control.

Agents are truly game changers, but I don't think they do that well autonomously. The more they talk amongst each other, the more they drift from the user's prompt. Their strength is more on the generation speed, they type much faster than I ever could, and the deep knowledge in their training.  They work amazingly well as teachers when directed that way and are great at answering technical questions.

Uncle Bob said on x.com recently that wrangling agents is the biggest engineering challenge of our times, and I agree.  He is deep into this challenge and I suggest everyone take a look at [swarm-forge](https://github.com/unclebob/swarm-forge), Uncle Bob's take on autonomous agents/dark factory.

While I'm no one to go against the grain and much less poke holes in what Uncle Bob is working on, I don't believe agents will become great independent workers without some breakthrough advancement on how models work/sampling works. Drift and hallucinations are still major issues in my opinion.

For lack of a better description, I've been calling my workflow _Code as the specification_.

Yeah not as glamorous as all the "I don't read the code anymore" crowd, but it delivers results while keeping my comprehension of what is done high. I structure the change, create the necessary files, function signatures, interfaces, etc, then I ask the agent to complete the gaps. I improve the generation (using my [vim-pi-complete plugin](https://github.com/sacenox/vim-pi-complete)) by asking for focused completions around the parts that need to be better in my eyes. Finally, I ask for an adversarial review from different models than the one I use for the original generations (I made a small [pi extension](https://github.com/sacenox/pi-extensions) for these adversaries).

My workhorse is Sol on medium, and the adversaries are Fable and Kimi on max.  I've started experimenting on using DeepSeek hosted locally on a spark as my main, and moving Sol to the adversary role alongside Fable, but that's for another post I guess.

Closing thoughts, I'm not selling you on my extensions or workflow, just like choosing an editor before AI, I think that's developer choice, and different people work in different ways. You know, _different strokes for different folks_...  But I do think it's important to share and show how we are using this new stuff, if we all collaborate with different perspectives we can progress and learn from each other how to get the best out of these LLMs.

PS: No more AI writing, I've grown so tired of reading AI output, that I don't want to put more of it out there. So consider the previous posts as legacy, going forward you'll have to deal with my english as a second language mistakes :D
