export interface IBook {
  _id: number;
  title: string;
  author: string;
  genre: string;
  publication_year: number;
  description: string;
  price: number;
  rating: number;
  image?: string;
  reviews?: string;
  ownerUser: string;
}
