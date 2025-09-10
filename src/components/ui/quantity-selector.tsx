import { Minus, Plus } from 'lucide-react';
import { Button } from './button';

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function QuantitySelector({ 
  value, 
  min = 1, 
  max = 10, 
  onChange, 
  disabled = false 
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={handleDecrease}
        disabled={disabled || value <= min}
      >
        <Minus className="h-3 w-3" />
        <span className="sr-only">Minska kvantitet</span>
      </Button>
      
      <span className="w-8 text-center font-medium">
        {value}
      </span>
      
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={handleIncrease}
        disabled={disabled || value >= max}
      >
        <Plus className="h-3 w-3" />
        <span className="sr-only">Öka kvantitet</span>
      </Button>
    </div>
  );
}