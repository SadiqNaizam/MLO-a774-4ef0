import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react'; // Example icon

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string; // Optional image
  onAddToCart: (item: { id: string | number; name: string; price: number }) => void;
  // onCustomize?: (itemId: string | number) => void; // If customization dialog is needed
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
}) => {
  console.log("Rendering MenuItemCard:", name);

  const handleAddToCart = () => {
    console.log("Adding to cart:", { id, name, price });
    onAddToCart({ id, name, price });
    // Potentially trigger toast notification from parent component or here
  };

  return (
    <Card className="w-full flex flex-col md:flex-row overflow-hidden transition-shadow duration-300 hover:shadow-md">
      {imageUrl && (
        <div className="md:w-1/3 aspect-video md:aspect-square flex-shrink-0 bg-gray-100">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </div>
      )}
      <div className="flex flex-col justify-between flex-grow p-4">
        <div>
          <CardTitle className="text-md font-semibold">{name}</CardTitle>
          <CardDescription className="text-sm text-gray-600 mt-1 line-clamp-2">
            {description}
          </CardDescription>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-orange-600">${price.toFixed(2)}</span>
          <Button size="sm" onClick={handleAddToCart} variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MenuItemCard;