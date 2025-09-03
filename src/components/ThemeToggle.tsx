import React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { name: 'light', icon: Sun, label: 'Light' },
    { name: 'dark', icon: Moon, label: 'Dark' },
    { name: 'system', icon: Monitor, label: 'System' },
  ]

  const currentThemeIndex = themes.findIndex(t => t.name === theme)
  const nextTheme = themes[(currentThemeIndex + 1) % themes.length]

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(nextTheme.name as 'light' | 'dark' | 'system')}
      className="relative overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {theme === 'light' && <Sun className="h-4 w-4" />}
          {theme === 'dark' && <Moon className="h-4 w-4" />}
          {theme === 'system' && <Monitor className="h-4 w-4" />}
        </motion.div>
      </AnimatePresence>
      <span className="sr-only">Toggle theme to {nextTheme.label}</span>
    </Button>
  )
}