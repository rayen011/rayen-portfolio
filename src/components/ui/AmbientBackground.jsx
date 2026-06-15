// Soft, design-studio backdrop: a faint dotted grid with slowly drifting
// gold/violet glow blobs. Replaces the old circuit-board motif now that the
// portfolio is focused on app development & UI/UX design.
export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(#F5A623 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)',
        }}
      />

      {/* drifting glow blobs */}
      <div className="ambient-blob ambient-blob--gold" />
      <div className="ambient-blob ambient-blob--violet" />
    </div>
  )
}
