---
layout: post
title: rpg project started
description: kicking off a godot dungeon crawler
---

# Project Started: Building My Dungeon-Crawling RPG

![Dungeon test capture](/assets/images/rpg-project-started.png)

I've officially started building the RPG I've been sketching in my head for months. It's a dungeon-crawling game in Godot 4 that mixes the hardcore feel of NetHack with a persistent hub world where you can actually make progress.

## The Core Loop

The concept is simple: create a character in your hub, step through a portal, fight through a procedurally generated dungeon, and extract with whatever loot you can carry. You keep your XP no matter what, but die in the dungeon and you lose all that shiny new gear. There's also a hardcore mode where death locks you out of the hub entirely—permadeath with consequences.

Combat is turn-based and gear-driven. Your basic attack is always available, but the interesting stuff comes from equipment that grants special skills. Each skill costs a turn, so timing and resource management matter. I'm planning opportunity attacks, accuracy vs dodge mechanics, and separate physical and magical damage types to keep fights tactical.

## Procedural Dungeons

The dungeon generation is where I'm having the most fun. Right now I'm using a path-based algorithm that creates a linear layout with connected segments, then carves out room-like polygon shapes within a 64x64 grid. After the basic layout, I place points of interest like campfires for safe recovery and blacksmith encounters.

I've got two biomes working: stone caves and forest valleys. Each biome drives different tilesets and enemy spawns, so the same dungeon algorithm feels completely different depending on where you end up.

## Systems and UI

The character system uses classic RPG stats—Strength, Dex, Int, Perception, and Vitality—with stat-based leveling instead of traditional XP tables. I'm planning HP and energy bars, a skill bar bound to the QWERTY row for quick access, and panels for loot and equipment management.

Vision and fog-of-war are already working, which makes exploration feel properly mysterious. There's something satisfying about revealing a dungeon room by room.

## What's Next

I've got basic tilesets, character sprites, and simple particle effects in place. The game loop works, but there's still a ton to build.

Immediate roadmap:
- Implement BSP dungeon generation as an alternative to the path-based algorithm
- Add configuration parameters for different generation styles
- Build a test scene for comparing dungeon layouts
- Set up screenshot-based validation for generation consistency
- Expand the combat system with more skill types

It's early days, but the foundation feels solid. Every time I generate a new dungeon and watch my character explore it, I get excited about where this is heading.
