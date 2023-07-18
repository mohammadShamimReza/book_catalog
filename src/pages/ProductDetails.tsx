import ProductReview from '@/components/ProductReview';
import { useSingleBookQuery } from '@/redux/features/products/productApi';
import { IBook } from '@/types/globalTypes';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();

  const { data, isLoading, error } = useSingleBookQuery(id);

  console.log(data?.data);
  const book: IBook = data?.data;

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold"> Title : {book?.title}</h1>
          <p className="text-xl">Author: {book?.author}</p>

          <p className="text-xl">Genre: {book?.genre}</p>

          <p className="text-xl">Publication_year: {book?.publication_year}</p>

          <p className="text-xl">Reviews: {book?.reviews}</p>
          <p className="text-xl">Description : {book?.description}</p>

          {/* <ul className="space-y-1 text-lg">
            {book?.features?.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul> */}
          {/* <Button>Add to cart</Button> */}
        </div>
        <div className="w-[50%]">
          <img src={book?.image} alt="" />
        </div>
      </div>
      <ProductReview id={id!} />
    </>
  );
}
