import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { InputStep } from './components/InputStep';
import { CostMethodStep } from './components/CostMethodStep';
import { ResultsStep } from './components/ResultsStep';
import { LeadModal } from './components/LeadModal';
import { CalculatingSpinner } from './components/CalculatingSpinner';
import { calculateROI, DEFAULT_ADVANCED_INPUTS } from './utils/calculations';
import type { FormData, CostMethod, Step, CalculationResults, LeadFormData } from './types';

function App() {
  const [step, setStep] = useState<Step>(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isGated, setIsGated] = useState(true);
  const [showLeadModal, setShowLeadModal] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fundedLoans: 0,
    industry: 'mortgage'
  });

  const [costMethod, setCostMethod] = useState<CostMethod['id']>('benchmark');
  const [customCost, setCustomCost] = useState<number | undefined>();

  const [results, setResults] = useState<CalculationResults | null>(null);

  const handleCalculate = () => {
    setIsCalculating(true);

    // Simulate calculation time for effect
    setTimeout(() => {
      setStep(1);
      setIsCalculating(false);
    }, 1200);
  };

  const handleCostMethodContinue = () => {
    setIsCalculating(true);

    setTimeout(() => {
      const calculatedResults = calculateROI(
        formData,
        DEFAULT_ADVANCED_INPUTS,
        costMethod,
        customCost
      );
      setResults(calculatedResults);
      setStep(2);
      setIsCalculating(false);
    }, 1500);
  };

  const handleUnlock = () => {
    setShowLeadModal(true);
  };

  const handleLeadSubmit = (leadData: LeadFormData) => {
    console.log('Lead submitted:', leadData);
    setShowLeadModal(false);
    setIsGated(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-xl shadow-black/5 p-8 md:p-12">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <InputStep
                key="input"
                formData={formData}
                onChange={setFormData}
                onCalculate={handleCalculate}
              />
            )}

            {step === 1 && (
              <CostMethodStep
                key="cost"
                selectedMethod={costMethod}
                customCost={customCost}
                onSelectMethod={setCostMethod}
                onCustomCostChange={setCustomCost}
                onContinue={handleCostMethodContinue}
              />
            )}

            {step === 2 && results && (
              <ResultsStep
                key="results"
                results={results}
                isGated={isGated}
                onUnlock={handleUnlock}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Step Progress */}
        <div className="flex justify-center mt-8 gap-2">
          {[0, 1, 2].map((s) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-all ${
                s === step
                  ? 'bg-truv-blue w-6'
                  : s < step
                  ? 'bg-truv-blue'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </main>

      <AnimatePresence>
        <CalculatingSpinner isVisible={isCalculating} />
      </AnimatePresence>

      <AnimatePresence>
        {showLeadModal && (
          <LeadModal
            isOpen={showLeadModal}
            onClose={() => setShowLeadModal(false)}
            onSubmit={handleLeadSubmit}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
