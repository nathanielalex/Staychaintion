export interface Property {
  title: string,
  slug: string,
  
  thumbnail: string,
  images: string[],
  
  location: string,
  favorite: boolean,
  rating: number,

  currency: string,
  price: number,

}

export interface User {
  username: string,
  email: string,
  date_of_birth: Date,

}