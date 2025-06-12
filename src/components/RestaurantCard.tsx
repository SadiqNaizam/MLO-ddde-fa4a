import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface RestaurantCardProps {
  id: string;
  slug: string; // For potential future dynamic routing, e.g., /restaurant-menu/:slug
  imageUrl: string;
  name: string;
  cuisineType: string;
  rating: number; // e.g., 4.5
  deliveryTime: string; // e.g., "25-35 min"
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  slug,
  imageUrl,
  name,
  cuisineType,
  rating,
  deliveryTime,
}) => {
  console.log(`RestaurantCard loaded for: ${name} (ID: ${id}, Slug: ${slug})`);

  return (
    <Link to="/restaurant-menu" aria-label={`View menu for ${name}`} className="block group">
      <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 ease-out group-hover:shadow-2xl transform group-hover:scale-105">
        {/* Background with glassmorphic effect */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="w-full">
            <AspectRatio ratio={16 / 9}>
              <img
                src={imageUrl || 'https://via.placeholder.com/400x225?text=Restaurant+Image'}
                alt={name}
                className="object-cover w-full h-full rounded-t-2xl transition-opacity duration-300 group-hover:opacity-90"
              />
            </AspectRatio>
          </div>

          <div className="p-5 text-white flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold truncate mb-1">{name}</h3>
              <p className="text-sm text-gray-200 mb-3 capitalize">{cuisineType}</p>
            </div>

            <div className="flex items-center justify-between text-sm mt-auto pt-3 border-t border-white/20">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1.5" fill="currentColor" />
                <span className="font-medium">{rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-300 mr-1.5" />
                <span className="font-medium">{deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;