/**
 * Card whose 1px border lights up around the cursor (radial gradient that
 * tracks the mouse via CSS variables). Styles live in index.css (.spotlight).
 */
export default function SpotlightCard({
  children,
  className = '',
  innerClassName = '',
  color,
  ...rest
}) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }

  return (
    <div
      className={`spotlight ${className}`}
      onMouseMove={onMove}
      style={color ? { '--spot': color } : undefined}
      {...rest}
    >
      <div className={`spotlight-inner ${innerClassName}`}>{children}</div>
    </div>
  )
}
