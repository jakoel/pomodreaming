import { BackgroundSelector } from "./BackgroundSelector";

interface TopBarProps {
  onSelectGradient: (gradient: string) => void;
}

export function TopBar({ onSelectGradient }: TopBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
        <BackgroundSelector onSelectGradient={onSelectGradient} />
      </div>
    </div>
  );
}
