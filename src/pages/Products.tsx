import BookCard from '@/components/BookCard';
import { useToast } from '@/components/ui/use-toast';
import { useGetSearchBooksQuery } from '@/redux/features/products/productApi';
import { IBook } from '@/types/globalTypes';
import { useState } from 'react';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useGetSearchBooksQuery(searchTerm);

  const { toast } = useToast();

  const bookData = data?.data;

  // Filter state
  const [genreFilters, setGenreFilters] = useState<string[]>([]);
  const [yearFilters, setYearFilters] = useState<string[]>([]);

  // Apply filters
  const filteredBooks = bookData?.filter((book: IBook) => {
    if (genreFilters.length > 0 && !genreFilters.includes(book.genre)) {
      return false;
    }
    if (
      yearFilters.length > 0 &&
      (!book.publication_year ||
        !yearFilters.includes(book.publication_year.toString()))
    ) {
      return false;
    }
    return true;
  });

  // Handle genre checkbox change
  const handleGenreChange = (genre: string) => {
    if (genreFilters.includes(genre)) {
      setGenreFilters(genreFilters.filter((filter) => filter !== genre)); // Remove the filter
    } else {
      setGenreFilters([...genreFilters, genre]); // Add the filter
    }
  };

  // Handle year checkbox change
  const handleYearChange = (year: string) => {
    if (yearFilters.includes(year)) {
      setYearFilters(yearFilters.filter((filter) => filter !== year)); // Remove the filter
    } else {
      setYearFilters([...yearFilters, year]); // Add the filter
    }
  };

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        {/* Filters */}
        <div>
          <h1 className="text-2xl uppercase">Filters</h1>
          <div className="mt-3">
            <h2>Genre:</h2>
            <div>
              <input
                type="checkbox"
                id="fiction"
                value="Fiction"
                className="mr-2"
                checked={genreFilters.includes('Fiction')}
                onChange={() => handleGenreChange('Fiction')}
              />
              <label htmlFor="fiction" className="mr-4">
                Fiction
              </label>
              <input
                type="checkbox"
                id="non-fiction"
                value="Non-Fiction"
                className="mr-2"
                checked={genreFilters.includes('Non-Fiction')}
                onChange={() => handleGenreChange('Non-Fiction')}
              />
              <label htmlFor="non-fiction">Non-Fiction</label>
            </div>
          </div>
          <div className="mt-3">
            <h2>Publication Year:</h2>
            <div>
              <input
                type="checkbox"
                id="2023"
                value="2023"
                className="mr-2"
                checked={yearFilters.includes('2023')}
                onChange={() => handleYearChange('2023')}
              />
              <label htmlFor="2023" className="mr-4">
                2023
              </label>
              <input
                type="checkbox"
                id="2022"
                value="2022"
                className="mr-2"
                checked={yearFilters.includes('2022')}
                onChange={() => handleYearChange('2022')}
              />
              <label htmlFor="2022">2022</label>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div>
          <input
            className="mb-3"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px',
              border: '1px solid gray',
              borderRadius: '4px',
              outline: 'none',
              width: '200px',
            }}
          />
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {filteredBooks?.map((book: IBook, index: number) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
}
