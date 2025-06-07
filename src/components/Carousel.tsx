import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card"; // Example usage of shadcn Card

interface CarouselSlide {
  id: string | number;
  content: React.ReactNode; // Can be an image, text, or a custom component
  altText?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoplayDelay?: number;
}

const Carousel: React.FC<CarouselProps> = ({ slides, autoplayDelay = 4000 }) => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
  );

  console.log("Rendering Carousel with slides:", slides.length);

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No slides to display.</div>;
  }

  return (
    <div className="embla overflow-hidden rounded-lg shadow-lg" ref={emblaRef}>
      <div className="embla__container flex">
        {slides.map((slide) => (
          <div className="embla__slide flex-[0_0_100%] min-w-0" key={slide.id}>
            {/* Example: Wrapping slide content in shadcn Card */}
            <Card className="m-1 md:m-2 bg-transparent border-none">
              <CardContent className="flex aspect-[16/7] md:aspect-[16/6] items-center justify-center p-0">
                {typeof slide.content === 'string' && slide.content.startsWith('http') ? (
                    <img src={slide.content} alt={slide.altText || `Slide ${slide.id}`} className="w-full h-full object-cover" />
                ) : (
                    slide.content
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      {/* Optional: Add Prev/Next buttons and Dots here */}
    </div>
  );
};

export default Carousel;