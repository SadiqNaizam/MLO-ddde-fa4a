import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Filter, X, RotateCcw } from 'lucide-react';

interface Filters {
  cuisineTypes: string[];
  minRating: number;
  sortBy: string;
}

interface GlassmorphicFilterSidebarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters?: (filters: Filters) => void;
  availableCuisines?: string[];
}

const initialFilters: Filters = {
  cuisineTypes: [],
  minRating: 0,
  sortBy: "popularity",
};

const GlassmorphicFilterSidebar: React.FC<GlassmorphicFilterSidebarProps> = ({
  isOpen,
  onOpenChange,
  onApplyFilters,
  availableCuisines = ["Italian", "Mexican", "Chinese", "Indian", "Japanese", "French", "Thai"],
}) => {
  const [currentFilters, setCurrentFilters] = useState<Filters>(initialFilters);

  useEffect(() => {
    console.log('GlassmorphicFilterSidebar loaded or props changed.');
  }, [isOpen]); // Log when isOpen changes, indicating visibility change

  const handleCuisineChange = (cuisine: string) => {
    setCurrentFilters((prev) => {
      const newCuisineTypes = prev.cuisineTypes.includes(cuisine)
        ? prev.cuisineTypes.filter((c) => c !== cuisine)
        : [...prev.cuisineTypes, cuisine];
      return { ...prev, cuisineTypes: newCuisineTypes };
    });
  };

  const handleRatingChange = (value: number[]) => {
    setCurrentFilters((prev) => ({ ...prev, minRating: value[0] }));
  };

  const handleSortByChange = (value: string) => {
    setCurrentFilters((prev) => ({ ...prev, sortBy: value }));
  };

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters(currentFilters);
    }
    onOpenChange(false); // Close sidebar on apply
    console.log("Filters applied:", currentFilters);
  };

  const handleClearFilters = () => {
    setCurrentFilters(initialFilters);
    console.log("Filters cleared.");
    // Optionally, call onApplyFilters with cleared state if live update is desired
    // if (onApplyFilters) {
    //   onApplyFilters(initialFilters);
    // }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        className="w-full max-w-sm sm:max-w-md p-0 bg-gray-800/70 dark:bg-black/70 text-white backdrop-blur-xl border-l border-gray-700/50 dark:border-gray-300/20 flex flex-col"
        side="right"
      >
        <SheetHeader className="p-6 border-b border-gray-700/50 dark:border-gray-300/20">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-2xl font-semibold text-white flex items-center">
              <Filter className="mr-2 h-6 w-6" />
              Filters
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </div>
          <SheetDescription className="text-gray-300 dark:text-gray-400 mt-1">
            Refine your search to find the perfect meal.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-grow p-6">
          <div className="space-y-8">
            {/* Cuisine Type Filter */}
            <div>
              <Label className="text-lg font-medium text-white mb-3 block">Cuisine Type</Label>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {availableCuisines.map((cuisine) => (
                  <div key={cuisine} className="flex items-center space-x-2 p-2 rounded-md hover:bg-white/5 transition-colors">
                    <Checkbox
                      id={`cuisine-${cuisine}`}
                      checked={currentFilters.cuisineTypes.includes(cuisine)}
                      onCheckedChange={() => handleCuisineChange(cuisine)}
                      className="border-gray-400 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                    />
                    <Label htmlFor={`cuisine-${cuisine}`} className="text-sm font-normal text-gray-200 cursor-pointer">
                      {cuisine}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-gray-700/50 dark:bg-gray-300/20" />

            {/* Minimum Rating Filter */}
            <div>
              <Label htmlFor="rating-slider" className="text-lg font-medium text-white mb-3 block">
                Minimum Rating: {currentFilters.minRating} ★
              </Label>
              <Slider
                id="rating-slider"
                min={0}
                max={5}
                step={0.5}
                defaultValue={[currentFilters.minRating]}
                onValueChange={handleRatingChange}
                className="[&>span:first-child]:h-1 [&>span:first-child_span]:bg-pink-500"
                // Custom styling for thumb might be needed if shadcn doesn't fully support color via props
              />
            </div>

            <Separator className="bg-gray-700/50 dark:bg-gray-300/20" />

            {/* Sort By Filter */}
            <div>
              <Label className="text-lg font-medium text-white mb-3 block">Sort By</Label>
              <RadioGroup
                defaultValue={currentFilters.sortBy}
                onValueChange={handleSortByChange}
                className="space-y-2"
              >
                {[
                  { value: "popularity", label: "Popularity" },
                  { value: "delivery_time", label: "Delivery Time" },
                  { value: "rating", label: "Rating (High to Low)" },
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 p-2 rounded-md hover:bg-white/5 transition-colors">
                    <RadioGroupItem value={option.value} id={`sort-${option.value}`} className="border-gray-400 text-pink-500 data-[state=checked]:border-pink-500" />
                    <Label htmlFor={`sort-${option.value}`} className="text-sm font-normal text-gray-200 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="p-6 border-t border-gray-700/50 dark:border-gray-300/20 bg-gray-800/80 dark:bg-black/80 backdrop-blur-sm">
          <div className="flex w-full gap-3">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex-1 border-pink-500 text-pink-500 hover:bg-pink-500/10 hover:text-pink-400"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
            >
              Apply Filters
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default GlassmorphicFilterSidebar;