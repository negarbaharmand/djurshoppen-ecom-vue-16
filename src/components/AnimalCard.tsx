import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Price } from '@/components/ui/price';
import { Animal } from '@/lib/types';

interface AnimalCardProps {
  animal: Animal;
}

export function AnimalCard({ animal }: AnimalCardProps) {
  // Get the lowest price from all sizes
  const minPrice = Math.min(animal.pris.S, animal.pris.M, animal.pris.L);
  
  // Check if animal is in stock (has any size available)
  const inStock = animal.lager.S > 0 || animal.lager.M > 0 || animal.lager.L > 0;
  
  // Get total stock
  const totalStock = animal.lager.S + animal.lager.M + animal.lager.L;
  const isLowStock = totalStock > 0 && totalStock <= 3;

  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={animal.bildUrl}
          alt={`${animal.namn} - ${animal.kortBeskrivning}`}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Category badge */}
        <Badge 
          variant={animal.kategori === 'exotisk' ? 'default' : 'secondary'}
          className="absolute top-2 left-2"
        >
          {animal.kategori === 'exotisk' ? 'Exotisk' : 'Vanlig'}
        </Badge>

        {/* Stock status */}
        {!inStock ? (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Slut i lager
          </Badge>
        ) : isLowStock && (
          <Badge variant="outline" className="absolute top-2 right-2 bg-background">
            Få i lager
          </Badge>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
          {animal.namn}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {animal.kortBeskrivning}
        </p>

        <div className="flex items-baseline gap-1">
          <span className="text-sm text-muted-foreground">Från</span>
          <Price amount={minPrice} className="text-lg" />
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0">
        <Button 
          asChild 
          className="w-full"
          disabled={!inStock}
        >
          <Link 
            to={`/djur/${animal.slug}`}
            aria-label={`Visa ${animal.namn}`}
          >
            {inStock ? 'Visa' : 'Ej tillgänglig'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}