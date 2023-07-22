import {
  useGetReviewsQuery,
  usePostReviewMutation,
} from '@/redux/features/books/bookApi';
import { useAppSelector } from '@/redux/hook';
import { AvatarImage } from '@radix-ui/react-avatar';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ChangeEvent, FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FiSend } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface IProps {
  id: string;
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

export default function BookReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const navigate = useNavigate();
  const [postReview] = usePostReviewMutation();
  const { user } = useAppSelector((state) => state.user);

  const { data } = useGetReviewsQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user.email) {
      return navigate('/login');
    }

    const options = {
      id,
      data: { review: inputValue },
    };
    const response = await postReview(options);
    const notify = (action: string) => toast(action);

    console.log(response);

    if ('data' in response) {
      if (response.data.statusCode === 200) {
        notify(response.data.message);
      } else if ('error' in response) {
        // notify(response.error.data?.message);
        console.log(response.error);
      }
    }

    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <Toaster position="bottom-right" />
      <br />
      <p className="text-center text-4xl">Give a reviews</p>
      <br />
      <br />
      <form
        className="flex gap-5 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <Textarea
          className="min-h-[30px] w-2/3"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>
      <br />
      <br />
      <div className="mt-10 mb-20">
        {data?.data?.reviews?.map((review: string, index: number) => (
          <div
            key={index}
            className="flex gap-3 items-center mb-5 align-middle justify-center"
          >
            <Avatar>
              <AvatarImage src="https://i.ibb.co/mHJTv57/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
