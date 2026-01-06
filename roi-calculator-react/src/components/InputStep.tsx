import { motion } from 'framer-motion';
import type { FormData } from '../types';

interface InputStepProps {
  formData: FormData;
  onChange: (data: FormData) => void;
  onCalculate: () => void;
}

const industries = [
  { value: 'mortgage', label: 'Mortgage Lending' },
  { value: 'credit_union', label: 'Credit Union' },
  { value: 'consumer', label: 'Consumer Lending' },
  { value: 'auto', label: 'Auto Lending' }
] as const;

export function InputStep({ formData, onChange, onCalculate }: InputStepProps) {
  const isValid = formData.fundedLoans > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-dark">
          Calculate Your Savings with Truv
        </h1>
        <p className="text-gray text-lg">
          See how much you could save on income and employment verification
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-dark">
            How many loans do you fund annually?
          </label>
          <input
            type="number"
            value={formData.fundedLoans || ''}
            onChange={(e) => onChange({ ...formData, fundedLoans: parseInt(e.target.value) || 0 })}
            placeholder="e.g., 5000"
            className="w-full px-4 py-3 text-lg border border-border rounded-xl focus:border-truv-blue focus:ring-2 focus:ring-truv-blue-glow outline-none transition-all font-mono"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-dark">
            What industry are you in?
          </label>
          <select
            value={formData.industry}
            onChange={(e) => onChange({ ...formData, industry: e.target.value as FormData['industry'] })}
            className="w-full px-4 py-3 text-lg border border-border rounded-xl focus:border-truv-blue focus:ring-2 focus:ring-truv-blue-glow outline-none transition-all bg-white"
          >
            {industries.map((ind) => (
              <option key={ind.value} value={ind.value}>
                {ind.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onCalculate}
        disabled={!isValid}
        className={`w-full py-4 rounded-xl text-lg font-semibold transition-all ${
          isValid
            ? 'bg-truv-blue text-white hover:bg-truv-blue-dark shadow-lg shadow-truv-blue/25'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Calculate My Savings
      </motion.button>
    </motion.div>
  );
}
