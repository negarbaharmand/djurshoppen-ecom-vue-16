import { AnimalSize } from '@/lib/types';
import { getSizeLabel } from '@/lib/utils/price';
import { Button } from './button';

interface SizeSelectorProps {
  sizes: AnimalSize[];
  selectedSize: AnimalSize;
  onSizeChange: (size: AnimalSize) => void;
  disabled?: boolean;
}

export function SizeSelector({ 
  sizes, 
  selectedSize, 
  onSizeChange, 
  disabled = false 
}: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <Button
          key={size}
          variant={selectedSize === size ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSizeChange(size)}
          disabled={disabled}
          className="min-w-16"
        >
          {getSizeLabel(size)}
        </Button>
      ))}
    </div>
  );
}