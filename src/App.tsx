import {useRef} from 'react';
import usetypingGame from './hooks/useTypingGame';
import TypingArea from './components/TypingArea';

const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog.";

function App() {
  const { gameState, userInput, timeLeft, wpm, handleInputChange, resetGame } = usetypingGame(SAMPLE_TEXT);

  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-10" onClick={focusInput}>
      <h1 className="text-3xl font-bold mb-8 text-yellow-400">TypeReact</h1>

      <div className="flex gap-10 mb-8 text-xl font-bold">
        <div className="flex flex-col items-center">
          <span className="text-slate-400 text-sm">Time</span>
          <span className={timeLeft < 10 ? "text-red-500" : "text-white"}>{timeLeft}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-slate-400 text-sm">WPM</span>
          <span className="text-green-400">{wpm}</span>
        </div>
      </div>

      <div className="relative maxw-3xl w-full bh-slate-800 p-8 rounded-xl shadow 2xl border border-slate 700">
        <TypingArea text={SAMPLE_TEXT} userInput={userInput} />

        <input
          ref={inputRef}
          type="text"
          className="absolute inset-0 opacity-0 cursor-default"
          value={userInput}
          onChange={handleInputChange}
          autoFocus
        />

        {gameState === 'finish' && (
          <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center rounded-xl z-10">
            <h2 className="text-2xl font-bold mb-4">Time Out</h2>
            <p className="text-lg mb-6">Your WPM: <span className="text-green-400 font bold">{wpm}</span></p>
            <button onClick={resetGame} className="bh-yellow-500 text-slate-900font-bold py-2 px-6 rounded hover:bh-yellow-400 transition">
              Restart
            </button>
          </div>
        )}
      </div>

      <p className="mt-8 text-slate-500 text-sm">Click anywhere and start typing to play.</p>
    </div>
  );
}

export default App
