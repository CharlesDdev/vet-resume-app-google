import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import TranslationOutput from './components/TranslationOutput';
import Spinner from './components/Spinner';
import Footer from './components/Footer';
import VetPivotLogo from './components/VetPivotLogo';
import type { TranslationResult } from './types';
import { translateJargon } from './services/geminiService';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [translations, setTranslations] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to translate.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setTranslations(null);

    try {
      const result = await translateJargon(inputText);
      setTranslations(result);
    } catch (err) {
      setError('Failed to get translations. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-3xl mx-auto">
        <Header />
        <main className="mt-12 sm:mt-16">
          <section className="flex flex-col items-center gap-6 text-center">
            <VetPivotLogo wrapperClassName="w-48 h-48 p-6" iconClassName="w-24" textClassName="text-2xl mt-2" />
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-light-tan tracking-wide">
                VETPIVOT RESUME OPTIMIZER
              </h1>
              <p className="mt-3 text-lg text-light-tan/80 max-w-2xl">
                Helping veterans translate their skills into job-winning resumes.
              </p>
            </div>
          </section>

          <Footer />

          <section>
            <InputForm
              inputText={inputText}
              setInputText={setInputText}
              onTranslate={handleTranslate}
              isLoading={isLoading}
            />
          </section>
          
          <div className="mt-12">
            {isLoading && (
              <div className="flex justify-center items-center h-40">
                <Spinner />
              </div>
            )}

            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {translations && !isLoading && (
              <TranslationOutput translations={translations} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;