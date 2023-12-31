import App from '@/App';
import AddNew from '@/pages/AddNew';
import Book from '@/pages/Book';
import BookDetails from '@/pages/BookDetails';
import EditBook from '@/pages/EditBook';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Signup from '@/pages/Signup';
import { createBrowserRouter } from 'react-router-dom';
import PrivetRoute from './PrivetRoute';

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
        element: <BookDetails />,
      },
      {
        path: '/editbook/:id',
        element: <EditBook />,
      },
      {
        path: '/addNew',
        element: (
          <PrivetRoute>
            <AddNew />
            //{' '}
          </PrivetRoute>
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
