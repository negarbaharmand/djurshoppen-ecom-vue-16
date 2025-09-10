import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, X } from 'lucide-react';

export interface FilterState {
  search: string;
  kategori: 'alla' | 'normal' | 'exotisk';
  storlek: 'alla' | 'S' | 'M' | 'L';
  prisMin: number;
  prisMax: number;
  sortering: 'rekommenderat' | 'pris_asc' | 'pris_desc' | 'namn_asc';
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  totalResults: number;
}

export function FilterPanel({ filters, onFiltersChange, totalResults }: FilterPanelProps) {
  const [priceRange, setPriceRange] = useState([filters.prisMin, filters.prisMax]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    onFiltersChange({
      ...filters,
      prisMin: values[0],
      prisMax: values[1]
    });
  };

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      search: '',
      kategori: 'alla',
      storlek: 'alla',
      prisMin: 0,
      prisMax: 100000,
      sortering: 'rekommenderat'
    };
    onFiltersChange(defaultFilters);
    setPriceRange([0, 100000]);
  };

  const hasActiveFilters = filters.search || 
    filters.kategori !== 'alla' || 
    filters.storlek !== 'alla' || 
    filters.prisMin > 0 || 
    filters.prisMax < 100000 ||
    filters.sortering !== 'rekommenderat';

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter
          </span>
          <Button 
            variant="ghost" 
            size="sm"
            className="lg:hidden"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label="Visa/dölj filter"
          >
            {isExpanded ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
          </Button>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {totalResults} resultat
        </p>
      </CardHeader>

      <CardContent className={`space-y-6 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Sök djur</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Sök efter djurnamn..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Separator />

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="kategori">Kategori</Label>
          <Select 
            value={filters.kategori} 
            onValueChange={(value) => handleFilterChange('kategori', value)}
          >
            <SelectTrigger id="kategori">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alla">Alla kategorier</SelectItem>
              <SelectItem value="normal">Vanliga djur</SelectItem>
              <SelectItem value="exotisk">Exotiska djur</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Size */}
        <div className="space-y-2">
          <Label htmlFor="storlek">Storlek</Label>
          <Select 
            value={filters.storlek} 
            onValueChange={(value) => handleFilterChange('storlek', value)}
          >
            <SelectTrigger id="storlek">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alla">Alla storlekar</SelectItem>
              <SelectItem value="S">Liten (S)</SelectItem>
              <SelectItem value="M">Medium (M)</SelectItem>
              <SelectItem value="L">Stor (L)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Price Range */}
        <div className="space-y-4">
          <Label>Prisintervall</Label>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              max={100000}
              min={0}
              step={100}
              className="w-full"
              aria-label="Prisintervall"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{priceRange[0].toLocaleString('sv-SE')} kr</span>
            <span>{priceRange[1].toLocaleString('sv-SE')} kr</span>
          </div>
        </div>

        <Separator />

        {/* Sorting */}
        <div className="space-y-2">
          <Label htmlFor="sortering">Sortering</Label>
          <Select 
            value={filters.sortering} 
            onValueChange={(value) => handleFilterChange('sortering', value)}
          >
            <SelectTrigger id="sortering">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rekommenderat">Rekommenderat</SelectItem>
              <SelectItem value="pris_asc">Pris: Lägst först</SelectItem>
              <SelectItem value="pris_desc">Pris: Högst först</SelectItem>
              <SelectItem value="namn_asc">Namn: A-Ö</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <>
            <Separator />
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="w-full"
            >
              <X className="h-4 w-4 mr-2" />
              Rensa alla filter
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}