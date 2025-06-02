
import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { ThreeDViewer } from "@/components/ThreeDViewer";
import { GlassesGallery } from "@/components/GlassesGallery";
import { Header } from "@/components/Header";
import { LandingHero } from "@/components/LandingHero";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedGlasses, setSelectedGlasses] = useState<string | null>(null);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
  };

  const handleGlassesSelect = (glassesId: string) => {
    setSelectedGlasses(glassesId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {!uploadedImage ? (
        <LandingHero onImageUpload={handleImageUpload} />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* 3D Viewer Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your 3D Head Model</h2>
              <ThreeDViewer />
              <p className="text-sm text-gray-600 mt-4 text-center">
                Click and drag to rotate • Scroll to zoom
              </p>
            </div>

            {/* Glasses Gallery Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Frames</h2>
              <GlassesGallery 
                onGlassesSelect={handleGlassesSelect}
                selectedGlasses={selectedGlasses}
              />
            </div>
          </div>

          {/* Selected Glasses Preview */}
          {selectedGlasses && (
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Selected Frame Preview</h3>
              <div className="flex justify-center">
                <img 
                  src={`/glasses/${selectedGlasses}`} 
                  alt="Selected glasses" 
                  className="max-w-md rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
