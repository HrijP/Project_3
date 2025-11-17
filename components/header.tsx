'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = savedTheme === 'dark' || (savedTheme === null && prefersDark)
    setIsDark(shouldBeDark)
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-20 pb-24">
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-blue-400/30 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
          Lightweight Object Detection & NMS
        </h1>
        <p className="text-lg text-muted-foreground mb-8 font-light">
          Project 3 • Hrijan Pandit • CSCI 450
        </p>

        {mounted && (
          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary dark:text-accent dark:bg-accent/10 dark:hover:bg-accent/20 backdrop-blur-xl border border-primary/20 dark:border-accent/20 transition-all duration-300 hover:scale-105"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4" />
                <span className="text-sm font-medium">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                <span className="text-sm font-medium">Dark Mode</span>
              </>
            )}
          </button>
        )}
      </div>
    </header>
  )
}
