/**
 * Infinite horizontal scroller. Content is duplicated once and translated by
 * -50%, so the loop is seamless. Pauses on hover.
 */
export default function Marquee({ items, reverse = false, speed = 40, className = '', render }) {
  const list = [...items, ...items]
  return (
    <div className={`marquee overflow-hidden mask-fade-x ${className}`}>
      <div
        className="marquee-track"
        style={{ animation: `${reverse ? 'marqueeReverse' : 'marquee'} ${speed}s linear infinite` }}
      >
        {list.map((item, i) => (
          <div key={i} className="shrink-0" aria-hidden={i >= items.length}>
            {render ? render(item, i) : item}
          </div>
        ))}
      </div>
    </div>
  )
}
