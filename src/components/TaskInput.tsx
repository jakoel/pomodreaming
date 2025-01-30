import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface TaskInputProps {
  onTaskAdd: (task: string) => void;
}

export const TaskInput = ({ onTaskAdd }: TaskInputProps) => {
  const [task, setTask] = useState('');
  const { toast } = useToast();

  const validateTask = (input: string) => {
    if (input.length < 3) {
      return 'Task must be at least 3 characters long';
    }
    if (input.length > 100) {
      return 'Task must be less than 100 characters';
    }
    if (!/^[a-zA-Z0-9\s.,!?-]+$/.test(input)) {
      return 'Task can only contain letters, numbers, and basic punctuation';
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateTask(task.trim());
    if (error) {
      toast({
        title: "Invalid Input",
        description: error,
        variant: "destructive"
      });
      return;
    }

    if (task.trim()) {
      onTaskAdd(task);
      setTask('');
      toast({
        title: "Task Added",
        description: "You can now start your timer!",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md animate-fade-in">
      <div className="relative mt-8">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What are you working on?"
          className="w-full px-4 py-3 bg-gray-200 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-black placeholder-gray-700"
          maxLength={100}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white bg-opacity-90 hover:bg-opacity-100 transition-colors duration-300"
        >
          Start Session
        </button>
      </div>
    </form>
  );
};