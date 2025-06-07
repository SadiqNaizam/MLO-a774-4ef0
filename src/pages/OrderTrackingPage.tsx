import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import LiveOrderStatusTracker from '@/components/LiveOrderStatusTracker';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PackageSearch, History, ShoppingBag, RefreshCw } from 'lucide-react';

type OrderStatus = 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

interface PastOrder {
  id: string;
  date: string;
  total: number;
  status: OrderStatus; // Could be simplified to just 'Delivered' or 'Cancelled' for past orders
  restaurantName: string;
  items: { name: string; quantity: number; price: number }[];
}

const OrderTrackingPage = () => {
  console.log('OrderTrackingPage/OrderHistoryPage loaded');

  const [currentOrders, setCurrentOrders] = useState([
    { id: 'order123', status: 'PREPARING' as OrderStatus, estimatedDelivery: '6:30 PM - 6:45 PM', restaurantName: "Luigi's Pizzeria" },
    // { id: 'order456', status: 'OUT_FOR_DELIVERY' as OrderStatus, estimatedDelivery: '6:15 PM - 6:30 PM', restaurantName: "Burger Hub" },
  ]);

  const pastOrders: PastOrder[] = [
    { id: 'past001', date: '2024-07-15', total: 25.99, status: 'DELIVERED', restaurantName: "Luigi's Pizzeria", items: [{name: 'Pepperoni Pizza', quantity: 1, price: 14.99}, {name: 'Coke', quantity: 2, price: 5.00}] },
    { id: 'past002', date: '2024-07-10', total: 18.50, status: 'DELIVERED', restaurantName: "Sushi World", items: [{name: 'California Roll', quantity: 2, price: 12.00}]},
    { id: 'past003', date: '2024-07-05', total: 32.00, status: 'CANCELLED', restaurantName: "Curry House", items: [{name: 'Chicken Tikka', quantity: 1, price: 15.00}]},
  ];

  const handleReorder = (orderId: string) => {
    console.log('Reorder:', orderId);
    // Navigate to cart with items from this order
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu isLoggedIn={true} />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="current" className="py-3 flex items-center"><PackageSearch className="mr-2 h-5 w-5"/>Current Orders</TabsTrigger>
            <TabsTrigger value="history" className="py-3 flex items-center"><History className="mr-2 h-5 w-5"/>Order History</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Track Your Active Orders</h2>
            {currentOrders.length > 0 ? (
              <div className="space-y-6">
                {currentOrders.map(order => (
                  <Card key={order.id}>
                    <CardHeader>
                      <CardTitle>Order #{order.id} from {order.restaurantName}</CardTitle>
                      <CardDescription>
                        Status: <span className="font-semibold text-orange-600">{order.status.replace('_', ' ')}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <LiveOrderStatusTracker currentStatus={order.status} estimatedDeliveryTime={order.estimatedDelivery} />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button variant="outline"><RefreshCw className="mr-2 h-4 w-4"/>Refresh Status</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-10 text-center">
                  <p className="text-xl text-gray-600">No active orders at the moment.</p>
                  <Button className="mt-6" onClick={() => console.log("Navigate to homepage")}>Place a New Order</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Past Orders</h2>
            {pastOrders.length > 0 ? (
              <ScrollArea className="h-[calc(100vh-250px)]"> {/* Adjust height as needed */}
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {pastOrders.map(order => (
                    <AccordionItem value={order.id} key={order.id} className="bg-white rounded-lg shadow-sm border">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex justify-between w-full items-center">
                            <div>
                                <span className="font-semibold">Order #{order.id}</span>
                                <span className="text-sm text-gray-500 ml-2">({order.date})</span>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium
                                ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 
                                  order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                                {order.status.replace('_', ' ')}
                            </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-2">
                        <p className="text-sm text-gray-600 mb-1">Restaurant: {order.restaurantName}</p>
                        <p className="text-sm text-gray-600 mb-3">Total: <span className="font-semibold">${order.total.toFixed(2)}</span></p>
                        <h4 className="font-medium mb-1">Items:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                            {order.items.map(item => (
                                <li key={item.name}>{item.name} (x{item.quantity}) - ${item.price.toFixed(2)} each</li>
                            ))}
                        </ul>
                        <div className="mt-4 flex space-x-3">
                          <Button size="sm" variant="outline" onClick={() => handleReorder(order.id)}>
                            <ShoppingBag className="mr-2 h-4 w-4"/> Reorder
                          </Button>
                          <Button size="sm" variant="ghost">View Invoice</Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollArea>
            ) : (
              <Card>
                <CardContent className="p-10 text-center">
                  <p className="text-xl text-gray-600">You haven't placed any orders yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gray-800 text-white text-center p-6 mt-auto">
        <p>&copy; {new Date().getFullYear()} FoodDash Orders</p>
      </footer>
    </div>
  );
};

export default OrderTrackingPage;