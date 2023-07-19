import BookCard from '@/components/BookCard';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import { IBook } from '@/types/globalTypes';

export default function Home() {
  const { data, isLoading, error } = useGetBooksQuery(undefined);

  const booksData = data?.data;

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative mt-20">
      <div className="col-span-12 grid grid-cols-4 gap-10 pb-20">
        {booksData?.map((book: IBook) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
