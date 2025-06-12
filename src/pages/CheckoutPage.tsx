import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/components/ui/use-toast"; // For "Order Placed" toast

// Icons
import { CreditCard, ShieldCheck, MapPin, Phone, User, Home as HomeIcon, ShoppingBag } from 'lucide-react'; // Renamed Home to HomeIcon to avoid conflict

// Form Schema
const checkoutFormSchema = z.object({
  // Delivery Address
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  addressLine1: z.string().min(5, "Address line 1 must be at least 5 characters."),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City must be at least 2 characters."),
  state: z.string().min(2, "Please select a state."),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format (e.g., 12345 or 12345-6789)."),
  phoneNumber: z.string().regex(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Invalid phone number format."),

  // Payment Method
  paymentMethod: z.enum(["creditCard", "paypal", "applePay"], {
    required_error: "You need to select a payment method.",
  }),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(), // MM/YY
  cardCVC: z.string().optional(),

  // Agreement
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions to proceed.",
  }),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "creditCard") {
    if (!data.cardName || data.cardName.trim().length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Name on card is required.", path: ["cardName"] });
    }
    if (!data.cardNumber || !/^\d{13,19}$/.test(data.cardNumber.replace(/\s/g, ''))) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid card number is required.", path: ["cardNumber"] });
    }
    if (!data.cardExpiry || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(data.cardExpiry)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid expiry date (MM/YY) is required.", path: ["cardExpiry"] });
    }
    if (!data.cardCVC || !/^\d{3,4}$/.test(data.cardCVC)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid CVC (3 or 4 digits) is required.", path: ["cardCVC"] });
    }
  }
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// Placeholder order data
const orderItems = [
  { id: 'item1', name: 'Signature Dish Alpha', quantity: 1, price: 25.99, image: 'https://via.placeholder.com/60?text=Dish+A' },
  { id: 'item2', name: 'Gourmet Side Beta', quantity: 2, price: 8.50, image: 'https://via.placeholder.com/60?text=Dish+B' },
  { id: 'item3', name: 'Artisan Drink Gamma', quantity: 1, price: 5.00, image: 'https://via.placeholder.com/60?text=Dish+C' },
];
const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const taxRate = 0.07; // 7%
const tax = subtotal * taxRate;
const shippingFee = 4.99;
const total = subtotal + tax + shippingFee;

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: '',
      addressLine1: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
      paymentMethod: 'creditCard',
      agreeToTerms: false,
    },
  });

  const selectedPaymentMethod = form.watch("paymentMethod");

  function onSubmit(data: CheckoutFormValues) {
    console.log('Checkout form submitted:', data);
    toast({
      title: "Order Placed Successfully!",
      description: "We've received your order and are preparing it now.",
      className: "bg-green-600 text-white border-green-700 backdrop-blur-md",
    });
    // Navigate to order tracking page (ensure path matches App.tsx)
    navigate('/order-tracking', { state: { orderId: `ORD-${Date.now()}` } });
  }

  const inputStyles = "bg-white/5 border-white/20 focus:border-pink-500 placeholder:text-gray-400/70 backdrop-blur-sm text-white";
  const selectTriggerStyles = `${inputStyles} data-[placeholder]:text-gray-400/70`;
  const selectContentStyles = "bg-neutral-800/90 text-white border-white/20 backdrop-blur-md";
  const radioItemStyles = "border-white/30 text-pink-500 data-[state=checked]:border-pink-500";
  const checkboxStyles = "border-white/30 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-600";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 text-gray-100">
      <Header />
      <main className="flex-grow pt-24 pb-24 container mx-auto px-4"> {/* Adjusted padding for header/footer */}
        <h1 className="text-4xl font-extrabold text-center my-8 sm:my-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          Secure Checkout
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Delivery Address Card */}
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-pink-400 flex items-center">
                      <MapPin className="mr-3 h-6 w-6" /> Delivery Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} className={inputStyles} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="addressLine1" render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl><Input placeholder="123 Main Street" {...field} className={inputStyles} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="addressLine2" render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Address Line 2 (Optional)</FormLabel>
                        <FormControl><Input placeholder="Apartment, suite, etc." {...field} className={inputStyles} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl><Input placeholder="New York" {...field} className={inputStyles} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="state" render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger className={selectTriggerStyles}><SelectValue placeholder="Select State" /></SelectTrigger></FormControl>
                          <SelectContent className={selectContentStyles}>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="zipCode" render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl><Input placeholder="10001" {...field} className={inputStyles} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl><Input type="tel" placeholder="(555) 123-4567" {...field} className={inputStyles} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </CardContent>
                </Card>

                {/* Payment Method Card */}
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-purple-400 flex items-center">
                      <CreditCard className="mr-3 h-6 w-6" /> Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Select Payment Option</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {["creditCard", "paypal", "applePay"].map((method) => (
                              <FormItem key={method} className="flex items-center space-x-3 space-y-0 p-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors">
                                <FormControl><RadioGroupItem value={method} className={radioItemStyles} /></FormControl>
                                <FormLabel className="font-normal text-gray-200 capitalize cursor-pointer">
                                  {method === 'creditCard' ? 'Credit Card' : method === 'paypal' ? 'PayPal' : 'Apple Pay'}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {selectedPaymentMethod === 'creditCard' && (
                      <div className="space-y-4 pt-4 border-t border-white/10">
                        <FormField control={form.control} name="cardName" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name on Card</FormLabel>
                            <FormControl><Input placeholder="John M Doe" {...field} className={inputStyles} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="cardNumber" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} className={inputStyles} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                          <FormField control={form.control} name="cardExpiry" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date (MM/YY)</FormLabel>
                              <FormControl><Input placeholder="MM/YY" {...field} className={inputStyles} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="cardCVC" render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVC</FormLabel>
                              <FormControl><Input placeholder="•••" {...field} className={inputStyles} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Terms and Conditions */}
                <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-white/10 p-4 bg-white/5 backdrop-blur-sm">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} className={checkboxStyles} /></FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-gray-200 cursor-pointer">
                        I agree to the <Link to="/terms" className="text-pink-400 hover:underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-pink-400 hover:underline">Privacy Policy</Link>.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )} />

                <Button type="submit" size="lg" className="w-full text-lg py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-lg hover:shadow-pink-500/30 transition-all duration-300">
                  <ShieldCheck className="mr-2 h-5 w-5" /> Place Order Securely
                </Button>
              </form>
            </Form>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl text-indigo-400 flex items-center">
                  <ShoppingBag className="mr-3 h-6 w-6" /> Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md mr-3 object-cover"/>
                      <div>
                        <p className="font-medium text-gray-200">{item.name} (x{item.quantity})</p>
                        <p className="text-xs text-gray-400">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-100">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <Separator className="bg-white/10 my-4" />
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-gray-300">Subtotal:</span> <span className="text-gray-100">${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-300">Tax ({(taxRate * 100).toFixed(0)}%):</span> <span className="text-gray-100">${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-300">Shipping:</span> <span className="text-gray-100">${shippingFee.toFixed(2)}</span></div>
                </div>
                <Separator className="bg-white/10 my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-100">Total:</span>
                  <span className="text-pink-400">${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-3">
                 <p className="text-xs text-gray-400 text-center">
                    By placing this order, you agree to our purchase terms.
                 </p>
                <Link to="/cart" className="w-full">
                  <Button variant="outline" className="w-full border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300 backdrop-blur-sm">
                    Back to Cart
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;