import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'

interface MoodEntry {
  id: string
  emoji: string
  mood: string
  energy: number
  stress: number
  note: string
  timestamp: Date
}

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [energy, setEnergy] = useState(5)
  const [stress, setStress] = useState(5)
  const [note, setNote] = useState('')
  const [recentEntries, setRecentEntries] = useState<MoodEntry[]>([
    {
      id: '1',
      emoji: '😊',
      mood: 'Happy',
      energy: 8,
      stress: 3,
      note: 'Great day studying with friends',
      timestamp: new Date(Date.now() - 86400000)
    },
    {
      id: '2',
      emoji: '😰',
      mood: 'Anxious',
      energy: 4,
      stress: 8,
      note: 'Exam tomorrow, feeling nervous',
      timestamp: new Date(Date.now() - 172800000)
    }
  ])
  const { toast } = useToast()

  const moods = [
    { emoji: '😄', mood: 'Excellent', color: 'bg-green-500' },
    { emoji: '😊', mood: 'Happy', color: 'bg-lime-500' },
    { emoji: '😐', mood: 'Okay', color: 'bg-yellow-500' },
    { emoji: '😔', mood: 'Low', color: 'bg-orange-500' },
    { emoji: '😰', mood: 'Anxious', color: 'bg-red-500' },
    { emoji: '😢', mood: 'Sad', color: 'bg-purple-500' }
  ]

  const handleMoodSelect = (mood: { emoji: string; mood: string }) => {
    setSelectedMood(`${mood.emoji} ${mood.mood}`)
  }

  const handleSubmit = () => {
    if (!selectedMood) return

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      emoji: selectedMood.split(' ')[0],
      mood: selectedMood.split(' ')[1],
      energy,
      stress,
      note,
      timestamp: new Date()
    }

    setRecentEntries(prev => [newEntry, ...prev.slice(0, 4)])
    setSelectedMood(null)
    setEnergy(5)
    setStress(5)
    setNote('')

    toast({
      title: '📊 Mood Logged!',
      description: 'Your mood entry has been saved successfully.',
    })
  }

  const ScaleSelector = ({ 
    label, 
    value, 
    onChange, 
    lowLabel, 
    highLabel, 
    color 
  }: {
    label: string
    value: number
    onChange: (value: number) => void
    lowLabel: string
    highLabel: string
    color: string
  }) => (
    <div className="space-y-3">
      <div className="flex justify-between">
        <span className="font-medium">{label}</span>
        <Badge variant="secondary">{value}/10</Badge>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs text-muted-foreground">{lowLabel}</span>
        <div className="flex space-x-1 flex-1 justify-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <motion.button
              key={num}
              onClick={() => onChange(num)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                num <= value
                  ? `${color} border-transparent text-white`
                  : 'border-border hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {num}
            </motion.button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">{highLabel}</span>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mood Selection */}
          <div className="space-y-3">
            <span className="font-medium">Select your mood:</span>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {moods.map((mood) => (
                <motion.button
                  key={mood.mood}
                  onClick={() => handleMoodSelect(mood)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    selectedMood === `${mood.emoji} ${mood.mood}`
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className="text-xs font-medium">{mood.mood}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Energy Level */}
          <ScaleSelector
            label="Energy Level"
            value={energy}
            onChange={setEnergy}
            lowLabel="Tired"
            highLabel="Energized"
            color="bg-gradient-to-r from-yellow-400 to-orange-500"
          />

          {/* Stress Level */}
          <ScaleSelector
            label="Stress Level"
            value={stress}
            onChange={setStress}
            lowLabel="Relaxed"
            highLabel="Stressed"
            color="bg-gradient-to-r from-blue-400 to-red-500"
          />

          {/* Notes */}
          <div className="space-y-2">
            <label className="font-medium">Notes (optional):</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind today?"
              className="w-full p-3 border border-border rounded-lg resize-none h-20 bg-background"
            />
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full"
            disabled={!selectedMood}
          >
            Log My Mood
          </Button>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <AnimatePresence>
              {recentEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center space-x-4 p-3 bg-accent/50 rounded-lg"
                >
                  <div className="text-2xl">{entry.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium">{entry.mood}</span>
                      <Badge variant="outline" className="text-xs">
                        Energy: {entry.energy}/10
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Stress: {entry.stress}/10
                      </Badge>
                    </div>
                    {entry.note && (
                      <p className="text-sm text-muted-foreground">{entry.note}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {entry.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MoodTracker