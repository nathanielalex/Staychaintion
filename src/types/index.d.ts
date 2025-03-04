export interface Property {
  uuid: string,
  title: string,

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
  roles: ("admin" | "renter" | "user" | "guest")[];
}