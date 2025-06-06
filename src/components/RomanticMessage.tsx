
import { Heart, Sparkles } from 'lucide-react';

const RomanticMessage = () => {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Sparkles size={20} className="text-romantic-rose sm:w-6 sm:h-6" />
        <h2 className="dancing-text text-2xl sm:text-3xl text-romantic-deep">
          Uma Mensagem Especial
        </h2>
      </div>

      <div className="relative">
        {/* Decorative quote marks */}
        <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 text-4xl sm:text-6xl text-romantic-rose/30 dancing-text">
          "
        </div>
        <div className="absolute -bottom-6 -right-1 sm:-bottom-8 sm:-right-2 text-4xl sm:text-6xl text-romantic-rose/30 dancing-text">
          "
        </div>

        <div className="relative px-4 py-3 sm:px-6 sm:py-4">
          <p className="text-romantic-deep text-base sm:text-lg md:text-xl leading-relaxed text-center italic">
            Desde que te conheci, minha vida se encheu de cor, de sorrisos e de amor. 
            Cada momento ao seu lado é um presente que quero guardar pra sempre. 
            Obrigado por ser minha melhor escolha todos os dias. 
            <span className="dancing-text text-xl sm:text-2xl text-romantic-rose font-bold ml-2">
              Te amo!
            </span>
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-4 sm:mt-6">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              size={16}
              className="text-romantic-rose fill-current animate-heart-beat sm:w-5 sm:h-5"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-3 sm:mt-4">
        <p className="dancing-text text-lg sm:text-xl text-romantic-deep/70">
          Com todo meu amor ❤️
        </p>
      </div>
    </div>
  );
};

export default RomanticMessage;
