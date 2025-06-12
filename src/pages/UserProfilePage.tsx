import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { User, MapPin, CreditCard, History, Bell, HelpCircle } from 'lucide-react';

const UserProfilePage: React.FC = () => {
  console.log('UserProfilePage loaded');

  const user = {
    name: 'Aisha Khan',
    email: 'aisha.khan@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBob3RvJTIwd29tYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60',
    joinDate: 'Joined on March 22, 2023',
  };

  const addresses = [
    { id: '1', type: 'Home', line1: '123 Silk Road', city: 'Gulberg', zip: '54000', isDefault: true },
    { id: '2', type: 'Work', line1: '456 Tech Park', city: 'Blue Area', zip: '44000', isDefault: false },
  ];

  const paymentMethods = [
    { id: '1', type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: '2', type: 'JazzCash', account: '0300xxxxxxx', isDefault: false },
  ];

  const pastOrders = [
    { id: 'FD10024', date: '2024-07-15', total: 1250.99, status: 'Delivered', items: ['Biryani Feast', 'Mint Raita'] },
    { id: 'FD10018', date: '2024-07-10', total: 850.50, status: 'Delivered', items: ['Karahi Special', 'Naan'] },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add form submission logic here
    console.log("Profile updated (mock)");
    // Potentially use Sonner for a success toast
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 text-white flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-24 px-4 md:px-8 lg:px-16"> {/* Adjusted padding for fixed Header/Footer */}
        <div className="container mx-auto max-w-4xl space-y-8">
          
          {/* Profile Header Section */}
          <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl p-6 rounded-xl">
            <CardHeader className="flex flex-col sm:flex-row items-center gap-6 p-0 mb-6">
              <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border-4 border-pink-500 shadow-lg">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-pink-400 text-white text-3xl">{user.name.substring(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">{user.name}</h1>
                <p className="text-gray-300">{user.email}</p>
                <p className="text-sm text-gray-400">{user.joinDate}</p>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <h2 className="text-xl font-semibold mb-4 text-pink-400 flex items-center">
                <User className="mr-2 h-5 w-5"/> Edit Profile Information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                  <Input id="name" type="text" defaultValue={user.name} className="mt-1 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 rounded-md" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user.email} className="mt-1 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 rounded-md" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+92 3XX XXXXXXX" className="mt-1 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 rounded-md" />
                </div>
                <Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md shadow-md transition-all duration-300 hover:shadow-lg">Save Changes</Button>
              </form>
            </CardContent>
          </Card>

          {/* Accordion for other sections */}
          <Accordion type="multiple" collapsible className="w-full space-y-4">
            {/* Saved Addresses */}
            <AccordionItem value="addresses" className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-xl overflow-hidden">
              <AccordionTrigger className="hover:no-underline px-6 py-4 text-lg font-medium text-pink-400 data-[state=open]:bg-white/5 [&[data-state=open]>svg]:text-pink-400">
                <div className="flex items-center"><MapPin className="mr-3 h-5 w-5" /> Saved Addresses</div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2 text-gray-300 bg-black/10">
                {addresses.map(addr => (
                  <div key={addr.id} className="mb-3 p-3 border-b border-white/10 last:border-b-0">
                    <p className="font-semibold">{addr.type} {addr.isDefault && <Badge variant="secondary" className="ml-2 bg-pink-500/30 text-pink-300 border-pink-500/40">Default</Badge>}</p>
                    <p>{addr.line1}, {addr.city}, {addr.zip}</p>
                    <Button variant="link" className="text-pink-400 p-0 h-auto hover:text-pink-300 mt-1">Edit</Button>
                  </div>
                ))}
                <Button variant="outline" className="mt-4 border-pink-500 text-pink-500 hover:bg-pink-500/10 hover:text-pink-400 rounded-md">
                  Add New Address
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Payment Methods */}
            <AccordionItem value="payment" className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-xl overflow-hidden">
              <AccordionTrigger className="hover:no-underline px-6 py-4 text-lg font-medium text-pink-400 data-[state=open]:bg-white/5 [&[data-state=open]>svg]:text-pink-400">
                 <div className="flex items-center"><CreditCard className="mr-3 h-5 w-5" /> Payment Methods</div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2 text-gray-300 bg-black/10">
                {paymentMethods.map(pm => (
                  <div key={pm.id} className="mb-3 p-3 border-b border-white/10 last:border-b-0">
                    <p className="font-semibold">
                      {pm.type} {pm.last4 ? `ending in ${pm.last4}` : pm.account} 
                      {pm.isDefault && <Badge variant="secondary" className="ml-2 bg-pink-500/30 text-pink-300 border-pink-500/40">Default</Badge>}
                    </p>
                    {pm.expiry && <p>Expires: {pm.expiry}</p>}
                     <Button variant="link" className="text-pink-400 p-0 h-auto hover:text-pink-300 mt-1">Edit / Remove</Button>
                  </div>
                ))}
                <Button variant="outline" className="mt-4 border-pink-500 text-pink-500 hover:bg-pink-500/10 hover:text-pink-400 rounded-md">
                  Add New Payment Method
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Order History */}
            <AccordionItem value="orders" className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-xl overflow-hidden">
              <AccordionTrigger className="hover:no-underline px-6 py-4 text-lg font-medium text-pink-400 data-[state=open]:bg-white/5 [&[data-state=open]>svg]:text-pink-400">
                 <div className="flex items-center"><History className="mr-3 h-5 w-5" /> Order History</div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2 text-gray-300 bg-black/10">
                {pastOrders.length > 0 ? pastOrders.map(order => (
                  <div key={order.id} className="mb-3 p-3 border-b border-white/10 last:border-b-0">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">Order #{order.id} - {order.date}</p>
                      <Badge className={order.status === 'Delivered' ? 'bg-green-600/80 text-white' : 'bg-yellow-500/80 text-black'}>{order.status}</Badge>
                    </div>
                    <p className="text-sm">Total: Rs. {order.total.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">Items: {order.items.join(', ')}</p>
                    <Link to={`/order-tracking?orderId=${order.id}`} className="text-pink-400 hover:text-pink-300 text-sm mt-1 inline-block">
                      Track Order / View Details
                    </Link>
                  </div>
                )) : <p>No past orders found.</p>}
              </AccordionContent>
            </AccordionItem>

            {/* Notification Preferences */}
            <AccordionItem value="notifications" className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-xl overflow-hidden">
              <AccordionTrigger className="hover:no-underline px-6 py-4 text-lg font-medium text-pink-400 data-[state=open]:bg-white/5 [&[data-state=open]>svg]:text-pink-400">
                 <div className="flex items-center"><Bell className="mr-3 h-5 w-5" /> Notification Preferences</div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2 text-gray-300 space-y-4 bg-black/10">
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-white/5">
                  <Label htmlFor="promo-notifications" className="flex-grow cursor-pointer">Promotional Emails & Offers</Label>
                  <Switch id="promo-notifications" className="data-[state=checked]:bg-pink-500" />
                </div>
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-white/5">
                  <Label htmlFor="order-updates" className="flex-grow cursor-pointer">Order Status Updates (App Push)</Label>
                  <Switch id="order-updates" defaultChecked className="data-[state=checked]:bg-pink-500" />
                </div>
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-white/5">
                  <Label htmlFor="sms-updates" className="flex-grow cursor-pointer">SMS Notifications for Orders</Label>
                  <Switch id="sms-updates" className="data-[state=checked]:bg-pink-500" />
                </div>
                <Button variant="outline" className="mt-2 border-pink-500 text-pink-500 hover:bg-pink-500/10 hover:text-pink-400 rounded-md">
                  Save Preferences
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Help & Support */}
            <AccordionItem value="help" className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-xl overflow-hidden">
              <AccordionTrigger className="hover:no-underline px-6 py-4 text-lg font-medium text-pink-400 data-[state=open]:bg-white/5 [&[data-state=open]>svg]:text-pink-400">
                 <div className="flex items-center"><HelpCircle className="mr-3 h-5 w-5" /> Help & Support</div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2 text-gray-300 space-y-2 bg-black/10">
                <p>If you need help with your account or orders, please visit our FAQ section or contact support.</p>
                {/* Using hash links as /faq and /contact-support routes are not in App.tsx */}
                <a href="#faq" className="text-pink-400 hover:text-pink-300 block">View FAQ</a>
                <a href="#contact-support" className="text-pink-400 hover:text-pink-300 block">Contact Support</a>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;