import banner from '@/assets/images/download.jpeg';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const card = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function Bannar() {
  return (
    <div className="m-20 flex justify-center items-center flex-col">
      <div className="flex flex-col items-center justify-center mb-20">
        <h1 className="text-5xl font-black text-primary uppercase mt-10">
          Recently added
        </h1>
        <Button className="mt-10 " variant={'outline'}>
          <Link to="/products">Brows all Books</Link>
        </Button>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-8">
        {card.map((card) => (
          <a
            href="#"
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={banner}
              alt=""
            />
            <div className="flex flex-col justify-between p-2 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                name: technology
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                janra: <br />
                published: :
              </p>
            </div>
          </a>
        ))}{' '}
      </div>
    </div>
  );
}

export default Bannar;
