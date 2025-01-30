import { useState } from 'react';

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
      <div className="relative mt-8">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What are you working on?"
          className="w-full px-4 py-3 bg-gray-300 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-black placeholder-gray-700"
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
