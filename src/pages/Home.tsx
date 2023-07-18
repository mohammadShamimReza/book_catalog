import BookCard from '@/components/BookCard';
import { useGetBooksQuery } from '@/redux/features/products/productApi';
import { IBook } from '@/types/globalTypes';

export default function Home() {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  console.log(data);

  const booksData = data?.data;

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative mt-20">
      <div className="col-span-12 grid grid-cols-4 gap-10 pb-20">
        {booksData?.map((book: IBook) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
}
