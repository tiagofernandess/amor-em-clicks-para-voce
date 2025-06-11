import { useState, useEffect } from 'react';
import { Calendar, Heart } from 'lucide-react';

interface LoveCounterProps {
  startDate: string;
}

const LoveCounter = ({ startDate }: LoveCounterProps) => {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 7,
    days: 2,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setTimeElapsed(prev => ({
        ...prev,
        hours,
        minutes,
        seconds
      }));
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeCard = ({ value, label }: { value: number; label: string }) => (
    <div className="text-center bg-gradient-to-br from-romantic-light to-white 
                    rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 shadow-lg border border-romantic-rose/20">
      <div className="dancing-text text-lg sm:text-2xl md:text-3xl font-bold text-romantic-deep mb-1">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-romantic-deep/70 text-xs sm:text-sm uppercase tracking-wide">
        {label}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Calendar size={20} className="text-romantic-rose sm:w-6 sm:h-6" />
        <h2 className="dancing-text text-2xl sm:text-3xl text-romantic-deep">
          Nosso Tempo Juntos
        </h2>
      </div>

      <div className="text-center mb-4 sm:mb-6">
        <p className="text-romantic-deep/80 text-sm sm:text-lg">
          Desde <span className="font-bold">09 de Novembro de 2024</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        <TimeCard value={timeElapsed.months} label="Meses" />
        <TimeCard value={timeElapsed.days} label="Dias" />
        <TimeCard value={timeElapsed.hours} label="Horas" />
        <TimeCard value={timeElapsed.minutes} label="Minutos" />
        <TimeCard value={timeElapsed.seconds} label="Segundos" />
      </div>

      <div className="mt-4 sm:mt-6 text-center">
        <div className="flex items-center justify-center gap-2 text-romantic-deep/70">
          <Heart size={14} className="fill-current sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">
            E cada segundo vale a pena!
          </span>
          <Heart size={14} className="fill-current sm:w-4 sm:h-4" />
        </div>
      </div>
    </div>
  );
};

export default LoveCounter;
