import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Minus, Plus, ShoppingCart, ArrowLeft, Info, ListOrdered, Utensils } from 'lucide-react';

interface Dish {
  id: string;
  slug?: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  ingredients: string[];
  nutrition: Array<{ label: string; value: string }>;
  customizationOptions?: Array<{
    title: string;
    options: string[]; // Simplified for display
  }>;
  category?: string; // e.g. "Main Course", "Appetizer"
  tags?: string[]; // e.g. "Spicy", "Vegetarian"
}

const placeholderDish: Dish = {
  id: "placeholder-dish-001",
  slug: "gourmet-delight-burger",
  name: "Gourmet Delight Burger",
  description: "A culinary masterpiece featuring a 100% grass-fed beef patty, artisanal brioche bun, smoked gouda, caramelized onions, and our secret house sauce. Served with a side of truffle parmesan fries.",
  price: 18.99,
  images: [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58CD?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1605789538467-f715d58e03f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  ],
  ingredients: ["Grass-fed beef patty", "Brioche bun", "Smoked gouda", "Caramelized onions", "House sauce", "Truffle parmesan fries", "Lettuce", "Tomato"],
  nutrition: [
    { label: "Calories", value: "850 kcal" },
    { label: "Protein", value: "50g" },
    { label: "Fat", value: "55g" },
    { label: "Carbohydrates", value: "40g" },
    { label: "Sodium", value: "900mg" },
  ],
  customizationOptions: [
    { title: "Add Extras", options: ["Extra Cheese (+$1.50)", "Bacon (+$2.00)", "Avocado (+$1.75)"] },
    { title: "Side Choice", options: ["Truffle Fries (default)", "Sweet Potato Fries (+$1.00)", "Side Salad (+$0.50)"] },
    { title: "Spice Level", options: ["Mild", "Medium", "Hot"] }
  ],
  category: "Main Course",
  tags: ["Burger", "Beef", "Gourmet", "Popular"]
};


const DishDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dish, setDish] = useState<Dish>(placeholderDish);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    console.log('DishDetailPage loaded');
    // In a real app, you might fetch dish details based on ID from location.state
    // For this example, if state is passed (e.g. from MenuItemCard), we'd use it.
    // const passedDishData = location.state?.dishData as Dish; // Example
    // if (passedDishData) {
    //   setDish(passedDishData);
    // }
    // For now, we stick to the placeholder or potentially merge with limited passed data.
    if (location.state?.itemId && location.state?.itemSlug) {
        // Simulate loading a specific dish based on passed state, if we had a list of dishes.
        // For now, we'll just log it and use the placeholder.
        console.log(`Attempting to load dish: ID=${location.state.itemId}, Slug=${location.state.itemSlug}`);
        // If you had multiple dishes, you'd find the correct one here.
        // setDish(findDishById(location.state.itemId) || placeholderDish);
    }

  }, [location.state]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} of ${dish.name} (ID: ${dish.id}) to cart. Total: $${(dish.price * quantity).toFixed(2)}`);
    toast.success(`${quantity} x ${dish.name} added to cart!`, {
      description: `Price: $${(dish.price * quantity).toFixed(2)}`,
      // action: {
      //   label: "View Cart",
      //   onClick: () => navigate("/cart"), // Path from App.tsx
      // },
      className: 'bg-green-500 border-green-600 text-white', // Custom Sonner toast style
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 text-white flex flex-col">
      <Header />
      <ScrollArea className="flex-grow pt-20 pb-20"> {/* Adjusted padding for fixed Header/Footer */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Side: Image Carousel */}
              <div className="w-full">
                <Carousel
                  opts={{ loop: true }}
                  className="w-full rounded-xl overflow-hidden shadow-lg border border-white/10"
                >
                  <CarouselContent>
                    {dish.images.length > 0 ? (
                      dish.images.map((src, index) => (
                        <CarouselItem key={index}>
                          <AspectRatio ratio={16 / 9}>
                            <img src={src} alt={`${dish.name} image ${index + 1}`} className="object-cover w-full h-full" />
                          </AspectRatio>
                        </CarouselItem>
                      ))
                    ) : (
                      <CarouselItem>
                        <AspectRatio ratio={16 / 9}>
                          <div className="flex items-center justify-center w-full h-full bg-slate-700">
                            <Utensils className="h-16 w-16 text-slate-500" />
                          </div>
                        </AspectRatio>
                      </CarouselItem>
                    )}
                  </CarouselContent>
                  {dish.images.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70 border-white/30" />
                      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70 border-white/30" />
                    </>
                  )}
                </Carousel>
                {dish.tags && dish.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {dish.tags.map(tag => (
                            <span key={tag} className="text-xs bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                )}
              </div>

              {/* Right Side: Dish Info & Actions */}
              <div className="flex flex-col space-y-6">
                <div>
                  {dish.category && <p className="text-sm text-pink-400 font-medium mb-1 tracking-wider uppercase">{dish.category}</p>}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-2">
                    {dish.name}
                  </h1>
                  <p className="text-2xl sm:text-3xl font-semibold text-pink-400 mb-4">${dish.price.toFixed(2)}</p>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{dish.description}</p>
                </div>

                <Accordion type="multiple" collapsible className="w-full space-y-3">
                  <AccordionItem value="ingredients" className="bg-white/5 border border-white/10 rounded-lg p-1">
                    <AccordionTrigger className="text-md sm:text-lg hover:text-pink-300 px-4 py-3 font-medium">
                        <ListOrdered className="h-5 w-5 mr-3 text-pink-400"/>Ingredients
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-2 text-gray-300">
                      <ul className="list-disc list-inside space-y-1">
                        {dish.ingredients.map((item, idx) => <li key={idx}>{item}</li>)}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="nutrition" className="bg-white/5 border border-white/10 rounded-lg p-1">
                    <AccordionTrigger className="text-md sm:text-lg hover:text-pink-300 px-4 py-3 font-medium">
                        <Info className="h-5 w-5 mr-3 text-pink-400"/>Nutritional Information
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-2 text-gray-300">
                      <ul className="space-y-1">
                        {dish.nutrition.map((item, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>{item.label}:</span>
                            <span>{item.value}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  {dish.customizationOptions && dish.customizationOptions.map((custOpt, idx) => (
                    <AccordionItem key={`cust-${idx}`} value={`customization-${idx}`} className="bg-white/5 border border-white/10 rounded-lg p-1">
                      <AccordionTrigger className="text-md sm:text-lg hover:text-pink-300 px-4 py-3 font-medium">
                        <Utensils className="h-5 w-5 mr-3 text-pink-400"/>{custOpt.title}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-2 text-gray-300">
                        <ul className="list-disc list-inside space-y-1">
                            {custOpt.options.map((opt, optIdx) => <li key={optIdx}>{opt}</li>)}
                        </ul>
                        {/* Add RadioGroup/Checkboxes here for interactive options in a real app */}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="pt-6 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex items-center border border-white/20 rounded-lg">
                            <Button variant="ghost" size="icon" onClick={decrementQuantity} className="text-white hover:bg-white/10 rounded-r-none p-3">
                            <Minus className="h-5 w-5" />
                            </Button>
                            <Input
                            type="text" // Use text to avoid browser default spinner and style manually
                            value={quantity}
                            readOnly
                            className="w-16 h-11 text-center bg-transparent border-y-0 border-x border-white/20 focus-visible:ring-0 focus-visible:ring-offset-0 text-white text-lg font-medium"
                            />
                            <Button variant="ghost" size="icon" onClick={incrementQuantity} className="text-white hover:bg-white/10 rounded-l-none p-3">
                            <Plus className="h-5 w-5" />
                            </Button>
                        </div>
                        <Button
                            size="lg"
                            onClick={handleAddToCart}
                            className="w-full sm:w-auto flex-grow bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 h-11 px-8"
                        >
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Add to Cart ($ {(dish.price * quantity).toFixed(2)})
                        </Button>
                    </div>
                </div>
                
                <div className="mt-6 text-center sm:text-left">
                    <Link 
                        to="/restaurant-menu" // Path from App.tsx
                        className="inline-flex items-center text-sm text-pink-300 hover:text-pink-200 hover:underline transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Menu
                    </Link>
                </div>

              </div>
            </div>
          </div>
        </main>
      </ScrollArea>
      <Footer />
    </div>
  );
};

export default DishDetailPage;