import Navbar from '@/layouts/Navbar';
import { cn } from '@/lib/utils';
import { setAccessToken } from '@/redux/features/user/authSlice';
import { useLogInMutation } from '@/redux/features/user/userApi';
import { setUser } from '@/redux/features/user/userSlice';
import { useAppDispatch } from '@/redux/hook';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import Cookies from 'js-cookie';
import { ChangeEvent, FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

type res =
  | {
      data: {
        statusCode: number;
        success: boolean;
        message: string;
        data: {
          accessToken: string;
        };
      };
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export default function Login() {
  const prevRoute = useLocation();

  const [logIn] = useLogInMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const from = prevRoute.state?.path || -1 || '/';


  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform login or authentication logic here

    const response: res = await logIn(formData);
    if ('data' in response) {
      if (response.data.statusCode === 200) {
        notify(response.data.message);
        dispatch(setUser(formData.email));
        dispatch(setAccessToken(response.data.data.accessToken));
        const refreshToken = Cookies.get('refreshToken');
        console.log(refreshToken);
        setTimeout(() => {
          navigate(from);
        }, 1000);
      }
    } else if ('error' in response) {
      notify('try again');
      dispatch(setUser(null));
    }

    // Reset the form
    setFormData({
      email: '',
      password: '',
    });
  };

  const isSubmitDisabled =
    formData.email.trim() === '' || formData.password.trim() === '';
  const notify = (action: string) => toast(action);

  return (
    <div>
      <Navbar />
      <Toaster position="bottom-right" />

      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md">
          <div className="mx-auto p-8 bg-white rounded-lg shadow-md">
            <div className="flex flex-col align-middle justify-center mb-6">
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-center">Login</h1>
                <div>
                  <Link
                    to="/signup"
                    className={cn(
                      'text-sm font-bold text-blue-500',
                      'ml-auto', // Move the button to the right corner
                      'w-min', // Set minimum width
                      'max-w-xs', // Set maximum width
                      'px-4', // Add horizontal padding
                      'py-2' // Add vertical padding
                    )}
                  >
                    Signup
                  </Link>
                </div>
              </div>
              <br />
              <p className="text-sm text-left text-gray-600 text-center">
                Enter your email & password below to login
              </p>
            </div>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="text-sm font-bold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="text-sm font-bold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitDisabled}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
