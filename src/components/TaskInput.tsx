import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface TaskInputProps {
  onTaskAdd: (task: string) => void;
}

export const TaskInput = ({ onTaskAdd }: TaskInputProps) => {
  const [task, setTask] = useState('');
  const { toast } = useToast();

  const validateInput = useCallback((input: string): { isValid: boolean; message?: string } => {
    const trimmedInput = input.trim();
    
    if (!trimmedInput) {
      return { isValid: false, message: 'Task cannot be empty' };
    }

    if (trimmedInput.length < 3) {
      return { isValid: false, message: 'Task must be at least 3 characters long' };
    }

    if (trimmedInput.length > 100) {
      return { isValid: false, message: 'Task cannot exceed 100 characters' };
    }

    const validCharactersRegex = /^[a-zA-Z0-9\s.,!?-]+$/;
    if (!validCharactersRegex.test(trimmedInput)) {
      return { 
        isValid: false, 
        message: 'Task can only contain letters, numbers, spaces, and basic punctuation' 
      };
    }

    return { isValid: true };
  }, []);

  const sanitizeInput = useCallback((input: string): string => {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateInput(task);
    
    if (!validation.isValid) {
      toast({
        title: 'Invalid Input',
        description: validation.message,
        variant: 'destructive',
      });
      return;
    }

    const sanitizedTask = sanitizeInput(task.trim());
    onTaskAdd(sanitizedTask);
    setTask('');
    
    toast({
      title: 'Task Added',
      description: 'Your task has been successfully added.',
    });
  }, [task, validateInput, sanitizeInput, onTaskAdd, toast]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 100) {
      setTask(inputValue);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md animate-fade-in">
      <div className="relative mt-8">
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Enter task name:"
          className="w-full px-4 py-3 bg-gray-200 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-black placeholder-gray-700"
          maxLength={100}
          aria-label="Task input"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white bg-opacity-90 hover:bg-opacity-100 transition-colors duration-300"
        >
          Start Session
        </button>
      </div>
    </form>
  );
};