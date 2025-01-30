import { useState } from 'react';
import { Timer } from '@/components/Timer';
import { TaskInput } from '@/components/TaskInput';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

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

const Index = () => {
  const [currentTask, setCurrentTask] = useState<string>('');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedPreset, setSelectedPreset] = useState(TIMER_PRESETS[0]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const { toast } = useToast();

  const handleTaskAdd = (task: string) => {
    setCurrentTask(task);
    setIsTimerActive(true);
    toast({
      title: 'Session Started',
      description: `Starting ${selectedPreset.minutes} minute focus session.`,
    });
  };

  const handleTimerComplete = () => {
    if (currentTask) {
      const newSession = {
        duration: selectedPreset.minutes,
        task: currentTask,
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

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-dark via-purple-dark to-[#1A1F2C] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/0ddace60-6fd3-4fc3-9a91-f8e5593090e1.png')] bg-cover bg-center opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Timer Section */}
          <div className="flex-1">
            <div className="flex justify-center mb-8 gap-2">
              {TIMER_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setSelectedPreset(preset)}
                  className={`px-6 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    selectedPreset.label === preset.label
                      ? 'bg-white text-purple-dark shadow-lg'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <Timer
              initialMinutes={selectedPreset.minutes}
              onComplete={handleTimerComplete}
              currentTask={currentTask}
              isActive={isTimerActive}
            />

            <div className="mt-8 max-w-md mx-auto">
              <TaskInput onTaskAdd={handleTaskAdd} />
            </div>
          </div>

          {/* Session History */}
          <div className="w-80 glass-morphism rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4 text-white/90">Session History</h2>
            <ScrollArea className="h-[600px] pr-4">
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