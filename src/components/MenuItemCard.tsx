import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface MenuItemCardProps {
  id: string;
  slug: string; // Used for navigation state, could be an ID or a friendly slug
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ id, slug, name, description, price, imageUrl }) => {
  console.log('MenuItemCard loaded for:', name);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    // Prevent event bubbling up to the Link component if the button is nested or click overlaps
    e.stopPropagation();
    e.preventDefault();

    toast({
      title: "Added to cart!",
      description: `${name} has been added to your cart.`,
      className: "bg-green-600 text-white border-green-700", // Example custom styling for success
    });
    console.log(`Added product ${id} (${name}) to cart.`);
    // In a real application, you would dispatch an action to update the cart state here.
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-black/20 p-4 shadow-xl backdrop-blur-lg transition-all duration-300 hover:border-white/40 hover:shadow-2xl hover:bg-black/30">
      <Link 
        to="/dish-detail" 
        state={{ itemSlug: slug, itemId: id }} 
        className="block mb-3 flex-grow"
        aria-label={`View details for ${name}`}
      >
        <AspectRatio ratio={16 / 9} className="mb-3 overflow-hidden rounded-lg shadow-md">
          <img
            src={imageUrl || 'https://via.placeholder.com/400x225?text=Exquisite+Dish'}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </AspectRatio>
        <h3 className="mb-1 truncate text-xl font-semibold text-white transition-colors duration-300 group-hover:text-yellow-400">{name}</h3>
        <p className="mb-2 line-clamp-2 text-sm text-gray-300">{description}</p>
      </Link>

      <div className="mt-auto flex items-center justify-between pt-2">
        <p className="text-xl font-bold text-white">${price.toFixed(2)}</p>
        <Button
          onClick={handleAddToCart}
          variant="outline"
          size="sm"
          className="border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/50 active:bg-white/30"
          aria-label={`Add ${name} to cart`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default MenuItemCard;