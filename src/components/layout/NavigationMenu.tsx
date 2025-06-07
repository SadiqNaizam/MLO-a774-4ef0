import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // For search within nav
import { ShoppingCart, User, Search, Utensils } from 'lucide-react'; // Example icons

interface NavigationMenuProps {
  // Props can be added for user state, cart item count, etc.
  cartItemCount?: number;
  isLoggedIn?: boolean;
  onSearchSubmit?: (searchTerm: string) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ cartItemCount = 0, isLoggedIn = false, onSearchSubmit }) => {
  console.log("Rendering NavigationMenu");
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit && searchTerm.trim()) {
        console.log("Search submitted:", searchTerm);
        onSearchSubmit(searchTerm.trim());
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center text-2xl font-bold text-orange-500">
          <Utensils className="mr-2 h-7 w-7" />
          FoodDash
        </Link>

        {/* Optional Search Bar in Nav */}
        {onSearchSubmit && (
          <form onSubmit={handleSearch} className="hidden md:flex items-center relative w-full max-w-md mx-4">
            <Input
              type="search"
              placeholder="Search restaurants or cuisines..."
              className="pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        )}

        <div className="flex items-center space-x-3">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to={isLoggedIn ? "/account" : "/login"}>
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6" />
            </Button>
          </Link>
           {/* Could add a mobile menu toggle here */}
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;