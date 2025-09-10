import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    Kundservice: [
      { namn: 'Kontakta oss', href: '/kontakt' },
      { namn: 'Köpvillkor', href: '/kopvillkor' },
      { namn: 'Integritetspolicy', href: '/integritet' },
      { namn: 'Retur & reklamation', href: '/retur' },
    ],
    Kategorier: [
      { namn: 'Vanliga djur', href: '/djur?kategori=normal' },
      { namn: 'Exotiska djur', href: '/djur?kategori=exotisk' },
      { namn: 'Alla djur', href: '/djur' },
    ],
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🐾</div>
              <span className="text-xl font-bold text-brand-primary">
                Djurshoppen
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Exotiska och vanliga djur – direkt till din dörr. Vi erbjuder högkvalitativa djur med trygg leverans och professionell service.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">
                {category}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.namn}>
                    <Link
                      to={item.href}
                      className="text-sm text-muted-foreground hover:text-brand-primary transition-smooth"
                    >
                      {item.namn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">
              Kontakt
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📧 hej@djurshoppen.se</p>
              <p>📞 08-123 456 78</p>
              <p>🕒 Mån-Fre 9-17</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Djurshoppen. Alla rättigheter förbehållna.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Link
                to="/kopvillkor"
                className="text-sm text-muted-foreground hover:text-brand-primary transition-smooth"
              >
                Köpvillkor
              </Link>
              <Link
                to="/integritet"
                className="text-sm text-muted-foreground hover:text-brand-primary transition-smooth"
              >
                Integritet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}