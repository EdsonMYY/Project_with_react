import { useState, useEffect } from 'react';

export type GameState = 'start' | 'run' | 'finish';

const useTypingGame = (textToType: string) => {
  const [gameState, setGameState] = useState<GameState>('start');

  const [userInput, setUserInput] = useState<string>('');

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
    }
  }, [gameState, timeLeft]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (gameState === 'start') {
      setGameState('run');
    }

    if (gameState === 'finish') return;

    setUserInput(value);

    if (value.length >= textToType.length) {
      setGameState('finish');
      calculateWPM(value.length, 30 - timeLeft);
    }
  };

  const resetGame = () => {
    setGameState('start');
    setUserInput('');
    setTimeLeft(30);
    setWpm(0);
  };

  const calculateWPM = (chars: number, timeElapsed: number) => {
    const words = chars / 5;
    const minutes = timeElapsed / 60;
    const result = Math.round(words / minutes);
    setWpm(result > 0 ? result : 0);
  };

  return { gameState, userInput, timeLeft, wpm, handleInputChange, resetGame };
};

export default useTypingGame;