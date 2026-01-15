import { useState, useEffect } from 'react';

export type GameState = 'start' | 'run' | 'finish';

const useTypingGame = (textToType: string) => {
  const [gameState, setGameState] = useState<GameState>('start');

  const [userInput, setUserInput] = useState<string>('');

  const [startTime, setStartTime] = useState<number | null>(null);

  const [timeLeft, setTimeLeft] = useState<number>(30); // 30 seconds countdown
  const [wpm, setWpm] = useState<number>(0);

  useEffect(() => {
    if (gameState === 'run' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } 
    else if (timeLeft === 0) {
      setGameState('finish');
      calculateWPM(userInput.length);
    }
  }, [gameState, timeLeft]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (gameState === 'start') {
      setGameState('run');
      setStartTime(Date.now());
    }

    if (gameState === 'finish') return;

    setUserInput(value);

    if (value.length >= textToType.length) {
      setGameState('finish');
      calculateWPM(value.length);
    }
  };

  const resetGame = () => {
    setGameState('start');
    setUserInput('');
    setTimeLeft(30);
    setWpm(0);
  };

  const calculateWPM = (chars: number) => {
    if (!startTime) return;

    const words = chars / 5;
    const now = Date.now();
    const timeInMinutes = (now - startTime) / 60000;

    if (timeInMinutes < 0.001) return 0; // Prevent broken math if the person is the flash

    const result = Math.round(words / timeInMinutes);
    setWpm(result > 0 ? result : 0);
  };

  return { gameState, userInput, timeLeft, wpm, handleInputChange, resetGame };
};

export default useTypingGame;