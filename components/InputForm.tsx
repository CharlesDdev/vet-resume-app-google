import React from 'react';

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

interface InputFormProps {
  inputText: string;
  setInputText: (text: string) => void;
  onTranslate: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ inputText, setInputText, onTranslate, isLoading }) => {
  const placeholderText = `Paste your military text here. For example: 'Led a team of 12 soldiers during deployment operations responsible for maintaining equipment worth $2.3M...'`;

  return (
    <div className="bg-dark-charcoal/50 p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="flex items-center gap-3">
        <EditIcon />
        <h2 className="text-2xl font-bold text-light-tan">Enter Your Military Text</h2>
      </div>
      
      <div className="mt-6 flex flex-col gap-4">
        <label htmlFor="military-text-input" className="font-semibold text-light-tan/80">
          Military Text to Translate
        </label>
        <textarea
          id="military-text-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={placeholderText}
          className="w-full h-56 p-4 bg-dark-charcoal border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-light-tan focus:border-light-tan outline-none transition-colors duration-200 resize-none placeholder-light-tan/40 whitespace-pre-wrap"
          disabled={isLoading}
        />
        <div className="flex items-start gap-2 text-light-tan/60 text-sm">
          <InfoIcon />
          <span>Enter military language from awards, evaluations, or job descriptions. The tool will help translate it into civilian-friendly resume bullets.</span>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onTranslate}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-dark-charcoal text-light-tan font-bold text-lg rounded-lg hover:bg-black/50 disabled:bg-stone-700 disabled:text-stone-500 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-charcoal focus:ring-light-tan"
        >
            <ArrowRightIcon />
            {isLoading ? 'Generating...' : 'Get Civilian Resume Bullet'}
        </button>
        <p className="text-center text-xs text-light-tan/50 mt-4">Your data is never stored.</p>
      </div>
    </div>
  );
};

export default InputForm;