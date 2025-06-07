import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Input } from '@/components/ui/input';
import Carousel from '@/components/Carousel';
import RestaurantCard from '@/components/RestaurantCard';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, MapPin, Star, Tag } from 'lucide-react';

const HomePage = () => {
  console.log('HomePage/RestaurantDiscoveryPage loaded');

  const carouselSlides = [
    { id: 1, content: 'https://source.unsplash.com/random/1600x900/?food,promotion,banner', altText: 'Promotion 1' },
    { id: 2, content: 'https://source.unsplash.com/random/1600x900/?restaurant,deal,banner', altText: 'Promotion 2' },
    { id: 3, content: 'https://source.unsplash.com/random/1600x900/?cuisine,offer,banner', altText: 'Promotion 3' },
  ];

  const sampleRestaurants = [
    { id: 'r1', name: 'The Gourmet Place', imageUrl: 'https://source.unsplash.com/random/400x300/?restaurant,food', rating: 4.5, reviewCount: 150, deliveryTime: '25-35 min', cuisineTypes: ['Italian', 'Pizza'], offer: '20% OFF' },
    { id: 'r2', name: 'Burger Hub', imageUrl: 'https://source.unsplash.com/random/400x300/?burger,restaurant', rating: 4.2, reviewCount: 200, deliveryTime: '20-30 min', cuisineTypes: ['Burgers', 'Fast Food'] },
    { id: 'r3', name: 'Sushi World', imageUrl: 'https://source.unsplash.com/random/400x300/?sushi,japanese', rating: 4.8, reviewCount: 120, deliveryTime: '30-40 min', cuisineTypes: ['Japanese', 'Sushi'] },
    { id: 'r4', name: 'Curry House', imageUrl: 'https://source.unsplash.com/random/400x300/?curry,indian', rating: 4.3, reviewCount: 90, deliveryTime: '35-45 min', cuisineTypes: ['Indian', 'Spicy'], offer: 'Free Delivery' },
  ];

  const handleRestaurantClick = (id: string | number) => {
    console.log(`Navigate to restaurant ${id}`);
    // In a real app, navigate using react-router-dom, e.g., navigate(`/restaurant/${id}`)
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu cartItemCount={2} isLoggedIn={false} onSearchSubmit={(term) => console.log('Search:', term)} />
      
      <main className="flex-grow">
        {/* Hero/Search Section */}
        <section className="py-8 px-4 md:px-8 bg-white shadow-sm">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Find your next favorite meal</h1>
            <p className="text-gray-600 mb-6">Search for restaurants, cuisines, or dishes near you.</p>
            <div className="max-w-2xl mx-auto relative">
              <Input 
                type="search" 
                placeholder="Enter restaurant, cuisine, or dish..." 
                className="w-full p-4 pr-12 text-lg rounded-lg shadow-md"
              />
              <Button size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10">
                <Search className="h-6 w-6 text-gray-500" />
              </Button>
            </div>
          </div>
        </section>

        {/* Carousel for Promotions */}
        {carouselSlides.length > 0 && (
          <section className="py-8 px-4 md:px-8">
            <div className="container mx-auto">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Special Offers</h2>
              <Carousel slides={carouselSlides} autoplayDelay={5000} />
            </div>
          </section>
        )}

        {/* Restaurant Listings Sections */}
        <ScrollArea className="flex-grow">
          <div className="container mx-auto px-4 md:px-8 py-8 space-y-12">
            {/* Featured Restaurants */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-700 flex items-center"><Star className="mr-2 h-6 w-6 text-yellow-500" />Featured Restaurants</h2>
                <Button variant="link" className="text-orange-500">View All</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sampleRestaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} {...restaurant} onClick={handleRestaurantClick} />
                ))}
              </div>
            </section>

            {/* Nearby Restaurants */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-700 flex items-center"><MapPin className="mr-2 h-6 w-6 text-blue-500" />Nearby You</h2>
                <Button variant="link" className="text-orange-500">Change Location</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Slice or use different data for variety */}
                {sampleRestaurants.slice(0,2).map(restaurant => (
                  <RestaurantCard key={restaurant.id} {...restaurant} onClick={handleRestaurantClick} />
                ))}
                 <RestaurantCard id='r5' name='Pizza Place' imageUrl='https://source.unsplash.com/random/400x300/?pizza,food' rating={4.0} reviewCount={80} deliveryTime='20-25 min' cuisineTypes={['Pizza', 'Italian']} onClick={handleRestaurantClick} />
                 <RestaurantCard id='r6' name='Salad Bar' imageUrl='https://source.unsplash.com/random/400x300/?salad,healthy' rating={4.7} reviewCount={65} deliveryTime='15-20 min' cuisineTypes={['Healthy', 'Salads']} onClick={handleRestaurantClick} offer="10% Student Discount" />

              </div>
            </section>
            
            {/* Browse by Cuisine - Example */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center"><Tag className="mr-2 h-6 w-6 text-green-500" />Browse by Cuisine</h2>
              <div className="flex flex-wrap gap-3">
                {['Italian', 'Chinese', 'Mexican', 'Indian', 'Thai', 'Burgers', 'Vegan'].map(cuisine => (
                  <Button key={cuisine} variant="outline" size="lg" className="bg-white hover:bg-orange-50 hover:border-orange-500">
                    {cuisine}
                  </Button>
                ))}
              </div>
            </section>
          </div>
        </ScrollArea>
      </main>

      {/* Footer placeholder */}
      <footer className="bg-gray-800 text-white text-center p-6 mt-auto">
        <p>&copy; {new Date().getFullYear()} FoodDash. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;