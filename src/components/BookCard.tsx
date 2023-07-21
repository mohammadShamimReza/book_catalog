import { IBook } from '@/types/globalTypes';
import { Link } from 'react-router-dom';

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/book-details/${book._id}`} className="w-full">
          <img src={book?.image} />
          <br />
          <h1 className="text-xl font-semibold">{book?.title}</h1>
        </Link>
        <p className="text-sm">
          Author: {book?.author ? 'In stock' : 'Out of stock'}
        </p>
        <p className="text-sm">
          Genre: {book?.genre ? 'In stock' : 'Out of stock'}
        </p>
        <p className="text-sm">Published: {book?.publication_year}</p>
        {/* <Button variant="default">
          Add to cart
        </Button> */}
      </div>
    </div>
  );
}
