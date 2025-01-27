import { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onTaskAdd: (task: string) => void;
}

export const TaskInput = ({ onTaskAdd }: TaskInputProps) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      onTaskAdd(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md animate-fade-in">
      <div className="relative">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What are you working on?"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-md hover:bg-white/10 transition-colors duration-300"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};