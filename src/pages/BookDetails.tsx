import BookReview from '@/components/BookReview';
import { Button } from '@/components/ui/button';
import {
  useDeleteBookMutation,
  useSingleBookQuery,
} from '@/redux/features/books/bookApi';
import { useAppSelector } from '@/redux/hook';
import { IBook } from '@/types/globalTypes';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

type res =
  | {
      data: {
        statusCode: number;
        success: boolean;
        message: string;
        data: {
          email: string;
          name: string;
          phone: string;
          address: string;
          password: string;
          _id: string;
          __v: number;
        };
      };
    }
  | {
      error: FetchBaseQueryError | SerializedError | any;
    };

export default function BookDetails() {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const { data, isLoading, error } = useSingleBookQuery(id);

  const book: IBook = data?.data;

  console.log(book);

  const dispatch = useDispatch();
  const [deletBook] = useDeleteBookMutation();

  const handleDeleteBook = async () => {
    window.confirm('Are you sure you want to delete the book?');
    // // eslint-disable-next-line react-hooks/rules-of-hooks
    const response: res = await deletBook({ id });
    const notify = (action: string) => toast(action);

    if ('data' in response) {
      if (response.data.statusCode === 200) {
        notify(response.data.message);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else if ('error' in response) {
        // notify(response.error.data?.message);
        console.log(response.error);
      }
    }
  };

  return (
    <>
      <Toaster position="bottom-right" />

      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold"> Title : {book?.title}</h1>
          <p className="text-xl">Author: {book?.author}</p>

          <p className="text-xl">Genre: {book?.genre}</p>

          <p className="text-xl">Publication_year: {book?.publication_year}</p>

          <p className="text-xl">Reviews:{` ${book?.reviews} `}</p>
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

            <Button
              onClick={() =>
                user.email === null ? navigate('/login') : handleDeleteBook()
              }
              variant={'destructive'}
            >
              Delete the book
            </Button>
          </div>
        </div>
        <div className="w-[50%]">
          <img src={book?.image} alt="" />
        </div>
      </div>
      <BookReview id={id!} />
    </>
  );
}
