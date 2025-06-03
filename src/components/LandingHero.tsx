
import { ImageUpload } from "./ImageUpload";

interface LandingHeroProps {
  onImageUpload: (imageUrl: string) => void;
}

export const LandingHero = ({ onImageUpload }: LandingHeroProps) => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Try on Glasses in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              3D
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Upload your photo and see your 3D head model. Browse our suggested eyeglass frames 
            and experience the future of virtual try-on.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <ImageUpload onImageUpload={onImageUpload} />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Photo</h3>
            <p className="text-gray-600">Simply upload a clear photo of your face</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">View in 3D</h3>
            <p className="text-gray-600">See your personalized 3D head model</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Try Frames</h3>
            <p className="text-gray-600">Browse and preview eyeglass frames</p>
          </div>
        </div>
      </div>
    </div>
  );
};
