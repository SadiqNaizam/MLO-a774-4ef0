import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuItemCard from '@/components/MenuItemCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, Clock, MapPin, ShoppingBag, X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  customizationOptions?: {
    title: string;
    type: 'radio' | 'checkbox';
    options: { id: string; label: string; priceChange?: number }[];
  }[];
}

const RestaurantMenuPage = () => {
  console.log('RestaurantMenuPage loaded');
  
  const [isCustomizationDialogOpen, setIsCustomizationDialogOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [customizationState, setCustomizationState] = useState<Record<string, string | string[]>>({});


  const restaurantDetails = {
    name: "Luigi's Pizzeria",
    logoUrl: 'https://source.unsplash.com/random/100x100/?pizza,logo',
    rating: 4.7,
    reviewCount: 230,
    address: '123 Pizza Lane, Food City',
    deliveryTime: '25-35 min',
    openingHours: '11:00 AM - 10:00 PM',
    categories: ['Appetizers', 'Pizzas', 'Pastas', 'Desserts', 'Drinks'],
  };

  const menuItems: MenuItem[] = [
    { id: 'm1', name: 'Margherita Pizza', description: 'Classic delight with 100% real mozzarella cheese', price: 12.99, imageUrl: 'https://source.unsplash.com/random/300x200/?margherita,pizza', category: 'Pizzas', customizationOptions: [
      { title: "Crust", type: 'radio', options: [{id: 'thin', label: 'Thin Crust'}, {id: 'thick', label: 'Thick Crust', priceChange: 1.50}] },
      { title: "Extra Toppings", type: 'checkbox', options: [{id: 'cheese', label: 'Extra Cheese', priceChange: 2.00}, {id: 'olives', label: 'Olives', priceChange: 1.00}] }
    ]},
    { id: 'm2', name: 'Pepperoni Pizza', description: 'A meat lover’s delight with spicy pepperoni', price: 14.99, imageUrl: 'https://source.unsplash.com/random/300x200/?pepperoni,pizza', category: 'Pizzas' },
    { id: 'm3', name: 'Garlic Bread', description: 'Warm and toasty garlic bread sticks.', price: 5.99, imageUrl: 'https://source.unsplash.com/random/300x200/?garlic,bread', category: 'Appetizers' },
    { id: 'm4', name: 'Spaghetti Carbonara', description: 'Creamy pasta with bacon and parmesan.', price: 13.50, imageUrl: 'https://source.unsplash.com/random/300x200/?pasta,carbonara', category: 'Pastas' },
    { id: 'm5', name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert.', price: 7.00, imageUrl: 'https://source.unsplash.com/random/300x200/?tiramisu,dessert', category: 'Desserts' },
    { id: 'm6', name: 'Coke', description: 'Chilled Coca-Cola.', price: 2.50, category: 'Drinks' },
  ];

  const handleAddToCart = (item: { id: string | number; name: string; price: number }) => {
    // Check if item has customization options
    const fullItem = menuItems.find(mi => mi.id === item.id);
    if (fullItem?.customizationOptions && fullItem.customizationOptions.length > 0) {
      setSelectedMenuItem(fullItem);
      // Reset customization state for the new item
      const initialCustomizations: Record<string, string | string[]> = {};
      fullItem.customizationOptions.forEach(optGroup => {
        if (optGroup.type === 'radio' && optGroup.options.length > 0) {
            initialCustomizations[optGroup.title] = optGroup.options[0].id; // Default to first radio option
        } else if (optGroup.type === 'checkbox') {
            initialCustomizations[optGroup.title] = [];
        }
      });
      setCustomizationState(initialCustomizations);
      setIsCustomizationDialogOpen(true);
    } else {
      console.log('Adding to cart (no customization):', item);
      // Add to cart logic, perhaps show a toast
    }
  };

  const handleCustomizationChange = (groupTitle: string, optionId: string, type: 'radio' | 'checkbox') => {
    setCustomizationState(prev => {
      if (type === 'radio') {
        return { ...prev, [groupTitle]: optionId };
      } else { // checkbox
        const currentSelection = (prev[groupTitle] as string[]) || [];
        if (currentSelection.includes(optionId)) {
          return { ...prev, [groupTitle]: currentSelection.filter(id => id !== optionId) };
        } else {
          return { ...prev, [groupTitle]: [...currentSelection, optionId] };
        }
      }
    });
  };

  const handleConfirmCustomization = () => {
    if (!selectedMenuItem) return;
    console.log('Adding customized item to cart:', selectedMenuItem.name, 'with options:', customizationState);
    // Calculate price with customizations
    // Add to cart logic
    setIsCustomizationDialogOpen(false);
    setSelectedMenuItem(null);
    setCustomizationState({});
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu cartItemCount={3} isLoggedIn={true} />
      
      <ScrollArea className="flex-grow">
        <header className="bg-white shadow-sm p-6">
          <div className="container mx-auto flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-orange-200">
              <AvatarImage src={restaurantDetails.logoUrl} alt={restaurantDetails.name} />
              <AvatarFallback>{restaurantDetails.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{restaurantDetails.name}</h1>
              <div className="flex items-center text-gray-600 mt-2 space-x-3">
                <span className="flex items-center"><Star className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor"/> {restaurantDetails.rating} ({restaurantDetails.reviewCount} reviews)</span>
                <span className="flex items-center"><Clock className="h-5 w-5 mr-1"/> {restaurantDetails.deliveryTime}</span>
              </div>
              <p className="text-gray-500 text-sm mt-1 flex items-center"><MapPin className="h-4 w-4 mr-1"/>{restaurantDetails.address}</p>
              <p className="text-gray-500 text-sm">Open: {restaurantDetails.openingHours}</p>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue={restaurantDetails.categories[0]} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
              {restaurantDetails.categories.map(category => (
                <TabsTrigger key={category} value={category} className="py-3">{category}</TabsTrigger>
              ))}
            </TabsList>

            {restaurantDetails.categories.map(category => (
              <TabsContent key={category} value={category}>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.filter(item => item.category === category).map(item => (
                    <MenuItemCard 
                      key={item.id} 
                      {...item}
                      onAddToCart={() => handleAddToCart(item)}
                    />
                  ))}
                </div>
                {menuItems.filter(item => item.category === category).length === 0 && (
                    <p className="text-gray-500">No items in this category yet.</p>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </ScrollArea>

      {selectedMenuItem && (
        <Dialog open={isCustomizationDialogOpen} onOpenChange={setIsCustomizationDialogOpen}>
          <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Customize {selectedMenuItem.name}</DialogTitle>
              <DialogDescription>Make changes to your item before adding to cart.</DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] p-1">
                <div className="space-y-4 py-4">
                {selectedMenuItem.customizationOptions?.map(optGroup => (
                    <div key={optGroup.title} className="space-y-2 border-t pt-3">
                    <h4 className="font-medium">{optGroup.title}</h4>
                    {optGroup.type === 'radio' && (
                        <RadioGroup 
                        value={customizationState[optGroup.title] as string}
                        onValueChange={(value) => handleCustomizationChange(optGroup.title, value, 'radio')}
                        >
                        {optGroup.options.map(opt => (
                            <div key={opt.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={opt.id} id={`${optGroup.title}-${opt.id}`} />
                            <Label htmlFor={`${optGroup.title}-${opt.id}`}>{opt.label} {opt.priceChange ? `(+$${opt.priceChange.toFixed(2)})` : ''}</Label>
                            </div>
                        ))}
                        </RadioGroup>
                    )}
                    {optGroup.type === 'checkbox' && (
                        <div className="space-y-2">
                        {optGroup.options.map(opt => (
                            <div key={opt.id} className="flex items-center space-x-2">
                            <Checkbox 
                                id={`${optGroup.title}-${opt.id}`} 
                                checked={(customizationState[optGroup.title] as string[])?.includes(opt.id)}
                                onCheckedChange={() => handleCustomizationChange(optGroup.title, opt.id, 'checkbox')}
                            />
                            <Label htmlFor={`${optGroup.title}-${opt.id}`}>{opt.label} {opt.priceChange ? `(+$${opt.priceChange.toFixed(2)})` : ''}</Label>
                            </div>
                        ))}
                        </div>
                    )}
                    </div>
                ))}
                </div>
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCustomizationDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleConfirmCustomization}><ShoppingBag className="mr-2 h-4 w-4" />Add to Cart</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      <footer className="bg-gray-800 text-white text-center p-6 mt-auto">
        <p>&copy; {new Date().getFullYear()} {restaurantDetails.name}</p>
      </footer>
    </div>
  );
};

export default RestaurantMenuPage;