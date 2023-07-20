import { auth } from '@/lib/firebase';
// import { setUser } from '@/redux/features/user/userSlice';
import { useAppDispatch } from '@/redux/hook';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
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
  // const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const hangleLogOut = () => {
    console.log('logged out');
    signOut(auth).then(() => {
      // dispatch(setUser(null));
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        {/* {!user.email && ( */}
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
        {/* )}
        {user.email && ( */}
        <DropdownMenuItem onClick={hangleLogOut} className="cursor-pointer">
          logOut
        </DropdownMenuItem>
        {/* )} */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
