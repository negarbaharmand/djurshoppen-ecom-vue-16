import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Price } from '@/components/ui/price';
import { useCartStore } from '@/lib/store/cart';

interface CartSummaryProps {
  className?: string;
}

export function CartSummary({ className }: CartSummaryProps) {
  const getTotalPrice = useCartStore(state => state.getTotalPrice);
  
  const subtotal = getTotalPrice();
  const shipping = subtotal >= 500 ? 0 : 99; // Fri frakt över 500 kr
  const total = subtotal + shipping;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Beställningssammanfattning</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Delsumma</span>
          <Price amount={subtotal} />
        </div>
        
        <div className="flex justify-between">
          <span>Frakt</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600">Gratis</span>
            ) : (
              <Price amount={shipping} />
            )}
          </span>
        </div>

        {shipping > 0 && subtotal < 500 && (
          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
            Handla för <Price amount={500 - subtotal} /> till för fri frakt
          </div>
        )}

        <Separator />

        <div className="flex justify-between text-lg font-semibold">
          <span>Totalt</span>
          <Price amount={total} />
        </div>

        <div className="space-y-2 pt-4">
          <Button size="lg" className="w-full" asChild>
            <Link to="/kassa">
              Gå till kassan
            </Link>
          </Button>
          
          <Button variant="outline" size="lg" className="w-full" asChild>
            <Link to="/djur">
              Fortsätt handla
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}