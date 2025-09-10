import { formatPrice, formatPriceWithDecimals } from '@/lib/utils/price';
import { cn } from '@/lib/utils';

interface PriceProps {
  amount: number;
  className?: string;
  showDecimals?: boolean;
}

export function Price({ amount, className, showDecimals = false }: PriceProps) {
  const formattedPrice = showDecimals 
    ? formatPriceWithDecimals(amount)
    : formatPrice(amount);

  return (
    <span className={cn('price font-semibold', className)}>
      {formattedPrice}
    </span>
  );
}