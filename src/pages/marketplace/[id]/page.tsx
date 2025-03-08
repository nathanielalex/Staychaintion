'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  Info,
  User,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNavigate, useParams } from 'react-router-dom';
import RelatedProducts from '@/components/marketplace/related-products';
import { Product } from '@/declarations/Product_backend/Product_backend.did';
import { useAuth } from '@/utility/use-auth-client';
import { Product_backend } from '@/declarations/Product_backend';
import { Cart_backend } from '@/declarations/Cart_backend';

// Sample products data (same as in marketplace page)
// const products: Product[] = [
//   {
//     id: "1",
//     name: "Cozy Throw Blanket",
//     productType: "Merchandise",
//     shortDescription: "Super soft and comfortable throw blanket",
//     description:
//       'This luxurious throw blanket is perfect for those cozy nights at home. Made from premium materials, it provides exceptional comfort and warmth. The elegant design complements any home decor style.\n\nFeatures:\n- Size: 50" x 60"\n- Material: 100% Premium Microfiber\n- Machine washable\n- Available in multiple colors\n- Hypoallergenic\n\nWhether you\'re curling up with a good book or watching your favorite movie, this throw blanket will keep you comfortable and stylish.',
//     price: 39.99,
//     coverPicture: "/placeholder.svg?height=300&width=300",
//     pictures: [
//       "/placeholder.svg?height=600&width=600&text=Blanket+Front",
//       "/placeholder.svg?height=600&width=600&text=Blanket+Folded",
//       "/placeholder.svg?height=600&width=600&text=Blanket+Detail",
//       "/placeholder.svg?height=600&width=600&text=Blanket+In+Use",
//     ],
//     seller: "HomeComfort",
//     discountType: "Percentage",
//     discount: 10,
//     rating: 4,
//   },
//   {
//     id: "2",
//     name: "Modern Coffee Table",
//     productType: "Furniture",
//     shortDescription: "Elegant coffee table with storage",
//     description:
//       "This modern coffee table combines style and functionality. With its sleek design and hidden storage compartments, it's the perfect centerpiece for your living room. Made from high-quality materials for durability.",
//     price: 199.99,
//     coverPicture: "/placeholder.svg?height=300&width=300",
//     pictures: [
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//     ],
//     seller: "ModernLiving",
//     discountType: "Fixed",
//     discount: 20,
//     rating: 5,
//   },
//   // Other products...
// ]

// Reviews data
const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    date: '2023-10-15',
    comment:
      "Absolutely love this blanket! It's so soft and the quality is excellent. Perfect for chilly evenings.",
    helpful: 12,
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 4,
    date: '2023-09-28',
    comment:
      'Great product for the price. The material is nice and it washes well. Would recommend.',
    helpful: 8,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    date: '2023-11-02',
    comment:
      "This blanket exceeded my expectations. It's the perfect weight and so cozy. I'm buying another one as a gift!",
    helpful: 5,
  },
];

export default function ProductDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [productInfo, setProductInfo] = useState<Product | null>(null);
  const navigate = useNavigate();

  const { principal } = useAuth();

  const { id } = useParams();
  if (!id) {
    navigate('/marketplace');
    return;
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>('');

  const fetchProductInfo = async (id: string) => {
    try {
      setLoading(true);

      const product = await Product_backend.getProductInfo(id);
      if (product) {
        setProductInfo(product[0]!);
      } else {
        navigate('/marketplace');
      }
    } catch (err) {
      console.log(err);
      navigate('/marketplace');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductInfo(id);
  }, []);

  if (!productInfo) return <></>;

  // Calculate discounted price
  const discountedPrice =
    productInfo.discountType === 'Percentage'
      ? productInfo.price * (1 - productInfo.discount / 100)
      : productInfo.price - productInfo.discount;

  // Check if product has a discount
  const hasDiscount = productInfo.discount > 0;

  // Handle image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === productInfo.pictures.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productInfo.pictures.length - 1 : prev - 1,
    );
  };

  // Handle quantity changes
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Handle add to cart
  const addToCart = async () => {
    // Add to cart logic would go here
    // For now, just navigate to cart page
    try {
      if (principal) {
        await Cart_backend.addItem(principal, productInfo.id, BigInt(100));
        navigate('/marketplace/cart');
      } else {
        navigate('/marketplace');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Calculate average rating from reviews
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="mb-6">
          <a
            href="/marketplace"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Marketplace
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full relative"
              >
                <img
                  src={
                    productInfo.pictures[currentImageIndex] ||
                    '/placeholder.svg'
                  }
                  alt={`${productInfo.name} - Image ${currentImageIndex + 1}`}
                  className="object-contain"
                />
              </motion.div>

              {productInfo.pictures.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {hasDiscount && (
                <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                  {productInfo.discountType === 'Percentage'
                    ? `${productInfo.discount}% OFF`
                    : `$${productInfo.discount} OFF`}
                </Badge>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {productInfo.pictures.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {productInfo.pictures.map((pic, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                      currentImageIndex === index
                        ? 'border-blue-500'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={pic || '/placeholder.svg'}
                      alt={`Thumbnail ${index + 1}`}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-200 bg-blue-50"
                >
                  {productInfo.productType}
                </Badge>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < productInfo.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {Number(productInfo.rating)}/5
                  </span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {productInfo.name}
              </h1>

              <p className="text-gray-600 mb-4">
                {productInfo.shortDescription}
              </p>

              <div className="flex items-center mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  {hasDiscount && (
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      ${productInfo.price.toFixed(2)}
                    </span>
                  )}
                </div>

                {hasDiscount && (
                  <Badge className="ml-4 bg-green-500 hover:bg-green-600">
                    Save ${(productInfo.price - discountedPrice).toFixed(2)}
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Seller Info */}
            {/* <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Sold by</p>
                <p className="font-medium">{product.seller}</p>
              </div>
            </div> */}

            <Separator />

            {/* Quantity Selector */}
            <div>
              <p className="font-medium mb-2">Quantity</p>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseQuantity}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                size="lg"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={addToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart
                  className={`mr-2 h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
                />
                {isLiked ? 'Saved' : 'Save for Later'}
              </Button>
              <Button variant="outline" size="icon" className="hidden sm:flex">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Product Features */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <Check className="h-4 w-4 mr-2 text-blue-600" />
                Product Features
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                  <span>Premium quality materials</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                  <span>Durable and long-lasting</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                  <span>Easy to clean and maintain</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                  <span>Elegant design that complements any decor</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-6">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-blue-600 pb-2"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-blue-600 pb-2"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-blue-600 pb-2"
            >
              Reviews ({reviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-0">
            <Card className="p-6">
              <div className="prose max-w-none">
                {productInfo.description
                  .split('\n\n')
                  .map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-0">
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Product Specifications</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Product Type</td>
                        <td className="py-2 font-medium">
                          {productInfo.productType}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Material</td>
                        <td className="py-2 font-medium">Premium Microfiber</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Dimensions</td>
                        <td className="py-2 font-medium">50" x 60"</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Weight</td>
                        <td className="py-2 font-medium">2.5 lbs</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Color Options</td>
                        <td className="py-2 font-medium">
                          Blue, Gray, Beige, Green
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Care Instructions</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Info className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                      <span>Machine washable on gentle cycle</span>
                    </li>
                    <li className="flex items-start">
                      <Info className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                      <span>Tumble dry on low heat</span>
                    </li>
                    <li className="flex items-start">
                      <Info className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                      <span>Do not bleach</span>
                    </li>
                    <li className="flex items-start">
                      <Info className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                      <span>Iron on low heat if needed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-0">
            <Card className="p-6">
              {/* Reviews Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-1 flex flex-col items-center justify-center">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    {reviews.length} reviews
                  </p>
                </div>

                <div className="md:col-span-2">
                  <h3 className="font-medium mb-4">Rating Breakdown</h3>
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = reviews.filter(
                      (r) => r.rating === rating,
                    ).length;
                    const percentage = (count / reviews.length) * 100;

                    return (
                      <div key={rating} className="flex items-center mb-2">
                        <div className="flex items-center w-16">
                          <span className="text-sm mr-1">{rating}</span>
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        </div>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-full bg-yellow-400 rounded-full"
                          />
                        </div>
                        <span className="text-sm text-gray-500 ml-2 w-12">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator className="mb-8" />

              {/* Reviews List */}
              <div className="space-y-6">
                <h3 className="font-medium text-lg mb-4">Customer Reviews</h3>

                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border-b pb-6 last:border-b-0"
                  >
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                          <img
                            src={review.avatar || '/placeholder.svg'}
                            alt={review.name}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{review.name}</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(review.date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-3">{review.comment}</p>

                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sm text-gray-500"
                      >
                        Helpful ({review.helpful})
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sm text-gray-500"
                      >
                        Report
                      </Button>
                    </div>
                  </motion.div>
                ))}

                <div className="flex justify-center mt-8">
                  <Button>Write a Review</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {/* <RelatedProducts currentProductId={product.id} /> */}
      </motion.div>
    </div>
  );
}
