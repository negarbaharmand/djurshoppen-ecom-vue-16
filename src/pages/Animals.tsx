import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { animals } from '@/data/animals';
import { Animal, AnimalCategory, AnimalSize } from '@/lib/types';
import { FilterPanel } from '@/components/FilterPanel';
import { AnimalCard } from '@/components/AnimalCard';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Search } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

export interface FilterState {
  search: string;
  kategori: 'alla' | AnimalCategory;
  storlek: 'alla' | AnimalSize;
  prisMin: number;
  prisMax: number;
  sortering: 'rekommenderat' | 'pris_asc' | 'pris_desc' | 'namn_asc';
}

export default function Animals() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize filters from URL params
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get('search') || '',
    kategori: (searchParams.get('kategori') as AnimalCategory) || 'alla',
    storlek: (searchParams.get('storlek') as AnimalSize) || 'alla',
    prisMin: parseInt(searchParams.get('prisMin') || '0'),
    prisMax: parseInt(searchParams.get('prisMax') || '100000'),
    sortering: (searchParams.get('sort') as FilterState['sortering']) || 'rekommenderat'
  });

  // Update URL when filters change
  useEffect(() => {
    const newParams = new URLSearchParams();
    
    if (filters.search) newParams.set('search', filters.search);
    if (filters.kategori !== 'alla') newParams.set('kategori', filters.kategori);
    if (filters.storlek !== 'alla') newParams.set('storlek', filters.storlek);
    if (filters.prisMin > 0) newParams.set('prisMin', filters.prisMin.toString());
    if (filters.prisMax < 100000) newParams.set('prisMax', filters.prisMax.toString());
    if (filters.sortering !== 'rekommenderat') newParams.set('sort', filters.sortering);
    if (currentPage > 1) newParams.set('page', currentPage.toString());

    setSearchParams(newParams);
  }, [filters, currentPage, setSearchParams]);

  // Get minimum price for each animal
  const getMinPrice = (animal: Animal): number => {
    return Math.min(animal.pris.S, animal.pris.M, animal.pris.L);
  };

  // Filter and sort animals
  const filteredAnimals = useMemo(() => {
    let result = animals.filter(animal => {
      // Search filter
      if (filters.search && !animal.namn.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.kategori !== 'alla' && animal.kategori !== filters.kategori) {
        return false;
      }

      // Size filter - check if animal has stock in selected size
      if (filters.storlek !== 'alla' && animal.lager[filters.storlek] === 0) {
        return false;
      }

      // Price filter
      const minPrice = getMinPrice(animal);
      if (minPrice < filters.prisMin || minPrice > filters.prisMax) {
        return false;
      }

      return true;
    });

    // Sort results
    switch (filters.sortering) {
      case 'pris_asc':
        result.sort((a, b) => getMinPrice(a) - getMinPrice(b));
        break;
      case 'pris_desc':
        result.sort((a, b) => getMinPrice(b) - getMinPrice(a));
        break;
      case 'namn_asc':
        result.sort((a, b) => a.namn.localeCompare(b.namn, 'sv'));
        break;
      default: // rekommenderat
        // Keep original order
        break;
    }

    return result;
  }, [animals, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredAnimals.length / ITEMS_PER_PAGE);
  const paginatedAnimals = filteredAnimals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* SEO Headers */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Alla djur</h1>
        <p className="text-muted-foreground">
          Upptäck vårt stora utbud av vanliga och exotiska djur
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Panel */}
        <aside className="lg:w-80 flex-shrink-0">
          <FilterPanel 
            filters={filters} 
            onFiltersChange={setFilters}
            totalResults={filteredAnimals.length}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {isLoading ? 'Laddar...' : `${filteredAnimals.length} djur hittade`}
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : filteredAnimals.length === 0 ? (
            /* Empty State */
            <EmptyState
              icon={<Search className="h-12 w-12" />}
              title="Inga djur hittades"
              description="Prova att ändra dina filterinställningar eller sök efter något annat."
              action={{
                label: "Rensa filter",
                onClick: () => setFilters({
                  search: '',
                  kategori: 'alla',
                  storlek: 'alla',
                  prisMin: 0,
                  prisMax: 100000,
                  sortering: 'rekommenderat'
                })
              }}
            />
          ) : (
            <>
              {/* Animals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-8">
                {paginatedAnimals.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(currentPage - 1);
                            }}
                          />
                        </PaginationItem>
                      )}
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            isActive={page === currentPage}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(currentPage + 1);
                            }}
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
