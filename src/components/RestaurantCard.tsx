import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from 'lucide-react'; // Example icons

interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  rating: number; // e.g., 4.5
  reviewCount?: number;
  deliveryTime: string; // e.g., "25-35 min"
  cuisineTypes: string[]; // e.g., ["Italian", "Pizza"]
  onClick?: (id: string | number) => void;
  // Add promo/offer text if needed
  offer?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  rating,
  reviewCount,
  deliveryTime,
  cuisineTypes,
  onClick,
  offer
}) => {
  console.log("Rendering RestaurantCard:", name);

  const handleCardClick = () => {
    if (onClick) {
      console.log("RestaurantCard clicked:", id);
      onClick(id);
    }
  };

  return (
    <Card
      className={`w-full overflow-hidden transition-all duration-300 hover:shadow-xl ${onClick ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      <CardHeader className="p-0 relative">
        <div className="aspect-[16/9] bg-gray-200">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </div>
        {offer && (
            <Badge variant="destructive" className="absolute top-2 left-2">{offer}</Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-lg font-semibold truncate">{name}</CardTitle>
        <div className="flex items-center text-sm text-gray-600 space-x-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
            <span>{rating.toFixed(1)}</span>
            {reviewCount && <span className="ml-1">({reviewCount})</span>}
          </div>
          <span>•</span>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{deliveryTime}</span>
          </div>
        </div>
        {cuisineTypes && cuisineTypes.length > 0 && (
          <CardDescription className="text-xs line-clamp-1">
            {cuisineTypes.join(', ')}
          </CardDescription>
        )}
      </CardContent>
      {/* CardFooter can be used for action buttons if needed, e.g. quick view */}
    </Card>
  );
};

export default RestaurantCard;