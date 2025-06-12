import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItemCard from '@/components/MenuItemCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Clock } from 'lucide-react';

const menuData = {
  restaurantName: "Aura Dine",
  restaurantSlogan: "Culinary artistry with a touch of magic.",
  restaurantLogo: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdGF1cmFudCUyMGxvZ298ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=80", // Placeholder logo
  categories: [
    {
      name: "Starters",
      slug: "starters",
      items: [
        { id: "star1", slug: "crystal-shrimp-dumplings", name: "Crystal Shrimp Dumplings", description: "Delicate steamed dumplings with succulent shrimp, served with a ginger-soy dip.", price: 16, imageUrl: "https://images.unsplash.com/photo-1563245372-f7993a100982?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hyaW1wJTIwZHVtcGxpbmdzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" },
        { id: "star2", slug: "whipped-feta-dip", name: "Whipped Feta & Honey Dip", description: "Creamy whipped feta cheese topped with toasted pistachios and a drizzle of hot honey, served with pita.", price: 14, imageUrl: "https://images.unsplash.com/photo-1619450528809-9a4069a3f744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmV0YSUyMGRpcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
      ]
    },
    {
      name: "Main Courses",
      slug: "main-courses",
      items: [
        { id: "main1", slug: "pan-seared-salmon", name: "Pan-Seared Salmon", description: "Crispy skin salmon fillet with a lemon-dill sauce, served over asparagus and quinoa.", price: 32, imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VhmVkJTIwc2FsbW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" },
        { id: "main2", slug: "wagyu-beef-burger", name: "Wagyu Beef Burger", description: "Premium Wagyu patty, truffle aioli, aged cheddar, caramelized onions on a brioche bun.", price: 28, imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
        { id: "main3", slug: "mushroom-risotto", name: "Wild Mushroom Risotto", description: "Creamy Arborio risotto with a medley of wild mushrooms, parmesan, and fresh herbs.", price: 26, imageUrl: "https://images.unsplash.com/photo-1598214886806-21751b1d03f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bXVzaHJvb20lMjByaXNvdHRvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" },
      ]
    },
    {
      name: "Desserts",
      slug: "desserts",
      items: [
        { id: "des1", slug: "lava-cake", name: "Molten Chocolate Lava Cake", description: "Warm chocolate cake with a gooey molten center, served with vanilla bean ice cream.", price: 15, imageUrl: "https://images.unsplash.com/photo-1586985289900-2001600cea6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGF2YSUyMGNha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
      ]
    },
     {
      name: "Drinks",
      slug: "drinks",
      items: [
        { id: "dri1", slug: "passionfruit-mojito", name: "Passionfruit Mojito", description: "Refreshing mix of rum, mint, lime, soda, and passionfruit puree.", price: 14, imageUrl: "https://images.unsplash.com/photo-1551538850-783d539f303c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9qaXRvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" },
      ]
    }
  ]
};

const RestaurantMenuPage: React.FC = () => {
  console.log('RestaurantMenuPage loaded');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-neutral-900 to-black text-white flex flex-col">
      <Header />
      <ScrollArea className="flex-grow pt-20 pb-20"> {/* Adjusted padding for Header (h-16 + extra) and Footer (h-16 + extra) */}
        <main className="container mx-auto px-4 py-8">
          {/* Restaurant Info Section */}
          <section className="mb-10 flex flex-col sm:flex-row items-center text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-6 p-6 bg-black/40 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl">
            <Avatar className="h-24 w-24 sm:h-28 sm:w-28 border-2 border-pink-500/60 shadow-lg">
              <AvatarImage src={menuData.restaurantLogo} alt={menuData.restaurantName} />
              <AvatarFallback className="text-pink-400 bg-black/50">{menuData.restaurantName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 tracking-tight">
                {menuData.restaurantName}
              </h1>
              <Label className="block text-md sm:text-lg text-gray-300 mt-1">{menuData.restaurantSlogan}</Label>
              <div className="text-xs sm:text-sm text-gray-400 mt-2 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start space-y-1 sm:space-y-0 sm:space-x-3">
                <span className="flex items-center justify-center sm:justify-start">
                  <MapPin className="inline h-4 w-4 mr-1.5 text-gray-500" /> 23 Galaxy Avenue, Foodiverse
                </span>
                <span className="hidden sm:inline">|</span>
                <span className="flex items-center justify-center sm:justify-start">
                  <Clock className="inline h-4 w-4 mr-1.5 text-gray-500" /> Open: 10:00 AM - 11:00 PM
                </span>
              </div>
            </div>
          </section>

          {/* Menu Tabs Section */}
          <Tabs defaultValue={menuData.categories[0]?.slug || 'starters'} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 mb-8 bg-black/50 backdrop-blur-md border border-white/10 p-1.5 rounded-xl shadow-lg">
              {menuData.categories.map((category) => (
                <TabsTrigger
                  key={category.slug}
                  value={category.slug}
                  className="text-gray-300 data-[state=active]:bg-white/10 data-[state=active]:text-pink-400 data-[state=active]:shadow-md rounded-lg py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-200 ease-in-out focus-visible:ring-pink-500 focus-visible:ring-offset-black/50"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {menuData.categories.map((category) => (
              <TabsContent key={category.slug} value={category.slug}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.items.length > 0 ? (
                    category.items.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        id={item.id}
                        slug={item.slug}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        imageUrl={item.imageUrl}
                      />
                    ))
                  ) : (
                    <p className="text-gray-400 col-span-full text-center py-10">No items in this category yet.</p>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </ScrollArea>
      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;