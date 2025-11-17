'use client'

interface SectionProps {
  id: string
  title: string
  children: React.ReactNode
  isActive: boolean
}

export default function Section({ id, title, children, isActive }: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-20 fade-in duration-500"
      // removed invalid animate-in, fade-in, slide-in-from-bottom-4 and replaced with fade-in class
    >
      <div className="group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
        <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 hover:border-border transition-colors duration-300">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">{title}</h2>
          <div className="prose prose-invert max-w-none text-muted-foreground [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-foreground [&_ul]:space-y-2 [&_ol]:space-y-2 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_p]:leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
