import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Shield, Headphones, RotateCcw, ArrowRight } from 'lucide-react';
import { animals } from '@/data/animals';
import { Price } from '@/components/ui/price';
import heroImage from '@/assets/hero-animals.jpg';
import normalAnimalsImage from '@/assets/normal-animals.jpg';
import exoticAnimalsImage from '@/assets/exotic-animals.jpg';

const popularAnimals = animals.filter(animal => 
  ['katt', 'papegoja', 'lejon', 'elefant'].includes(animal.slug)
);

const benefits = [
  {
    icon: Shield,
    title: 'Trygg betalning',
    description: 'Säkra betalningsmetoder med SSL-kryptering'
  },
  {
    icon: Headphones,
    title: 'Snabb support',
    description: '24/7 kundservice på svenska'
  },
  {
    icon: RotateCcw,
    title: 'Fri retur',
    description: '30 dagars öppet köp på alla djur'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Djurshoppen - Alla våra djur" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-85"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-hero mb-6">
              Djurshoppen
            </h1>
            <p className="text-subheading mb-8 text-white/90">
              Exotiska och vanliga djur – direkt till din dörr
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/djur">
                  Handla nu
                  <ShoppingCart className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/varukorg">
                  Se varukorg
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Animals Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading mb-4">Populära djur</h2>
            <p className="text-muted-foreground">Våra mest älskade djur som kunder väljer</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularAnimals.map((animal) => (
              <Card key={animal.id} className="group hover:shadow-lg transition-smooth overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={animal.bildUrl}
                    alt={animal.namn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{animal.namn}</h3>
                    <Badge variant={animal.kategori === 'exotisk' ? 'default' : 'secondary'}>
                      {animal.kategori}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {animal.kortBeskrivning}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground">Från </span>
                      <Price amount={Math.min(...Object.values(animal.pris))} className="text-brand-primary" />
                    </div>
                    <Button variant="cta" size="sm" asChild>
                      <Link to={`/djur/${animal.slug}`}>
                        Visa
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading mb-4">Varför välja Djurshoppen?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-brand-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading mb-4">Våra kategorier</h2>
            <p className="text-muted-foreground">Utforska vårt sortiment av djur</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="group hover:shadow-lg transition-smooth cursor-pointer overflow-hidden">
              <Link to="/djur?kategori=normal">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={normalAnimalsImage}
                    alt="Vanliga djur"
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">Vanliga djur</h3>
                  <p className="text-muted-foreground mb-4">
                    Klassiska husdjur som katter, hundar och kaniner
                  </p>
                  <Button variant="category">
                    Utforska vanliga djur
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Link>
            </Card>
            
            <Card className="group hover:shadow-lg transition-smooth cursor-pointer overflow-hidden">
              <Link to="/djur?kategori=exotisk">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={exoticAnimalsImage}
                    alt="Exotiska djur"
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">Exotiska djur</h3>
                  <p className="text-muted-foreground mb-4">
                    Unika djur som papegojor, lejon och elefanter
                  </p>
                  <Button variant="category">
                    Utforska exotiska djur
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}