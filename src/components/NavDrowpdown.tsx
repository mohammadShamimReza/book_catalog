import { setAccessToken } from '@/redux/features/user/authSlice';
import { setUser } from '@/redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

export default function NavDrowpdown() {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const hangleLogOut = () => {
    dispatch(setUser(null));
    notify('Log out successfully');
    dispatch(setAccessToken(null));

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  const notify = (action: string) => toast(action);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src="https://i.ibb.co/mHJTv57/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem> */}
        <Toaster position="bottom-right" />

        {!user.email && (
          <>
            {' '}
            <Link to="/login">
              <DropdownMenuItem className="cursor-pointer">
                login
              </DropdownMenuItem>
            </Link>
            <Link to="/signup">
              <DropdownMenuItem className="cursor-pointer">
                signup
              </DropdownMenuItem>
            </Link>
          </>
        )}
        {user.email && (
          <DropdownMenuItem onClick={hangleLogOut} className="cursor-pointer">
            logOut
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
