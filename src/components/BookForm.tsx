import {
  useCreateBookMutation,
  useSingleBookQuery,
  useUpdateBookMutation,
} from '@/redux/features/books/bookApi';
import { useAppDispatch } from '@/redux/hook';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
  address: string;
}

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

function BookForm() {
  const parems = useParams();
  const { data } = useSingleBookQuery(parems?.id);

  const dispatch = useAppDispatch();

  const [updateBook] = useUpdateBookMutation();
  const [createBook] = useCreateBookMutation();

  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    publication_year: '',
    description: '',
    price: '',
    rating: '',
    image: '',
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    handleValidation();
  }, [bookData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response: res = data?.data
      ? await updateBook(bookData)
      : await createBook(bookData);

    console.log(bookData);

    if ('data' in response) {
      if (response.data.statusCode === 200) {
        notify(response.data.message);
        setBookData({
          title: '',
          author: '',
          genre: '',
          publication_year: '',
          description: '',
          price: '',
          rating: '',
          image: '',
        });
      }
    } else if ('error' in response) {
      notify(response.error.data?.message);
      console.log(response.error);
    }

    console.log(response);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleValidation = () => {
    const { title, author, genre, publication_year, description } = bookData;
    if (
      title.trim() !== '' &&
      author.trim() !== '' &&
      genre.trim() !== '' &&
      // publication_year.trim() !== '' &&
      description.trim() !== ''
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  };

  useEffect(() => {
    {
      data
        ? setBookData(data?.data)
        : setBookData({
            title: '',
            author: '',
            genre: '',
            publication_year: '',
            description: '',
            price: '',
            rating: '',
            image: '',
          });
    }
  }, [data]);

  const notify = (action: string) => toast(action);

  return (
    <>
      <Toaster position="bottom-right" />

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h1 className="text-center text-5xl">
            {!parems.id ? 'Add' : 'Update'} Book
          </h1>
          <br />
          <br />
          <br />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title<span className="text-red-500">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            value={bookData?.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="author"
          >
            Author<span className="text-red-500">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="author"
            type="text"
            name="author"
            value={bookData?.author}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="genre"
          >
            Genre<span className="text-red-500">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="genre"
            type="text"
            name="genre"
            value={bookData?.genre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="publication_year"
          >
            Publication Year<span className="text-red-500">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="publication_year"
            type="number" // Change the type to "number"
            name="publication_year"
            value={bookData?.publication_year}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description<span className="text-red-500">*</span>
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={bookData?.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number" // Change the type to "number"
            name="price"
            value={bookData?.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="rating"
          >
            Rating
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="rating"
            type="number"
            name="rating"
            value={bookData?.rating}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Image URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="text"
            name="image"
            value={bookData?.image}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-end">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default BookForm;
