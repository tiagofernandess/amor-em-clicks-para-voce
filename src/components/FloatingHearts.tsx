
import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: Heart[] = [];
      for (let i = 0; i < 15; i++) {
        newHearts.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: 8 + Math.random() * 4,
          size: 12 + Math.random() * 8,
        });
      }
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-float fixed pointer-events-none select-none z-0"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.animationDuration}s`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        >
          💕
        </div>
      ))}
    </>
  );
};

export default FloatingHearts;
