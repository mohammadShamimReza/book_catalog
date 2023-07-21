import { useAppSelector } from '@/redux/hook';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

export default function PrivetRoute({ children }: IProps) {
  const { user } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  if (!user.email) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }
  return children;
}
