import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'

const PomodoroTimer: React.FC = () => {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessions, setSessions] = useState(0)
  const { toast } = useToast()

  const totalTime = isBreak ? 5 * 60 : 25 * 60
  const currentTime = minutes * 60 + seconds
  const progress = ((totalTime - currentTime) / totalTime) * 100

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer finished
            setIsActive(false)
            if (isBreak) {
              setMinutes(25)
              setSeconds(0)
              setIsBreak(false)
              toast({
                title: '🧠 Break Complete!',
                description: 'Ready for another focused session?',
              })
            } else {
              setSessions(prev => prev + 1)
              setMinutes(5)
              setSeconds(0)
              setIsBreak(true)
              toast({
                title: '🎉 Session Complete!',
                description: 'Time for a well-deserved break!',
              })
            }
            return
          }
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, minutes, seconds, isBreak, toast])

  const handleStart = () => setIsActive(!isActive)
  
  const handleReset = () => {
    setIsActive(false)
    setMinutes(isBreak ? 5 : 25)
    setSeconds(0)
  }

  const formatTime = (min: number, sec: number) => 
    `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          {isBreak ? <Coffee className="w-5 h-5" /> : <Brain className="w-5 h-5" />}
          <span>{isBreak ? 'Break Time' : 'Focus Session'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Progress value={progress} className="h-2" />
          <motion.div
            className={`absolute inset-0 rounded-full ${
              isBreak ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                     : 'bg-gradient-to-r from-blue-400 to-purple-500'
            } opacity-20`}
            animate={{
              scale: isActive ? [1, 1.02, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: isActive ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="text-center">
          <motion.div
            className="text-6xl font-mono font-bold text-foreground"
            animate={{
              scale: isActive && (minutes === 0 && seconds <= 10) ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: 0.5,
              repeat: isActive && (minutes === 0 && seconds <= 10) ? Infinity : 0,
            }}
          >
            {formatTime(minutes, seconds)}
          </motion.div>
          <p className="text-muted-foreground mt-2">
            Sessions completed: {sessions}
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={handleStart}
            size="lg"
            className={`flex items-center space-x-2 ${
              isBreak ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                     : 'bg-gradient-to-r from-blue-500 to-purple-600'
            }`}
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isActive ? 'Pause' : 'Start'}</span>
          </Button>
          
          <Button onClick={handleReset} variant="outline" size="lg">
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <p className="text-sm text-muted-foreground">
                {isBreak 
                  ? '☕ Relax and recharge your mind' 
                  : '🎯 Stay focused, you\'ve got this!'
                }
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

export default PomodoroTimer