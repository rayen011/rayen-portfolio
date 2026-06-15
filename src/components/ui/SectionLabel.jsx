export default function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-8 h-px bg-gold" />
      <span className="text-gold text-xs font-mono font-medium tracking-widest uppercase">
        {children}
      </span>
    </div>
  )
}
