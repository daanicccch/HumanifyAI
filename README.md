# Solana Token Template

Reusable Solana token landing template inspired by `clawpump.tech`: bold hero, animated ticker rails, contract card, tokenomics, roadmap, social CTAs, and a structure built for fast reskins.

## Quick Start

```bash
npm install
npm run dev
```

## What To Edit For A New Token

Main file: `src/data/siteConfig.ts`

This file contains:

- token name and symbol
- headline, tagline, and description
- contract address
- Twitter / Telegram / DexScreener / buy links
- ticker phrases
- tokenomics
- roadmap
- FAQ
- theme colors

## Project Map

- `src/data/siteConfig.ts` - all content and theme values
- `src/App.tsx` - landing page structure
- `src/App.css` - visual system and animations
- `src/hooks/useReveal.ts` - scroll reveal behavior
- `index.html` - base meta / og / twitter tags

## Template Intent

This is not a generic corporate landing page. It is tuned for fast memecoin and community launches:

- strong first screen
- direct buy / twitter / telegram CTAs
- one-click contract copy
- narrative-style roadmap
- design that feels like a launch event

## Good Next Steps

- add several theme presets
- generate meta/OG from config automatically
- move config to JSON or YAML
- add sections for memes, gallery, influencers, or exchanges
