import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wind, Play, Pause, RotateCcw } from "lucide-react";

export const BreathingGame = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [selectedPattern, setSelectedPattern] = useState('4-4-4');

  const breathingPatterns = {
    '4-4-4': { inhale: 4, hold: 4, exhale: 4, name: 'Box Breathing' },
    '4-7-8': { inhale: 4, hold: 7, exhale: 8, name: 'Relaxing Breath' },
    '6-2-6': { inhale: 6, hold: 2, exhale: 6, name: 'Calming Breath' },
    '5-5-5': { inhale: 5, hold: 5, exhale: 5, name: 'Balanced Breath' }
  };

  const currentPattern = breathingPatterns[selectedPattern as keyof typeof breathingPatterns];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Move to next phase
      if (currentPhase === 'inhale') {
        setCurrentPhase('hold');
        setTimeLeft(currentPattern.hold);
      } else if (currentPhase === 'hold') {
        setCurrentPhase('exhale');
        setTimeLeft(currentPattern.exhale);
      } else if (currentPhase === 'exhale') {
        setCurrentPhase('inhale');
        setTimeLeft(currentPattern.inhale);
        setCycle(prev => prev + 1);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentPhase, currentPattern]);

  const startBreathing = () => {
    setIsActive(true);
    if (timeLeft === 0) {
      setTimeLeft(currentPattern.inhale);
      setCurrentPhase('inhale');
    }
  };

  const pauseBreathing = () => {
    setIsActive(false);
  };

  const resetBreathing = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setTimeLeft(currentPattern.inhale);
    setCycle(0);
  };

  const getPhaseInstruction = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      default:
        return 'Breathe';
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'border-blue-500 bg-blue-50';
      case 'hold':
        return 'border-yellow-500 bg-yellow-50';
      case 'exhale':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-primary/20 bg-card';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-primary/5 border-primary/20">
        <div className="text-center mb-6">
          <Wind className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="text-xl font-semibold mb-2">Guided Breathing Exercise</h3>
          <p className="text-muted-foreground">
            Follow the breathing pattern to reduce stress and promote relaxation.
          </p>
        </div>

        {/* Pattern Selection */}
        <div className="mb-6">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Choose Breathing Pattern:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(breathingPatterns).map(([key, pattern]) => (
              <Button
                key={key}
                variant={selectedPattern === key ? "default" : "outline"}
                onClick={() => {
                  setSelectedPattern(key);
                  resetBreathing();
                }}
                className="text-sm"
              >
                {pattern.name}
                <br />
                <span className="text-xs opacity-75">
                  {pattern.inhale}-{pattern.hold}-{pattern.exhale}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Breathing Circle */}
        <div className="flex justify-center mb-6">
          <div 
            className={`w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${getPhaseColor()}`}
            style={{
              transform: currentPhase === 'inhale' ? 'scale(1.2)' : 
                        currentPhase === 'exhale' ? 'scale(0.8)' : 'scale(1.0)'
            }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {timeLeft}
              </div>
              <div className="text-lg font-medium text-foreground">
                {getPhaseInstruction()}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <Card className="p-4 bg-card/50 border-primary/20 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{cycle}</div>
            <div className="text-sm text-muted-foreground">Completed Cycles</div>
          </div>
        </Card>

        {/* Controls */}
        <div className="flex gap-2 justify-center">
          {!isActive ? (
            <Button 
              onClick={startBreathing}
              className="bg-gradient-primary hover:shadow-elegant text-primary-foreground"
            >
              <Play className="w-4 h-4 mr-2" />
              Start
            </Button>
          ) : (
            <Button 
              onClick={pauseBreathing}
              variant="outline"
              className="border-primary/20"
            >
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          )}
          <Button 
            onClick={resetBreathing}
            variant="outline"
            className="border-primary/20"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </Card>

      <Card className="p-4 bg-card/50 border-primary/20">
        <p className="text-center text-sm text-muted-foreground">
          🫁 <strong>Benefits:</strong> Controlled breathing exercises help activate the parasympathetic nervous system, reducing stress, anxiety, and promoting mental clarity.
        </p>
      </Card>
    </div>
  );
};