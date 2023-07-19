import { cn } from '@/lib/utils';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform login or authentication logic here
    console.log(formData);

    // Reset the form
    setFormData({
      email: '',
      password: '',
    });
  };

  const isSubmitDisabled =
    formData.email.trim() === '' || formData.password.trim() === '';

  return (
    <div>
      <nav className="flex items-center justify-between px-4 py-2 bg-gray-200">
        <div>
          <Link to="/" className="text-xl font-bold">
            Home
          </Link>
        </div>
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
      </nav>

      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md">
          <div className="mx-auto p-8 bg-white rounded-lg shadow-md">
            <div className="flex justify-between mb-6">
              <h1 className="text-2xl font-semibold text-center">Login</h1>
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
