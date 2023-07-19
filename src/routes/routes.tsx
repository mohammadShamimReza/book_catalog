import App from '@/App';
import AddNew from '@/pages/AddNew';
import Book from '@/pages/Book';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import ProductDetails from '@/pages/ProductDetails';
import Signup from '@/pages/Signup';
import { createBrowserRouter } from 'react-router-dom';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/books',
        element: <Book />,
      },
      {
        path: '/book-details/:id',
        element: <ProductDetails />,
      },
      {
        path: '/addNew',
        element: (
          // <PrivetRoute>
          <AddNew />
          // </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
