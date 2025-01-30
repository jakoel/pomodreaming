import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface TimerProps {
  initialMinutes: number;
  onComplete?: (task: string) => void;
  currentTask?: string;
  isActive?: boolean;
}

export const Timer = ({ initialMinutes, onComplete, currentTask, isActive: externalIsActive }: TimerProps) => {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(100);
  const [hasCompleted, setHasCompleted] = useState(false);
  const { toast } = useToast();

  const totalSeconds = initialMinutes * 60;

  useEffect(() => {
    setSeconds(initialMinutes * 60);
    setProgress(100);
    setIsActive(false);
    setHasCompleted(false);
  }, [initialMinutes]);

  useEffect(() => {
    if (externalIsActive !== undefined) {
      setIsActive(externalIsActive);
    }
  }, [externalIsActive]);

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
    } else if (seconds === 0 && !hasCompleted && currentTask) {
      setIsActive(false);
      setHasCompleted(true);
      toast({
        title: "Time's up!",
        description: "Your session has been added to history.",
      });
      if (onComplete) {
        onComplete(currentTask);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, totalSeconds, toast, onComplete, hasCompleted, currentTask]);

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
    setHasCompleted(false);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 animate-fade-in">
      <div className="relative w-80 h-80 lg:w-96 lg:h-96"> {/* Increased size */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className="stroke-muted fill-none"
            strokeWidth="8"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className="stroke-primary fill-none transition-all duration-1000 ease-in-out"
            strokeWidth="8"
            strokeDasharray="753.6"
            strokeDashoffset={(100 - progress) / 100 * 753.6}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-6xl lg:text-7xl font-bold tracking-tight text-white"> {/* Increased font size */}
            {formatTime(seconds)}
          </div>
          {currentTask && (
            <div className="text-base lg:text-lg text-muted-foreground mt-4"> {/* Increased font size */}
              {currentTask}
            </div>
          )}
        </div>
      </div>

      <div className="flex space-x-6"> {/* Increased spacing */}
        <button
          onClick={toggleTimer}
          className={cn(
            "p-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg transition-all duration-300 hover:scale-105", /* Increased padding */
            isActive ? "opacity-80" : "opacity-100"
          )}
        >
          {isActive ? (
            <Pause className="w-8 h-8 text-white" /> /* Increased icon size */
          ) : (
            <Play className="w-8 h-8 text-white" /> /* Increased icon size */
          )}
        </button>
        <button
          onClick={resetTimer}
          className="p-6 rounded-full bg-gradient-to-r from-red-500 to-pink-500 shadow-lg transition-all duration-300 hover:scale-105" /* Increased padding */
        >
          <RotateCcw className="w-8 h-8 text-white" /> /* Increased icon size */
        </button>
      </div>
    </div>
  );
};