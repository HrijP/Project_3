'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface NavigationProps {
  sections: Array<{ id: string; label: string }>
  activeSection: string
  setActiveSection: (id: string) => void
}

export default function Navigation({ sections, activeSection, setActiveSection }: NavigationProps) {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'z-40 w-full transition-all duration-300',
        isSticky ? 'fixed top-0 shadow-lg' : 'relative',
        'bg-background/95 backdrop-blur-lg border-b border-border'
      )}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-center gap-8 py-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id)
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={cn(
                'text-sm font-medium transition-all duration-200 relative',
                activeSection === section.id
                  ? 'text-accent'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {section.label}
              {activeSection === section.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-transparent rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
