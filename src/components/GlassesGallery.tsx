
import { useState } from "react";

interface GlassesGalleryProps {
  onGlassesSelect: (glassesId: string) => void;
  selectedGlasses: string | null;
}

export const GlassesGallery = ({ onGlassesSelect, selectedGlasses }: GlassesGalleryProps) => {
  // Placeholder glasses data
  const glassesFrames = [
    {
      id: "classic-black",
      name: "Classic Black",
      price: "$129",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop",
      description: "Timeless black frames for everyday wear"
    },
    {
      id: "modern-blue",
      name: "Modern Blue",
      price: "$149",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
      description: "Contemporary blue frames with style"
    },
    {
      id: "vintage-round",
      name: "Vintage Round",
      price: "$159",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop",
      description: "Retro round frames for a classic look"
    },
    {
      id: "sport-wrap",
      name: "Sport Wrap",
      price: "$179",
      image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop",
      description: "Athletic wrap-around design"
    },
    {
      id: "designer-cat",
      name: "Designer Cat-Eye",
      price: "$199",
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=300&fit=crop",
      description: "Elegant cat-eye frames for sophistication"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {glassesFrames.map((frame) => (
          <div
            key={frame.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedGlasses === frame.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }`}
            onClick={() => onGlassesSelect(frame.id)}
          >
            <div className="aspect-video mb-3 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={frame.image}
                alt={frame.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800">{frame.name}</h3>
                <span className="text-blue-600 font-bold">{frame.price}</span>
              </div>
              <p className="text-sm text-gray-600">{frame.description}</p>
            </div>
            
            {selectedGlasses === frame.id && (
              <div className="mt-3 text-center">
                <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  Selected
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-center text-sm text-gray-500">
        Click on any frame to see a preview below
      </div>
    </div>
  );
};
