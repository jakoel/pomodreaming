import { useState } from 'react';
import { Timer } from '@/components/Timer';
import { TaskInput } from '@/components/TaskInput';
import { useToast } from '@/hooks/use-toast';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
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
    setIsTimerActive(true); // Start timer when task is added
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
    <div className="min-h-screen p-4">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <h1 className="text-2xl font-bold tracking-tight text-center">Focus Timer</h1>
        </div>
      </div>

      <div className="mt-16">
        <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
          <ResizablePanel defaultSize={28} className="p-4">
            <div className="h-full glass-morphism rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Session History</h2>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {sessions.map((session, index) => (
                    <div
                      key={index}
                      className="p-4 glass-morphism rounded-lg transition-all duration-300 hover:bg-white/10"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">
                          {formatTime(session.completedAt)}
                        </span>
                        <span className="text-sm font-medium">
                          {session.duration}m
                        </span>
                      </div>
                      <p className="text-sm">{session.task}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={72} className="p-4">
            <div className="h-full glass-morphism rounded-lg p-4">
              <div className="grid grid-cols-4 gap-2 mb-8">
                {TIMER_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setSelectedPreset(preset)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      selectedPreset.label === preset.label
                        ? 'glass-morphism bg-white/10'
                        : 'glass-morphism hover:bg-white/10'
                    }`}
                  >
                    <div className="text-sm font-medium">{preset.label}</div>
                    <div className="text-xs text-muted-foreground">{preset.minutes}m</div>
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
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Index;
