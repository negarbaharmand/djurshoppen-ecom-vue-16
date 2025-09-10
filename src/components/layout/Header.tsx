import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store/cart';
import { useState } from 'react';

export function Header() {
  const location = useLocation();
  const totalItems = useCartStore(state => state.getTotalItems());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isHomePage = location.pathname === '/';
  
  const navigation = [
    { namn: 'Hem', href: '/' },
    { namn: 'Djur', href: '/djur' },
    { namn: 'Varukorg', href: '/varukorg' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-brand-primary">
                🐾
              </div>
              <span className={`font-bold transition-smooth ${
                isHomePage 
                  ? 'text-2xl text-brand-primary' 
                  : 'text-xl text-foreground'
              }`}>
                Djurshoppen
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.namn}
                to={item.href}
                className={`text-sm font-medium transition-smooth hover:text-brand-primary ${
                  location.pathname === item.href
                    ? 'text-brand-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {item.namn}
              </Link>
            ))}
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              asChild
            >
              <Link to="/varukorg">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-brand-secondary text-xs font-bold text-white flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Varukorg</span>
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Meny</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.namn}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-smooth hover:text-brand-primary ${
                    location.pathname === item.href
                      ? 'text-brand-primary'
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.namn}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}