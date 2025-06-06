
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const PhotoSlideshow = () => {
  // Fotos de exemplo - você pode substituir por suas fotos reais
  const photos = [
    {
      src: "/placeholder.svg",
      caption: "Nosso primeiro encontro 💕"
    },
    {
      src: "/placeholder.svg", 
      caption: "Momentos especiais juntos 🥰"
    },
    {
      src: "/placeholder.svg",
      caption: "Sempre sorrindo ao seu lado 😊"
    },
    {
      src: "/placeholder.svg",
      caption: "Aventuras que vivemos 🌟"
    }
  ];

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [photos.length]);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-4">
        <Camera size={24} className="text-romantic-rose" />
        <h2 className="dancing-text text-3xl text-romantic-deep">
          Nossas Memórias
        </h2>
      </div>

      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white/50">
        <div className="relative w-full h-full">
          <img
            src={photos[currentPhotoIndex].src}
            alt={photos[currentPhotoIndex].caption}
            className="w-full h-full object-cover transition-all duration-500"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          
          {/* Caption */}
          <div className="absolute bottom-4 left-4 right-4">
            <p className="dancing-text text-white text-xl font-bold text-center drop-shadow-lg">
              {photos[currentPhotoIndex].caption}
            </p>
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevPhoto}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 
                   bg-white/80 backdrop-blur-sm p-2 rounded-full 
                   shadow-lg hover:bg-white transition-all duration-200"
        >
          <ChevronLeft size={20} className="text-romantic-deep" />
        </button>

        <button
          onClick={nextPhoto}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 
                   bg-white/80 backdrop-blur-sm p-2 rounded-full 
                   shadow-lg hover:bg-white transition-all duration-200"
        >
          <ChevronRight size={20} className="text-romantic-deep" />
        </button>
      </div>

      {/* Photo indicators */}
      <div className="flex justify-center mt-4 gap-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPhotoIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentPhotoIndex
                ? 'bg-romantic-rose shadow-lg'
                : 'bg-romantic-rose/30 hover:bg-romantic-rose/50'
            }`}
          />
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-romantic-deep/70 text-sm">
          📸 Adicione suas fotos especiais aqui!
        </p>
      </div>
    </div>
  );
};

export default PhotoSlideshow;
