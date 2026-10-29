# Galaxy portfolio — design

Date: 2026-10-29

## Why

Two problems with the current site.

1. **The work section is a tunnel.** Six sticky, full-height project cards mean you
   must scroll through every project to reach anything below them. There is no way
   to skim the work or to skip it.
2. **The identity is generic.** Dark page, gold accent, cards that slide up 24px —
   it is tidy, but it looks like a hundred other developer portfolios.

One idea fixes both: make the work a **place you navigate** rather than a queue you
scroll, and make that place a galaxy.

## Decisions

| Question | Decision |
|---|---|
| How literal is the galaxy? | Work becomes an interactive star map; the rest of the page keeps a cosmic atmosphere. |
| What happens to the other sections? | One continuous vertical scroll descending through a persistent parallax starfield, each section its own nebula region. |
| Palette | Gold as starlight on a near-black indigo deep field, violet and blue nebula secondary, project hues reserved for the map. |

Rejected: a full WebGL flight (bundle size, mobile performance, and it buries the
work); warping between full-screen regions (content will not fit one screen, and a
client cannot skim it).

## The star map

The centrepiece, and the fix to the scrolling complaint: work goes from roughly six
viewport-heights to **one screen**.

- A map region about `min(78vh, 680px)` tall. Every project is a star at
  hand-authored percentage coordinates in `data.js`, so the constellation is
  composed rather than random.
- Star size comes from a `weight` field. Life Tycoon is the brightest body, since it
  is the one that is live, and it carries a slow pulse ring.
- The six case studies are labelled permanently. The five smaller builds are fainter,
  unlabelled companions that name themselves on hover or focus.
- Constellation lines join projects that share a stack, drawn in with `pathLength`.
- Each star drifts a few pixels on its own sine phase, so nothing pulses in unison.

**Opening one.** A click expands the case study in place over the map, scaling from
the star's own coordinates so the star appears to open. Escape, the close button or
the backdrop returns you to the map. The page never scrolls to do any of it.

**Keyboard and mobile.** Stars are real buttons, so tab and Enter work, and the open
panel traps focus. On phones labels stay visible and tap targets are at least 44px.

## The galaxy shell

**Starfield.** One fixed `<canvas>` behind the entire page drawing three star layers
at different depths. The Lenis scroll value drives it, so near stars move faster than
far ones. One draw call per frame is far cheaper than hundreds of animated DOM nodes.
It pauses when the tab is hidden, and under `prefers-reduced-motion` it draws once and
stops.

**Regions.** Each section declares a nebula hue. A stack of gradient layers crossfades
by opacity as sections enter view, so descending the page drifts from a gold deep field
through violet and blue and back. Opacity crossfade rather than animated custom
properties, because custom properties do not transition without `@property`.

**Section treatments.**

| Section | Treatment |
|---|---|
| Hero | Deep field, a slow-turning galaxy core behind the headline |
| Work | The star map |
| Services | Four bodies in orbit around a centre |
| About | Photo as a planet, stats traced as a constellation |
| Process | Four waypoints along a launch trajectory |
| Skills | Marquees as an asteroid belt drifting at different speeds |
| Contact | Framed as a transmission |

**Motion vocabulary.** Replace "slide up 24px" with **arrival from depth**: scale from
0.92 with a blur that resolves, as though coming into focus from far away. Section
changes get a comet streak. The nav becomes a region indicator.

## Build order

1. Galaxy shell — canvas starfield, region crossfade, tokens.
2. Star map — data coordinates, stars, constellation, panel.
3. Hero, then the remaining sections onto the new motion vocabulary.
4. Verify desktop and mobile, check reduced motion, build.

## Risks

- **Canvas cost on mid-range phones.** Mitigated by capping device pixel ratio at 2,
  cutting star counts below 768px, and pausing when hidden.
- **Eleven stars may crowd a small screen.** If so, the five companions move to a
  compact list under the map on mobile.
- **A map is less skimmable than a list for some visitors.** Every star carries a
  visible label on the six main projects, and the panel content is the same case study
  copy as before, so nothing is lost — only the navigation changes.
