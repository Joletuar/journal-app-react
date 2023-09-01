import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import AuthRoutes from '../auth/routes/AuthRoutes';
import { useCheckAuth } from '../hook';
import { LoginPage, RegisterPage } from '../auth/pages';
import JournlaPage from '../journal/pages/JournlaPage';
import JournalRoutes from '../journal/routes/JournalRoutes';
import LayoutMain from '../LayoutMain';
import { CheckingAuth } from '../ui/components/';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutMain />,
    children: [
      {
        path: '/',
        element: <JournalRoutes />,
        children: [
          {
            index: true,
            element: <JournlaPage />,
          },
          {
            path: '/*',
            element: <Navigate to='/' />,
          },
        ],
      },
      {
        path: '/auth',
        element: <AuthRoutes />,
        children: [
          {
            path: '/auth/login',
            element: <LoginPage />,
          },
          {
            path: '/auth/register',
            element: <RegisterPage />,
          },
          {
            path: '/auth/*',
            element: <Navigate to='/auth/login' />,
          },
        ],
      },
    ],
  },
]);

function AppRouter() {
  // De esta manera evitamos que el usuario entre a las páginas si no está atenticado
  const { status } = useCheckAuth();

  if (status === 'checking') {
    return <CheckingAuth />;
  }

  return <RouterProvider router={router} />;
}

export default AppRouter;
