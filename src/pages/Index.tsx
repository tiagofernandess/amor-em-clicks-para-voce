import { useState, useEffect, useRef } from 'react';
import { Heart, Play, Pause, Loader2 } from 'lucide-react';
import FloatingHearts from '../components/FloatingHearts';
import PhotoSlideshow from '../components/PhotoSlideshow';
import LoveCounter from '../components/LoveCounter';
import RomanticMessage from '../components/RomanticMessage';

const Index = () => {
  const [surpriseStarted, setSurpriseStarted] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicReady, setMusicReady] = useState(false);
  const [musicLoading, setMusicLoading] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startSurprise = () => {
    setSurpriseStarted(true);
    setMusicLoading(true);
    // Força o carregamento do áudio
    if (audioRef.current) {
      audioRef.current.load();
    }
  };

  const playMusic = async () => {
    if (!audioRef.current) return;
    
    try {
      setMusicLoading(true);
      // Tenta tocar a música
      await audioRef.current.play();
      setMusicPlaying(true);
      setMusicLoading(false);
      console.log('Música iniciada com sucesso');
    } catch (error) {
      console.error('Erro ao tocar música:', error);
      setMusicPlaying(false);
      setMusicLoading(false);
      setMusicError(true);
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setMusicPlaying(false);
    }
  };

  const toggleMusic = async () => {
    if (!musicReady) {
      console.log('Música ainda não está pronta');
      return;
    }

    if (musicPlaying) {
      pauseMusic();
    } else {
      await playMusic();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleCanPlayThrough = () => {
        setMusicReady(true);
        setMusicLoading(false);
        console.log('Música carregada e pronta');
        
        // Auto-play se a surpresa já foi iniciada
        if (surpriseStarted) {
          playMusic();
        }
      };

      const handlePlay = () => {
        setMusicPlaying(true);
        setMusicLoading(false);
        console.log('Música está tocando');
      };

      const handlePause = () => {
        setMusicPlaying(false);
        setMusicLoading(false);
        console.log('Música pausada');
      };

      const handleError = (e: Event) => {
        console.error('Erro no áudio:', e);
        setMusicReady(false);
        setMusicPlaying(false);
        setMusicLoading(false);
        setMusicError(true);
      };

      audio.addEventListener('canplaythrough', handleCanPlayThrough);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('error', handleError);

      return () => {
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('error', handleError);
      };
    }
  }, [surpriseStarted]);

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
        preload="auto"
        crossOrigin="anonymous"
      >
        <source src="/music/Murilo Huff - Declaração de Amor _ Pecado de Amor _ Deixaria Tudo (Ao Vivão 2)(MP3_160K).mp3" type="audio/mpeg" />
      </audio>

      <div className="flex items-center justify-center min-h-screen p-2 sm:p-4">
        {!surpriseStarted ? (
          <div className="text-center animate-fade-in px-4 max-w-md">
            <div className="mb-6 sm:mb-8">
              <Heart 
                size={60} 
                className="text-romantic-rose mx-auto animate-heart-beat fill-current sm:w-20 sm:h-20" 
              />
            </div>
            
            <h1 className="dancing-text text-4xl sm:text-6xl md:text-8xl text-romantic-deep mb-4 sm:mb-6 animate-slide-up leading-tight">
              Para Meu Amor
            </h1>
            
            <p className="text-romantic-deep/70 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-sm mx-auto leading-relaxed">
              Uma surpresa especial está esperando por você...
            </p>
            
            <button
              onClick={startSurprise}
              className="romantic-button animate-heart-beat text-lg sm:text-xl px-6 py-3 sm:px-8 sm:py-4"
            >
              💕 Clique para começar a surpresa 💕
            </button>
          </div>
        ) : (
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
            {/* Header com controle de música */}
            <div className="text-center mb-4 sm:mb-8">
              <button
                onClick={toggleMusic}
                disabled={!musicReady || musicLoading}
                className={`inline-flex items-center gap-2 backdrop-blur-sm 
                         text-romantic-deep px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-lg 
                         hover:shadow-xl transition-all duration-300 text-sm ${
                  musicReady && !musicLoading
                    ? 'bg-white/80 hover:bg-white/90 cursor-pointer' 
                    : 'bg-gray-300/50 cursor-not-allowed'
                }`}
              >
                {musicLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : musicPlaying ? (
                  <Pause size={18} />
                ) : (
                  <Play size={18} />
                )}
                <span className="text-xs sm:text-sm font-medium">
                  {musicLoading ? 'Carregando...' : 
                   !musicReady ? 'Preparando...' :
                   musicPlaying ? 'Pausar Música' : 'Tocar Música'} ♫ Declaração de Amor
                </span>
              </button>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start">
              {/* Slideshow de fotos */}
              <div className="w-full">
                <div className="romantic-card p-4 sm:p-6 lg:p-8">
                  <PhotoSlideshow />
                </div>
              </div>

              {/* Mensagem e contador */}
              <div className="w-full space-y-4 sm:space-y-6">
                <div className="romantic-card p-4 sm:p-6 lg:p-8">
                  <RomanticMessage />
                </div>
                
                <div className="romantic-card p-4 sm:p-6 lg:p-8">
                  <LoveCounter startDate="2024-12-09" />
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
