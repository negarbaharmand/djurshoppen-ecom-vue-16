import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield, Check } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Price } from '@/components/ui/price';
import { toast } from '@/hooks/use-toast';

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Redirect if cart is empty
  if (items.length === 0 && !orderComplete) {
    return <Navigate to="/varukorg" replace />;
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 500 ? 0 : 99;
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // Clear cart and mark order as complete
      clearCart();
      setOrderComplete(true);
      
      toast({
        title: "Beställning genomförd!",
        description: "Tack för din beställning. Du kommer få en bekräftelse via e-post inom kort.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fel uppstod",
        description: "Kunde inte slutföra beställningen. Försök igen.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Tack för din beställning!</h1>
            <p className="text-muted-foreground mb-8">
              Din beställning har tagits emot och behandlas nu. Du kommer att få en bekräftelse via e-post inom kort.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/">Tillbaka till startsidan</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/djur">Fortsätt handla</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link to="/varukorg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tillbaka till varukorg
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold">Kassa</h1>
          <p className="text-muted-foreground mt-2">
            Slutför din beställning
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Kunduppgifter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Förnamn</Label>
                    <Input id="firstName" placeholder="Ditt förnamn" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Efternamn</Label>
                    <Input id="lastName" placeholder="Ditt efternamn" required />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">E-post</Label>
                  <Input id="email" type="email" placeholder="din@email.se" required />
                </div>
                
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" type="tel" placeholder="070-123 45 67" required />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Leveransadress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Adress</Label>
                  <Input id="address" placeholder="Gatuadress" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postalCode">Postnummer</Label>
                    <Input id="postalCode" placeholder="123 45" required />
                  </div>
                  <div>
                    <Label htmlFor="city">Ort</Label>
                    <Input id="city" placeholder="Stockholm" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Betalning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">
                    Säker betalning med Klarna, kort eller Swish
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Du kommer att omdirigeras till vår betalningspartner
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Beställningssammanfattning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={`${item.slug}-${item.storlek}`} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.bildUrl}
                          alt={item.namn}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.namn}</p>
                        <p className="text-xs text-muted-foreground">
                          Storlek: {item.storlek} • Antal: {item.kvantitet}
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        <Price amount={item.pris * item.kvantitet} />
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
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

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Totalt</span>
                    <Price amount={total} />
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Bearbetar...
                      </>
                    ) : (
                      <>
                        Slutför beställning
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    Genom att slutföra beställningen godkänner du våra{' '}
                    <Link to="/villkor" className="underline hover:no-underline">
                      villkor
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}