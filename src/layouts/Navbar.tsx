import { Link } from 'react-router-dom';

import NavDrowpdown from '@/components/NavDrowpdown';
import { Button } from '../components/ui/button';

export default function Navbar() {
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10 border">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div className="">
            <Link to="/">
              {/* <img className="h-8" src={logo} alt="log" /> */}
              <p className="text-4xl ">Book Catalog</p>
            </Link>
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/books">All Books</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/addNew">Add new</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/">WishList</Link>
                </Button>
              </li>
              {/* <li>
                <Button variant="ghost">
                  <HiOutlineSearch size="25" />
                </Button>
              </li> */}

              <li className="ml-5">
                <NavDrowpdown />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
