import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Price } from '@/components/ui/price';
import { SizeSelector } from '@/components/ui/size-selector';
import { getSizeLabel } from '@/lib/utils/price';
import { AnimalSize } from '@/lib/types';
import { animals } from '@/data/animals';
import { EmptyState } from '@/components/ui/empty-state';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, updateVariant, removeItem, clearCart, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <EmptyState
            icon={<ShoppingBag className="h-12 w-12" />}
            title="Din varukorg är tom"
            description="Lägg till några djur i din varukorg för att komma igång."
            action={{
              label: "Börja handla",
              onClick: () => navigate('/djur')
            }}
          />
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 500 ? 0 : 99; // Fri frakt över 500 kr
  const total = subtotal + shipping;

  const handleQuantityChange = (slug: string, storlek: AnimalSize, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(slug, storlek);
    } else {
      updateQuantity(slug, storlek, newQuantity);
    }
  };

  const handleSizeChange = (slug: string, oldSize: AnimalSize, newSize: AnimalSize) => {
    const item = items.find(item => item.slug === slug && item.storlek === oldSize);
    if (!item) return;

    const animal = animals.find(a => a.slug === slug);
    if (!animal) return;

    // Check if new size has enough stock
    if (animal.lager[newSize] < item.kvantitet) {
      // Adjust quantity to available stock
      const maxQuantity = animal.lager[newSize];
      if (maxQuantity === 0) return; // Don't change if no stock
      
      removeItem(slug, oldSize);
      updateQuantity(slug, newSize, maxQuantity);
    } else {
      // Use the updateVariant function from store
      updateVariant(slug, oldSize, newSize);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link to="/djur">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Fortsätt handla
            </Link>
          </Button>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Varukorg</h1>
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearCart}
              className="text-destructive hover:text-destructive"
            >
              Töm varukorg
            </Button>
          </div>
          <p className="text-muted-foreground mt-2">
            {items.length} {items.length === 1 ? 'djur' : 'djur'} i varukorgen
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const animal = animals.find(a => a.slug === item.slug);
            const availableSizes = animal 
              ? (['S', 'M', 'L'] as AnimalSize[]).filter(size => animal.lager[size] > 0)
              : [item.storlek];
            const maxQuantity = animal ? Math.min(animal.lager[item.storlek], 10) : item.kvantitet;

            return (
              <Card key={`${item.slug}-${item.storlek}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.bildUrl}
                          alt={item.namn}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">
                              <Link 
                                to={`/djur/${item.slug}`}
                                className="hover:text-primary transition-smooth"
                              >
                                {item.namn}
                              </Link>
                            </h3>
                            <Badge variant="secondary" className="mt-1">
                              {getSizeLabel(item.storlek)}
                            </Badge>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.slug, item.storlek)}
                            className="text-destructive hover:text-destructive"
                            aria-label={`Ta bort ${item.namn} från varukorgen`}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Ta bort {item.namn}</span>
                          </Button>
                        </div>

                        {/* Size selector */}
                        <div className="mb-3">
                          <label className="text-sm font-medium mb-1 block">
                            Storlek:
                          </label>
                          <SizeSelector
                            sizes={availableSizes}
                            selectedSize={item.storlek}
                            onSizeChange={(newSize) => handleSizeChange(item.slug, item.storlek, newSize)}
                          />
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.slug, item.storlek, item.kvantitet - 1)}
                              disabled={item.kvantitet <= 1}
                              aria-label={`Minska kvantitet för ${item.namn}`}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="w-8 text-center font-medium" aria-label={`Kvantitet: ${item.kvantitet}`}>
                              {item.kvantitet}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.slug, item.storlek, item.kvantitet + 1)}
                              disabled={item.kvantitet >= maxQuantity}
                              aria-label={`Öka kvantitet för ${item.namn}`}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">
                              <Price amount={item.pris} /> × {item.kvantitet}
                            </div>
                            <div className="font-semibold">
                              <Price amount={item.pris * item.kvantitet} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}