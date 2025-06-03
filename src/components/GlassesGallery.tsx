
import { useState } from "react";

interface GlassesGalleryProps {
  onGlassesSelect: (glassesId: string) => void;
  selectedGlasses: string | null;
}

export const GlassesGallery = ({ onGlassesSelect, selectedGlasses }: GlassesGalleryProps) => {
  // Updated glasses frames data with MAD pricing and seller enterprise names
  const glassesFrames = [
    {
      id: "classic-black",
      name: "Monture Classique Noire",
      price: "Prix: 250 MAD",
      seller: "Optique Atlas",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop",
      description: "Montures noires intemporelles pour un usage quotidien"
    },
    {
      id: "modern-blue",
      name: "Monture Moderne Bleue",
      price: "Prix: 320 MAD",
      seller: "Vision Maroc",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
      description: "Montures bleues contemporaines avec style"
    },
    {
      id: "vintage-round",
      name: "Monture Ronde Vintage",
      price: "Prix: 380 MAD",
      seller: "Lunettes du Royaume",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop",
      description: "Montures rondes rétro pour un look classique"
    },
    {
      id: "sport-wrap",
      name: "Monture Sport Enveloppante",
      price: "Prix: 420 MAD",
      seller: "Sport Vision",
      image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop",
      description: "Montures enveloppantes pour activités sportives"
    },
    {
      id: "designer-cat",
      name: "Monture Cat-Eye Design",
      price: "Prix: 480 MAD",
      seller: "Élégance Optique",
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=300&fit=crop",
      description: "Montures cat-eye élégantes pour la sophistication"
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
              <p className="text-xs text-gray-500 font-medium">{frame.seller}</p>
            </div>
            
            {selectedGlasses === frame.id && (
              <div className="mt-3 text-center">
                <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  Sélectionné
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-center text-sm text-gray-500">
        Cliquez sur une monture pour voir un aperçu ci-dessous
      </div>
    </div>
  );
};
