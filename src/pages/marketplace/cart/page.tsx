'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Trash2,
  CreditCard,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '@/declarations/Cart_backend/Cart_backend.did';
import { Cart_backend } from '@/declarations/Cart_backend';
import { useAuth } from '@/utility/use-auth-client';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [checkoutStep, setCheckoutStep] = useState(1);
  const navigate = useNavigate();

  const { principal } = useAuth();

  if (!principal) return <></>;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>('');

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const items = await Cart_backend.getItems(principal);
      setCartItems(items);
    } catch (err) {
      console.log(err);
      setError('An error has occured.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(principal)
    fetchCartItems();
  }, []);

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice =
      item.discountType === 'Percentage'
        ? item.price * (1 - item.discount / 100)
        : item.price - item.discount;
    return total + itemPrice * Number(item.quantity);
  }, 0);

  const shipping = 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const promoDiscount = promoApplied ? 10 : 0; // $10 off with promo code
  const total = subtotal + shipping + tax - promoDiscount;

  // Handle quantity changes
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
  };

  // Remove item from cart
  const removeItem = async (id: string) => {
    try {
      await Cart_backend.removeItem(principal, id);
      setCartItems((items) =>
        items.filter(
          (item) => item.userId != principal && item.productId != id,
        ),
      );
      console.log('Product deleted');
    } catch (err) {
      console.log(err);
    }
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'discount10') {
      setPromoApplied(true);
    }
  };

  // Proceed to checkout
  const proceedToCheckout = () => {
    setCheckoutStep(2);
  };

  // Place order
  const placeOrder = () => {
    // Order processing logic would go here
    navigate('/marketplace/order-confirmation');
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
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
            Continue Shopping
          </a>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <div className="flex items-center text-gray-500">
            <ShoppingCart className="h-5 w-5 mr-2" />
            <span>
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-lg shadow-sm"
          >
            <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-blue-50 mb-4">
              <ShoppingCart className="h-12 w-12 text-blue-300" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <a href="/marketplace">
              <Button>Browse Products</Button>
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Cart Items</h2>

                {cartItems.map((item, index) => {
                  const discountedPrice =
                    item.discountType === 'Percentage'
                      ? item.price * (1 - item.discount / 100)
                      : item.price - item.discount;

                  return (
                    <motion.div
                      key={item.productId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`flex py-4 ${index < cartItems.length - 1 ? 'border-b' : ''}`}
                    >
                      <div className="w-24 h-24 relative rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.coverPicture || '/placeholder.svg'}
                          alt={item.name}
                          className="object-cover"
                        />
                      </div>

                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <a href={`/marketplace/${item.productId}`}>
                              <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                                {item.name}
                              </h3>
                            </a>
                            <p className="text-sm text-gray-500 mb-1">
                              {item.productType}
                            </p>
                            {/* <p className="text-sm text-gray-500">Sold by: {item.seller}</p> */}
                          </div>

                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              {formatCurrency(discountedPrice)}
                            </p>
                            {item.discount > 0 && (
                              <p className="text-sm text-gray-500 line-through">
                                {formatCurrency(item.price)}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  Number(item.quantity) - 1,
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">
                              {Number(item.quantity)}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  Number(item.quantity) + 1,
                                )
                              }
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeItem(item.productId)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </Card>

              {checkoutStep === 2 && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="mt-1" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main St"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="New York"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        placeholder="10001"
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        placeholder="(123) 456-7890"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <h3 className="font-medium mb-3">Payment Method</h3>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="mb-6"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label
                        htmlFor="credit-card"
                        className="flex items-center"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Credit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'credit-card' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" className="mt-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{formatCurrency(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount</span>
                      <span>-{formatCurrency(promoDiscount)}</span>
                    </div>
                  )}

                  <Separator className="my-3" />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>

                {!promoApplied && (
                  <div className="mb-6">
                    <Label htmlFor="promoCode">Promo Code</Label>
                    <div className="flex mt-1">
                      <Input
                        id="promoCode"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="rounded-r-none"
                      />
                      <Button
                        onClick={applyPromoCode}
                        className="rounded-l-none"
                        disabled={!promoCode}
                      >
                        Apply
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Try "DISCOUNT10" for $10 off
                    </p>
                  </div>
                )}

                {checkoutStep === 1 ? (
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={proceedToCheckout}
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={placeOrder}
                  >
                    Place Order
                    <ShoppingBag className="ml-2 h-4 w-4" />
                  </Button>
                )}

                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>
                    Need help?{' '}
                    <a
                      href="/contact"
                      className="text-blue-600 hover:underline"
                    >
                      Contact Support
                    </a>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
