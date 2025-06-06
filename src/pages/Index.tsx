
import { useState, useEffect, useRef } from 'react';
import { Heart, Play, Pause } from 'lucide-react';
import FloatingHearts from '../components/FloatingHearts';
import PhotoSlideshow from '../components/PhotoSlideshow';
import LoveCounter from '../components/LoveCounter';
import RomanticMessage from '../components/RomanticMessage';

const Index = () => {
  const [surpriseStarted, setSurpriseStarted] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startSurprise = () => {
    setSurpriseStarted(true);
    // Simula o início da música - você pode substituir por um arquivo real
    setTimeout(() => {
      setMusicPlaying(true);
    }, 500);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setMusicPlaying(!musicPlaying);
    }
  };

  return (
    <div className="min-h-screen romantic-bg relative">
      <FloatingHearts />
      
      {/* Sparkles */}
      <div className="sparkle" style={{ top: '10%', left: '15%', animationDelay: '0s' }}></div>
      <div className="sparkle" style={{ top: '20%', right: '20%', animationDelay: '1s' }}></div>
      <div className="sparkle" style={{ bottom: '30%', left: '25%', animationDelay: '2s' }}></div>
      <div className="sparkle" style={{ bottom: '15%', right: '15%', animationDelay: '1.5s' }}></div>

      {/* Audio element for romantic music */}
      <audio
        ref={audioRef}
        loop
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
      >
        {/* Adicione aqui o src da sua música romântica */}
        <source src="/path-to-your-romantic-song.mp3" type="audio/mpeg" />
      </audio>

      <div className="flex items-center justify-center min-h-screen p-4">
        {!surpriseStarted ? (
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <Heart 
                size={80} 
                className="text-romantic-rose mx-auto animate-heart-beat fill-current" 
              />
            </div>
            
            <h1 className="dancing-text text-6xl md:text-8xl text-romantic-deep mb-6 animate-slide-up">
              Para Meu Amor
            </h1>
            
            <p className="text-romantic-deep/70 text-lg md:text-xl mb-8 max-w-md mx-auto">
              Uma surpresa especial está esperando por você...
            </p>
            
            <button
              onClick={startSurprise}
              className="romantic-button animate-heart-beat"
            >
              💕 Clique para começar a surpresa 💕
            </button>
          </div>
        ) : (
          <div className="w-full max-w-6xl mx-auto">
            {/* Header com controle de música */}
            <div className="text-center mb-8">
              <button
                onClick={toggleMusic}
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm 
                         text-romantic-deep px-4 py-2 rounded-full shadow-lg 
                         hover:shadow-xl transition-all duration-300"
              >
                {musicPlaying ? <Pause size={20} /> : <Play size={20} />}
                <span className="text-sm font-medium">
                  {musicPlaying ? 'Pausar Música' : 'Tocar Música'}
                </span>
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Slideshow de fotos */}
              <div className="romantic-card">
                <PhotoSlideshow />
              </div>

              {/* Mensagem e contador */}
              <div className="space-y-6">
                <div className="romantic-card">
                  <RomanticMessage />
                </div>
                
                <div className="romantic-card">
                  <LoveCounter startDate="2023-01-01" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
