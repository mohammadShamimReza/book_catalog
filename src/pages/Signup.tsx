import Navbar from '@/layouts/Navbar';
import { cn } from '@/lib/utils';
import { useCreateUserMutation } from '@/redux/features/user/userApi';
import { setUser } from '@/redux/features/user/userSlice';
import { useAppDispatch } from '@/redux/hook';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ChangeEvent, FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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

export default function Signup() {
  const prevRoute = useLocation();

  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();
  const dispatch = useAppDispatch();

  const from = prevRoute.state?.path || -1 || '/';

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: '',
    address: '',
  });

  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    const response: res = await createUser(formData);
    if ('data' in response) {
      if (response.data.statusCode === 200) {
        notify(response.data.message);
        notify('login successful');
        dispatch(setUser(formData.email));
        setFormData({
          name: '',
          email: '',
          password: '',
          phone: '',
          confirmPassword: '',
          address: '',
        });
        setTimeout(() => {
          navigate(from);
        }, 1000);
      }
    } else if ('error' in response) {
      dispatch(setUser(null));
      notify(response.error.data?.message);
      console.log(response.error);
      notify('try again');
    }

    setPasswordError('');
  };

  const isSubmitDisabled = Object.values(formData).some(
    (value) => value.trim() === ''
  );
  // formData.password !== formData.confirmPassword;
  const notify = (action: string) => toast(action);

  return (
    <div>
      <Navbar />
      <div>
        <Toaster position="bottom-right" />
      </div>

      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md">
          <div className="mx-auto p-8 bg-white rounded-lg shadow-md">
            <div className="flex justify-between mb-6">
              <h1 className="text-2xl font-semibold text-center">
                Create an account
              </h1>
              <div>
                <Link
                  to="/login"
                  className={cn('text-sm font-bold text-blue-500')}
                >
                  Login
                </Link>
              </div>
            </div>
            <p className="text-sm text-left text-gray-600">
              Enter your email below to create your account
            </p>

            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="firstName" className="text-sm font-bold">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="text-sm font-bold">
                  Email<span className="text-red-500">*</span>
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
                  Password<span className="text-red-500">*</span>
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
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="text-sm font-bold">
                  Confirm Password<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="text-sm font-bold">
                  Phone<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="text-sm font-bold">
                  Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
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
            <p className="mt-4 text-sm text-center text-gray-600">
              By clicking continue, you agree to our{' '}
              <Link to="/terms" className="underline hover:text-primary">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="underline hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
