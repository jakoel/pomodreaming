import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface TimerProps {
  initialMinutes: number;
  onComplete?: () => void;
  currentTask?: string;
}

export const Timer = ({ initialMinutes, onComplete, currentTask }: TimerProps) => {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(100);
  const { toast } = useToast();

  const totalSeconds = initialMinutes * 60;

  // Reset timer when initialMinutes changes
  useEffect(() => {
    setSeconds(initialMinutes * 60);
    setProgress(100);
    setIsActive(false);
  }, [initialMinutes]);

  const formatTime = useCallback((timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const newSeconds = prev - 1;
          setProgress((newSeconds / totalSeconds) * 100);
          return newSeconds;
        });
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      toast({
        title: "Time's up!",
        description: "Take a break and start fresh.",
      });
      onComplete?.();
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, totalSeconds, toast, onComplete]);

  const toggleTimer = () => {
    if (!currentTask) {
      toast({
        title: "Task Required",
        description: "Please enter what you're working on before starting the timer.",
        variant: "destructive"
      });
      return;
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(initialMinutes * 60);
    setProgress(100);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in">
      <div className="relative w-64 h-64">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            className="stroke-muted fill-none"
            strokeWidth="8"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            className="stroke-primary fill-none transition-all duration-1000 ease-in-out"
            strokeWidth="8"
            strokeDasharray="100 100"
            strokeDashoffset={100 - progress}
            style={{ strokeDasharray: '753.6 753.6', strokeDashoffset: ((100 - progress) / 100) * 753.6 }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-4xl font-bold tracking-tight">
            {formatTime(seconds)}
          </div>
          {currentTask && (
            <div className="text-sm text-muted-foreground mt-2">
              {currentTask}
            </div>
          )}
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={toggleTimer}
          className={cn(
            "p-4 rounded-full glass-morphism transition-all duration-300 hover:bg-white/10",
            isActive ? "bg-white/10" : "bg-white/5"
          )}
        >
          {isActive ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={resetTimer}
          className="p-4 rounded-full glass-morphism transition-all duration-300 hover:bg-white/10"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};