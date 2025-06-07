import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MinusCircle, PlusCircle, Trash2, Tag, ArrowRight } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const CartPage = () => {
  console.log('CartPage loaded');

  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 'm1', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: 'https://source.unsplash.com/random/100x100/?margherita,pizza' },
    { id: 'm3', name: 'Garlic Bread', price: 5.99, quantity: 2, imageUrl: 'https://source.unsplash.com/random/100x100/?garlic,bread' },
    { id: 'm6', name: 'Coke', price: 2.50, quantity: 4, imageUrl: 'https://source.unsplash.com/random/100x100/?coke,can' },
  ]);
  const [promoCode, setPromoCode] = useState('');

  const handleQuantityChange = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      ).filter(item => item.quantity > 0) // Optionally remove if quantity becomes 0
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 5.00 : 0; // Example delivery fee
  const taxes = subtotal * 0.08; // Example 8% tax
  const total = subtotal + deliveryFee + taxes;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} isLoggedIn={true} />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="p-10 text-center">
              <p className="text-xl text-gray-600">Your cart is empty.</p>
              <Button className="mt-6" onClick={() => console.log("Navigate to homepage")}>Start Shopping</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Order Items ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px] hidden md:table-cell">Image</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="hidden md:table-cell">
                            <img src={item.imageUrl || 'https://source.unsplash.com/random/100x100/?food,item'} alt={item.name} className="w-16 h-16 object-cover rounded-md"/>
                          </TableCell>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, -1)}>
                                <MinusCircle className="h-4 w-4" />
                              </Button>
                              <span>{item.quantity}</span>
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, 1)}>
                                <PlusCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 h-8 w-8" onClick={() => handleRemoveItem(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (8%)</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <hr/>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="space-y-2 pt-4">
                    <Label htmlFor="promoCode" className="flex items-center"><Tag className="h-4 w-4 mr-2 text-orange-500"/>Promo Code</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="promoCode" 
                        placeholder="Enter code" 
                        value={promoCode} 
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={() => console.log('Apply promo:', promoCode)}>Apply</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    size="lg" 
                    className="w-full bg-orange-500 hover:bg-orange-600" 
                    onClick={() => console.log('Proceed to checkout')}
                  >
                    Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white text-center p-6 mt-auto">
        <p>&copy; {new Date().getFullYear()} FoodDash Cart</p>
      </footer>
    </div>
  );
};

export default CartPage;