import React from 'react';

interface Props {
    text : string;
    userInput : string;
}

const TypingArea = ({text, userInput}: Props) => {
    return (
        <div className="text-2xl font-mono leading-relaxed break-words text-gray-800">
            {text.split('').map((char, index) => {
                const typedChar = userInput[index];

                let color = "text-gray-400";
                
                if (typedChar !== undefined) {
                    color = typedChar === char ? "text-green-500" : "text-red-500";
                }

                const isCurrent = index === userInput.length;

                return (
                    <span
                        key={index}
                        className={`${color} ${isCurrent ? 'border-1-2 border-yellow-400 animate-pulse' : ''}`}
                    >
                        {char}
                    </span>
                );
            })}
        </div>
    )
}

export default TypingArea;