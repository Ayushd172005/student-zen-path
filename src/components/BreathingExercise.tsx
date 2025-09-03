import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Square, Wind } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const BreathingExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale')
  const [count, setCount] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [selectedPattern, setSelectedPattern] = useState('4-4-4-4')

  const patterns = {
    '4-4-4-4': { inhale: 4, hold: 4, exhale: 4, pause: 4, name: 'Box Breathing' },
    '4-7-8': { inhale: 4, hold: 7, exhale: 8, pause: 2, name: '4-7-8 Technique' },
    '6-2-6-2': { inhale: 6, hold: 2, exhale: 6, pause: 2, name: 'Equal Breathing' }
  }

  const currentPattern = patterns[selectedPattern as keyof typeof patterns]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        setCount(prevCount => {
          const newCount = prevCount + 1
          const maxCount = currentPattern[phase]

          if (newCount >= maxCount) {
            // Move to next phase
            if (phase === 'inhale') {
              setPhase('hold')
            } else if (phase === 'hold') {
              setPhase('exhale')
            } else if (phase === 'exhale') {
              setPhase('pause')
            } else {
              setPhase('inhale')
              setCycle(prev => prev + 1)
            }
            return 0
          }
          return newCount
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, phase, currentPattern])

  const handleStart = () => setIsActive(!isActive)
  
  const handleStop = () => {
    setIsActive(false)
    setPhase('inhale')
    setCount(0)
    setCycle(0)
  }

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In'
      case 'hold': return 'Hold'
      case 'exhale': return 'Breathe Out'
      case 'pause': return 'Pause'
    }
  }

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'from-blue-400 to-cyan-500'
      case 'hold': return 'from-purple-400 to-pink-500'
      case 'exhale': return 'from-green-400 to-emerald-500'
      case 'pause': return 'from-gray-400 to-slate-500'
    }
  }

  const circleSize = phase === 'inhale' ? 'scale-150' : phase === 'exhale' ? 'scale-75' : 'scale-100'

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Wind className="w-5 h-5" />
          <span>Breathing Exercise</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pattern Selector */}
        <div className="space-y-2">
          <span className="font-medium text-sm">Choose a pattern:</span>
          <div className="flex flex-wrap gap-2">
            {Object.entries(patterns).map(([key, pattern]) => (
              <Button
                key={key}
                variant={selectedPattern === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPattern(key)}
                disabled={isActive}
                className="text-xs"
              >
                {pattern.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Breathing Circle */}
        <div className="relative flex items-center justify-center h-64">
          <motion.div
            className={`w-32 h-32 rounded-full bg-gradient-to-br ${getPhaseColor()} opacity-80 flex items-center justify-center`}
            animate={{
              scale: phase === 'inhale' ? 1.5 : phase === 'exhale' ? 0.75 : 1,
            }}
            transition={{
              duration: currentPattern[phase],
              ease: 'easeInOut',
            }}
          >
            <div className="text-white text-center">
              <div className="font-bold text-lg">{getPhaseText()}</div>
              <div className="text-sm opacity-80">
                {currentPattern[phase] - count}s
              </div>
            </div>
          </motion.div>

          {/* Ripple Effect */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                className={`absolute w-32 h-32 rounded-full border-2 border-white/30`}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Stats */}
        <div className="text-center space-y-2">
          <div className="flex justify-center space-x-4">
            <Badge variant="secondary">
              Cycles: {cycle}
            </Badge>
            <Badge variant="secondary">
              Phase: {getPhaseText()}
            </Badge>
          </div>
          
          {cycle > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-muted-foreground"
            >
              You've completed {cycle} breathing cycle{cycle !== 1 ? 's' : ''}
            </motion.p>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={handleStart}
            size="lg"
            className={`flex items-center space-x-2 bg-gradient-to-r ${getPhaseColor()}`}
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isActive ? 'Pause' : 'Start'}</span>
          </Button>
          
          <Button onClick={handleStop} variant="outline" size="lg">
            <Square className="w-5 h-5" />
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Follow the circle and breathe at your own comfortable pace</p>
          <p className="mt-1">Current pattern: {currentPattern.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BreathingExercise