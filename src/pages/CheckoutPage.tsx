import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard, Home, Banknote, Lock } from 'lucide-react';

const addressSchema = z.object({
  street: z.string().min(5, "Street address is required (min 5 chars)"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  country: z.string().min(2, "Country is required"),
});

const paymentSchema = z.object({
    method: z.enum(["card", "paypal", "cod"], { required_error: "Please select a payment method." }),
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvc: z.string().optional(),
}).refine(data => {
    if (data.method === "card") {
        return !!data.cardNumber && data.cardNumber.match(/^\d{16}$/) &&
               !!data.cardExpiry && data.cardExpiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/) &&
               !!data.cardCvc && data.cardCvc.match(/^\d{3,4}$/);
    }
    return true;
}, {
    message: "Invalid card details. Please provide valid 16-digit card number, MM/YY expiry, and 3-4 digit CVC.",
    path: ["cardNumber"], // Path to show error for the group if card selected
});


const checkoutFormSchema = z.object({
  deliveryAddress: addressSchema,
  payment: paymentSchema,
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      deliveryAddress: {
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "USA",
      },
      payment: {
        method: undefined, // No default selected
        cardNumber: "",
        cardExpiry: "",
        cardCvc: "",
      },
    },
  });

  const paymentMethod = form.watch("payment.method");

  function onSubmit(data: CheckoutFormValues) {
    console.log('Checkout form submitted:', data);
    // Handle order placement logic here
    alert("Order Placed Successfully! (Simulated)");
  }
  
  const orderSummary = {
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
      { name: 'Coke', quantity: 2, price: 2.50 },
    ],
    subtotal: 17.99,
    delivery: 5.00,
    tax: 1.44,
    total: 24.43,
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu isLoggedIn={true} />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side: Address & Payment */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Home className="mr-2 h-5 w-5 text-orange-500" />Delivery Address</CardTitle>
                  <CardDescription>Enter or confirm your shipping details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="deliveryAddress.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="deliveryAddress.city" render={({ field }) => (
                        <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Anytown" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="deliveryAddress.state" render={({ field }) => (
                        <FormItem><FormLabel>State / Province</FormLabel><FormControl><Input placeholder="CA" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="deliveryAddress.zip" render={({ field }) => (
                        <FormItem><FormLabel>ZIP / Postal Code</FormLabel><FormControl><Input placeholder="90210" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="deliveryAddress.country" render={({ field }) => (
                        <FormItem><FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="USA">United States</SelectItem><SelectItem value="CAN">Canada</SelectItem></SelectContent>
                        </Select><FormMessage /></FormItem>
                    )}/>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><CreditCard className="mr-2 h-5 w-5 text-orange-500" />Payment Method</CardTitle>
                  <CardDescription>Choose how you'd like to pay.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="payment.method"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="card" /></FormControl>
                              <FormLabel className="font-normal flex items-center"><CreditCard className="mr-2 h-4 w-4"/>Credit/Debit Card</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="paypal" /></FormControl>
                              <FormLabel className="font-normal flex items-center"><img src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_SbyPP_H_H_rgb_pos.png" alt="PayPal" className="h-5 mr-1"/> PayPal</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="cod" /></FormControl>
                              <FormLabel className="font-normal flex items-center"><Banknote className="mr-2 h-4 w-4"/>Cash on Delivery</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {paymentMethod === 'card' && (
                    <div className="mt-4 space-y-4 p-4 border rounded-md bg-gray-50">
                      <FormField control={form.control} name="payment.cardNumber" render={({ field }) => (
                          <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl><FormMessage /></FormItem>
                      )}/>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="payment.cardExpiry" render={({ field }) => (
                            <FormItem><FormLabel>Expiry Date (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="payment.cardCvc" render={({ field }) => (
                            <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="•••" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right side: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24"> {/* Sticky for long forms */}
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {orderSummary.items.map(item => (
                    <div key={item.name} className="flex justify-between text-sm">
                      <span>{item.name} (x{item.quantity})</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery</span>
                    <span>${orderSummary.delivery.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (Est.)</span>
                    <span>${orderSummary.tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${orderSummary.total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700">
                    <Lock className="mr-2 h-5 w-5" /> Place Order Securely
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </Form>
      </main>

      <footer className="bg-gray-800 text-white text-center p-6 mt-auto">
        <p>&copy; {new Date().getFullYear()} FoodDash Checkout</p>
        <p className="text-xs text-gray-400">Secure Payment Gateway</p>
      </footer>
    </div>
  );
};

export default CheckoutPage;