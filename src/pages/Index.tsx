import { useState } from 'react';
import { Timer } from '@/components/Timer';
import { TaskInput } from '@/components/TaskInput';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const { toast } = useToast();

  const handleTaskAdd = (task: string) => {
    setTasks([...tasks, task]);
    toast({
      title: 'Task added',
      description: 'Your task has been added to the list.',
    });
  };

  const handleTimerComplete = () => {
    // Play notification sound or show notification
    console.log('Timer completed');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
      <div className="text-center space-y-2 animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight">Focus Timer</h1>
        <p className="text-muted-foreground">Stay productive, stay focused.</p>
      </div>

      <Timer initialMinutes={25} onComplete={handleTimerComplete} />
      
      <div className="w-full max-w-md space-y-4">
        <TaskInput onTaskAdd={handleTaskAdd} />
        
        {tasks.length > 0 && (
          <div className="space-y-2 animate-fade-in">
            <h2 className="text-lg font-semibold">Current Tasks</h2>
            <div className="space-y-2">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="p-3 glass-morphism rounded-lg transition-all duration-300 hover:bg-white/10"
                >
                  {task}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;