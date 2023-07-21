import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useSingleBookQuery } from '@/redux/features/books/bookApi';
import { useAppSelector } from '@/redux/hook';
import { IBook } from '@/types/globalTypes';
import { useNavigate, useParams } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const { data, isLoading, error } = useSingleBookQuery(id);

  const book: IBook = data?.data;

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold"> Title : {book?.title}</h1>
          <p className="text-xl">Author: {book?.author}</p>

          <p className="text-xl">Genre: {book?.genre}</p>

          <p className="text-xl">Publication_year: {book?.publication_year}</p>

          <p className="text-xl">Reviews: {book?.reviews}</p>
          <p className="text-xl">Description : {book?.description}</p>

          {/* <ul className="space-y-1 text-lg">
            {book?.features?.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul> */}
          <br />
          <br />
          <div className="flex justify-center gap-10">
            <Button
              onClick={() =>
                user.email === null
                  ? navigate('/login')
                  : navigate(`/editbook/${id}`)
              }
            >
              Edit the book
            </Button>

            <Button variant={'destructive'}>Delete the book</Button>
          </div>
        </div>
        <div className="w-[50%]">
          <img src={book?.image} alt="" />
        </div>
      </div>
      <ProductReview id={id!} />
    </>
  );
}
