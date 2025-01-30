import { useState } from 'react';
import { Timer } from '@/components/Timer';
import { TaskInput } from '@/components/TaskInput';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TopBar } from '@/components/TopBar';

interface Session {
  duration: number;
  task: string;
  completedAt: Date;
}

const TIMER_PRESETS = [
  { label: 'Pomodoro', minutes: 25 },
  { label: 'Short Break', minutes: 5 },
  { label: 'Long Break', minutes: 15 },
  { label: 'Quick Focus', minutes: 10 },
];

const DEFAULT_GRADIENT = "linear-gradient(to br, from-[#1A1F2C] via-purple-dark to-[#1A1F2C])";

const Index = () => {
  const [currentTask, setCurrentTask] = useState<string>('');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedPreset, setSelectedPreset] = useState(TIMER_PRESETS[0]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [backgroundGradient, setBackgroundGradient] = useState(DEFAULT_GRADIENT);
  const { toast } = useToast();

  const handleTaskAdd = (task: string) => {
    setCurrentTask(task);
    setIsTimerActive(true);
    toast({
      title: 'Session Started',
      description: `Starting ${selectedPreset.minutes} minute focus session.`,
    });
  };

  const handleTimerComplete = (task: string) => {
    if (task) {
      const newSession = {
        duration: selectedPreset.minutes,
        task: task,
        completedAt: new Date(),
      };
      setSessions([newSession, ...sessions]);
      setCurrentTask('');
      setIsTimerActive(false);
      toast({
        title: 'Session completed!',
        description: `You completed a ${selectedPreset.minutes} minute session.`,
      });
    }
  };

  const handleGradientChange = (gradient: string) => {
    setBackgroundGradient(gradient);
    toast({
      title: 'Background Updated',
      description: 'Your new background has been applied.',
    });
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: backgroundGradient }}>
      <TopBar onSelectGradient={handleGradientChange} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 pt-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 min-h-[80vh]">
          {/* Main Timer Section */}
          <div className="transform scale-125"> {/* Apply scaling here */}
            <div className="flex-1 w-full md:w-auto flex flex-col items-center justify-center">
              <div className="flex justify-center mb-12 gap-3">
                {TIMER_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setSelectedPreset(preset)}
                    className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 mb-8 ${
                      selectedPreset.label === preset.label
                        ? 'bg-white text-purple-dark shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <div>
                <Timer
                  initialMinutes={selectedPreset.minutes}
                  onComplete={handleTimerComplete}
                  currentTask={currentTask}
                  isActive={isTimerActive}
                />
              </div>

              <div className="mt-12 w-full max-w-md">
                <TaskInput onTaskAdd={handleTaskAdd} />
              </div>
            </div>
          </div>

          {/* Session History */}
          <div className="w-full md:w-80 glass-morphism rounded-xl p-4 flex flex-col min-h-[500px] max-h-[calc(100vh-4rem)] ml-24">
            <h2 className="text-lg font-semibold mb-4 text-white/90">Session History</h2>
            <ScrollArea className="flex-grow pr-4">
              <div className="space-y-4">
                {sessions.map((session, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/5 rounded-lg transition-all duration-300 hover:bg-white/10 border border-white/10"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-white/60">
                        {formatTime(session.completedAt)}
                      </span>
                      <span className="text-sm font-medium text-white/80">
                        {session.duration}m
                      </span>
                    </div>
                    <p className="text-sm text-white/90">{session.task}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
