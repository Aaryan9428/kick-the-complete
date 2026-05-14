# Design System — Kicks The Complete

## Direction

Luxury dark sneaker ecommerce with cinematic depth, aggressive-premium branding, pink-to-purple gradient accents, and refined athletic aesthetics. Minimalist hero with maximum impact. Glassmorphic UI cards layered with neon glow effects. Premium independent sneaker brand positioning.

## Tone

Confident luxury: bold headlines, restrained decoration, cinematic motion, high contrast white-on-navy, and neon blue/magenta accents defining premium athleticism without loudness.

## Differentiation

Pink-to-purple gradient hero text, parallax scroll reveals, floating animations, glassmorphic depth layering, and signature neon glow outlines on product imagery — unmistakably premium luxury sneaker brand.

## Color Palette

| Token      | OKLCH        | Purpose                         |
| ---------- | ------------ | ------------------------------- |
| background | 0.09 0 0     | Deep navy primary surface       |
| foreground | 0.98 0 0     | White critical text             |
| card       | 0.14 0 0     | Elevated glassmorphic layers    |
| primary    | 0.62 0.25 22 | Magenta/red CTA & accents       |
| accent     | 0.72 0.22 264| Neon blue highlights & glows    |
| muted      | 0.24 0 0     | Subtle surfaces & dividers      |

## Typography

- Display: Space Grotesk — bold 60px+ hero, -3% letterspacing, premium headlines
- Body: DM Sans — refined copy, product labels, elevated 1.6 leading
- Scale: hero text-9xl bold, h2 text-6xl bold, label text-sm uppercase, body text-base

## Elevation & Depth

Glassmorphism with 20px backdrop-blur, layered shadow hierarchy (elevation-sm/md/lg), dark-on-dark via lightness offset. Neon glow outlines on interactive elements. Inset highlights on premium cards.

## Structural Zones

| Zone    | Background          | Border                    | Notes                                   |
| ------- | ------------------- | ------------------------- | --------------------------------------- |
| Header  | glass-card / 50%    | border / 25% accent edge  | Sticky frosted header with neon accent  |
| Hero    | background + glow   | —                         | Full viewport cinematic parallax effect |
| Content | background / card   | —                         | Alternating zones with spacing rhythm  |
| Footer  | card / 40%          | border accent top         | Mirrored footer with accent emphasis    |

## Spacing & Rhythm

Section gaps 7rem+ (space-section utility), card padding 2rem/3rem, display line-height 0.95, body line-height 1.6, letter-spacing adjusted per tier. Micro-spacing 0.25rem–1rem for density control.

## Component Patterns

- Buttons: bg-primary text-white uppercase semibold px-8 py-4, shadow-glow-accent, hover:scale-102 translate-y-[-2px], transition-smooth
- Cards: glass-card-premium with hover states, inset top border, elevation shadows
- Badges: bg-accent/15 border-accent/50 text-accent uppercase text-xs px-4 py-2 rounded-full

## Motion & Animation

- Entrance: fade-in 0.6s, slide-in-up 0.7s easing, staggered 100ms per child
- Hover: scale 1.02 + translate-y-[-2px] on cards, glow pulse 2s on accent elements
- Decorative: float 4s infinite with subtle rotation, parallax hero 60fps, gradient-shift 8s on backgrounds

## Constraints

- Shadows: only custom elevation & glow variants — no default Tailwind shadows
- Palette: navy + magenta + blue only — no orange, purple, or warm tones
- Contrast: AA+ white on all card/muted backgrounds
- Performance: CSS transforms & GPU acceleration, no heavy paint effects
- Font: Only Space Grotesk (display) + DM Sans (body) + Geist Mono (code)

## Signature Detail

Pink-to-purple gradient text on hero "KICKS" headline with soft cinematic glow, paired with refined uppercase subheading. Neon blue/magenta glow outlines on product imagery create luxury depth signature.
