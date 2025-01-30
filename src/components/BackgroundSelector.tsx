import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BackgroundSelectorProps {
  onSelectGradient: (gradient: string) => void;
}

const GRADIENTS = [
  { id: 1, value: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)" },
  { id: 2, value: "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)" },
  { id: 3, value: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)" },
  { id: 4, value: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)" },
  { id: 5, value: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)" },
  { id: 6, value: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)" },
  { id: 7, value: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)" },
  { id: 8, value: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)" },
  { id: 9, value: "linear-gradient(to top, #30cfd0 0%, #330867 100%)" },
  { id: 10, value: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)" },
  { id: 11, value: "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)" },
  { id: 12, value: "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)" },
  { id: 13, value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { id: 14, value: "linear-gradient(to top, #fddb92 0%, #d1fdff 100%)" },
  { id: 15, value: "linear-gradient(180deg, #2af598 0%, #009efd 100%)" },
  { id: 16, value: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)" },
  { id: 17, value: "linear-gradient(to top, #37ecba 0%, #72afd3 100%)" },
  { id: 18, value: "linear-gradient(to right, #434343 0%, black 100%)" },
];

export function BackgroundSelector({ onSelectGradient }: BackgroundSelectorProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="fixed top-4 left-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
        >
          Choose Background
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-4">Choose Background</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {GRADIENTS.map((gradient) => (
            <button
              key={gradient.id}
              onClick={() => onSelectGradient(gradient.value)}
              className="h-24 rounded-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20"
              style={{ background: gradient.value }}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
