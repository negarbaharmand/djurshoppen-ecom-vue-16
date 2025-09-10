import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, ArrowRight } from 'lucide-react';
import { animals } from '@/data/animals';
import { Animal, AnimalSize } from '@/lib/types';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SizeSelector } from '@/components/ui/size-selector';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import { Price } from '@/components/ui/price';
import { toast } from '@/hooks/use-toast';
import { AnimalCard } from '@/components/AnimalCard';

export default function AnimalDetail() {
  const { slug } = useParams<{ slug: string }>();
  const addItem = useCartStore(state => state.addItem);
  
  const [selectedSize, setSelectedSize] = useState<AnimalSize>('M');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Find animal by slug
  const animal = animals.find(a => a.slug === slug);

  // Get related animals from same category
  const relatedAnimals = animal 
    ? animals
        .filter(a => a.kategori === animal.kategori && a.id !== animal.id)
        .slice(0, 3)
    : [];

  // Update document title and meta
  useEffect(() => {
    if (animal) {
      document.title = `${animal.namn} - Djurshoppen`;
      
      // Add meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `Köp ${animal.namn} - ${animal.kortBeskrivning} från ${Math.min(...Object.values(animal.pris))} kr. Snabb leverans och trygg betalning.`);
      }
    }
  }, [animal]);

  // Reset selections when animal changes
  useEffect(() => {
    setSelectedSize('M');
    setQuantity(1);
  }, [slug]);

  if (!animal) {
    return <Navigate to="/404" replace />;
  }

  // Get available sizes (where stock > 0)
  const availableSizes = (['S', 'M', 'L'] as AnimalSize[]).filter(
    size => animal.lager[size] > 0
  );

  // If no sizes available, redirect to animals page
  if (availableSizes.length === 0) {
    return <Navigate to="/djur" replace />;
  }

  // Ensure selected size is available
  if (!availableSizes.includes(selectedSize)) {
    setSelectedSize(availableSizes[0]);
  }

  const selectedPrice = animal.pris[selectedSize];
  const selectedStock = animal.lager[selectedSize];
  const totalStock = animal.lager.S + animal.lager.M + animal.lager.L;
  const isLowStock = totalStock > 0 && totalStock <= 3;

  const handleAddToCart = async () => {
    if (selectedStock === 0) return;
    
    setIsAdding(true);
    
    try {
      addItem(animal, selectedSize, quantity);
      
      toast({
        title: "Tillagt i varukorg!",
        description: `${animal.namn} (${selectedSize}) har lagts till i din varukorg.`,
        action: (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/djur">
                Fortsätt handla
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/varukorg">
                Gå till varukorg
              </Link>
            </Button>
          </div>
        ),
      });
      
      // Reset quantity
      setQuantity(1);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fel uppstod",
        description: "Kunde inte lägga till djuret i varukorgen. Försök igen.",
      });
    } finally {
      setIsAdding(false);
    }
  };

  const getStockStatus = () => {
    if (selectedStock === 0) return { text: 'Slut i lager', variant: 'destructive' as const };
    if (selectedStock <= 2) return { text: 'Få i lager', variant: 'outline' as const };
    return { text: 'I lager', variant: 'default' as const };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-smooth">Hem</Link>
          <span>/</span>
          <Link to="/djur" className="hover:text-foreground transition-smooth">Djur</Link>
          <span>/</span>
          <span className="text-foreground">{animal.namn}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Back button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/djur">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tillbaka till alla djur
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={animal.bildUrl}
                alt={`${animal.namn} - ${animal.kortBeskrivning}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{animal.namn}</h1>
                <Badge variant={animal.kategori === 'exotisk' ? 'default' : 'secondary'}>
                  {animal.kategori === 'exotisk' ? 'Exotisk' : 'Vanlig'}
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground">{animal.kortBeskrivning}</p>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold">
              <Price amount={selectedPrice} />
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold">Välj storlek:</h3>
              <SizeSelector
                sizes={availableSizes}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
              />
            </div>

            {/* Stock Status */}
            <div>
              <Badge variant={stockStatus.variant}>
                {stockStatus.text}
                {selectedStock > 0 && selectedStock <= 5 && ` (${selectedStock} kvar)`}
              </Badge>
            </div>

            {/* Quantity Selection */}
            {selectedStock > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold">Kvantitet:</h3>
                <QuantitySelector
                  value={quantity}
                  max={Math.min(selectedStock, 10)}
                  onChange={setQuantity}
                />
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={selectedStock === 0 || isAdding}
              >
                {isAdding ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Lägger till...
                  </>
                ) : selectedStock === 0 ? (
                  'Ej tillgänglig'
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Lägg i varukorg
                  </>
                )}
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-green-600" />
                Fri frakt över 500 kr
              </div>
            </div>
          </div>
        </div>

        {/* Related Animals */}
        {relatedAnimals.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Relaterade djur</h2>
              <Button variant="outline" asChild>
                <Link to={`/djur?kategori=${animal.kategori}`}>
                  Visa alla {animal.kategori === 'exotisk' ? 'exotiska' : 'vanliga'} djur
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedAnimals.map((relatedAnimal) => (
                <AnimalCard key={relatedAnimal.id} animal={relatedAnimal} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}