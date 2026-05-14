# Design Brief

## Direction

Kick The Complete — Luxury dark sneaker ecommerce with cinematic athleticism, aggressive-premium brand positioning, and Nike/Jordan-inspired layouts.

## Tone

Aggressive luxury: sporty confidence wrapped in refined dark aesthetics — demanding, exclusive, high-fidelity motion, white-on-navy contrast precision.

## Differentiation

Parallax hero with rotating 3D sneaker showcase, scroll-triggered cinematic reveals, floating particle ambience, and neon blue accent restraint creating unforgettable premium athleticism.

## Color Palette

| Token      | OKLCH       | Role                           |
| ---------- | ----------- | ------------------------------ |
| background | 0.09 0 0    | Deep navy, primary surface     |
| foreground | 0.98 0 0    | White, critical text contrast  |
| card       | 0.14 0 0    | Elevated card background       |
| primary    | 0.62 0.25 22| Red accent, CTA, urgency       |
| accent     | 0.72 0.22 264| Neon blue, secondary highlights|
| muted      | 0.24 0 0    | Subtle surfaces, dividers      |

## Typography

- Display: Space Grotesk — bold tracked headlines, 60-0 letterspacing uppercase, hero impact
- Body: DM Sans — refined copy, product descriptions, UI labels
- Scale: hero text-7xl bold, h2 text-5xl bold tracked, label text-sm uppercase, body text-base

## Elevation & Depth

Glassmorphic cards with subtle backdrop-blur, layered shadow depth (sm/md/glow variants), dark-on-dark foreground hierarchy via lightness offset and accent glow outlines.

## Structural Zones

| Zone    | Background       | Border                | Notes                                |
| ------- | ---------------- | --------------------- | ------------------------------------ |
| Header  | card/30 glass    | border/20 accent edge | Sticky, frosted, neon underline      |
| Content | background solid | —                     | Alternating card zones for rhythm    |
| Footer  | card/40          | border accent bottom  | Mirrored footer with accent emphasis |

## Spacing & Rhythm

Large sectional gaps (6rem+), card padding 2rem, typography leading 1.2 display/1.6 body, micro-spacing 0.5rem–1rem for control density.

## Component Patterns

- Buttons: red primary bg-primary text-white text-sm uppercase tracking-widest, hover scale-105 shadow-glow-accent, transition-smooth
- Cards: glass-card utility + hover:shadow-md transition, 3D perspective on product cards
- Badges: accent bg-accent/20 border-accent text-accent font-semibold rounded-full px-3 py-1

## Motion

- Entrance: fade-in 0.5s easing, scroll-reveal stagger 100ms per element
- Hover: scale 1.05 on cards, shadow-glow-blue pulse, text-accent glow highlight
- Decorative: floating particles ambient, pulse-glow 2s infinite on accent elements, parallax scrolling hero

## Constraints

- No generic Tailwind shadows — use custom glow and elevated depth variants only
- No purple, orange, or warm tones — navy + red + blue only
- Text contrast minimum AA+ on all surfaces — test white on card/muted backgrounds
- Animations 60fps smooth — prefer CSS transforms over paint-heavy effects

## Signature Detail

Neon blue glow outline on hero product imagery with parallax depth layers — unmistakably premium sneaker luxury, borrowed from high-end product showcase aesthetics.
