import React from 'react';
import type { TranslationResult } from '../types';
import TranslationCard from './TranslationCard';

interface TranslationOutputProps {
  translations: TranslationResult;
}

const TranslationOutput: React.FC<TranslationOutputProps> = ({ translations }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 animate-fade-in">
      <TranslationCard title="Professional Resume Bullet" content={translations.professional} />
      <TranslationCard title="Casual Explanation" content={translations.casual} />
      <TranslationCard title="ATS-Optimized Version" content={translations.ats} />
    </div>
  );
};

// Add fade-in animation to tailwind config if possible, or define here
// This is a simple way to add it without config access
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default TranslationOutput;
