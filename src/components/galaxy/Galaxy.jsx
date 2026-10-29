import StarField from './StarField'
import { REGIONS, SECTION_IDS } from '@/lib/data'
import { useActiveSection } from '@/hooks/useActiveSection'

/**
 * Everything behind the page: the nebula wash, the parallax starfield and a
 * vignette to keep the edges dark enough for text.
 *
 * The nebula is a stack of gradient layers crossfading by opacity rather than
 * one layer with animated colours — custom properties don't transition without
 * `@property`, and opacity is cheap to composite.
 */
export default function Galaxy() {
  const active = useActiveSection(SECTION_IDS, 'top')

  return (
    <div className="galaxy" aria-hidden="true">
      {REGIONS.map((region) => (
        <div
          key={region.id}
          className="galaxy-nebula"
          style={{
            opacity: region.id === active ? 1 : 0,
            backgroundImage: `
              radial-gradient(62% 48% at 18% 22%, ${region.hues[0]}, transparent 68%),
              radial-gradient(58% 52% at 84% 72%, ${region.hues[1]}, transparent 70%)
            `,
          }}
        />
      ))}
      <StarField />
      <div className="galaxy-vignette" />
    </div>
  )
}
