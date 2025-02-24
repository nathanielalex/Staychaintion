interface ListingCardProps {
    image: string
    title: string
    location: string
    price: string
    rating: number
    dates: string
    isFavorite?: boolean
  }
  
  export default function ListingCard({
    image,
    title,
    location,
    price,
    rating,
    dates,
    isFavorite = false,
  }: ListingCardProps) {
    return (
      <div className="group cursor-pointer">
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-105 transition"
          />
          <button className="absolute top-2 right-2 p-2">
            <svg
              viewBox="0 0 32 32"
              className={`w-6 h-6 ${isFavorite ? "fill-red-500" : "fill-transparent"} stroke-white stroke-2`}
            >
              <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z" />
            </svg>
          </button>
        </div>
  
        <div className="mt-2">
          <div className="flex justify-between">
            <h3 className="font-semibold">{location}</h3>
            <div className="flex items-center gap-1">
              <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current">
                <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" />
              </svg>
              <span>{rating}</span>
            </div>
          </div>
          <p className="text-gray-500">{title}</p>
          <p className="text-gray-500">{dates}</p>
          <p className="mt-1">
            <span className="font-semibold">{price}</span> total before taxes
          </p>
        </div>
      </div>
    )
  }
  
  