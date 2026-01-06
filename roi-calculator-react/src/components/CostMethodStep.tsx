import { motion } from 'framer-motion';
import type { CostMethod } from '../types';

interface CostMethodStepProps {
  selectedMethod: CostMethod['id'];
  customCost: number | undefined;
  onSelectMethod: (method: CostMethod['id']) => void;
  onCustomCostChange: (cost: number) => void;
  onContinue: () => void;
}

const costMethods: CostMethod[] = [
  {
    id: 'benchmark',
    label: 'Industry Benchmark',
    description: 'Use average costs for your industry',
    icon: '📊'
  },
  {
    id: 'per_loan',
    label: 'Cost per Loan',
    description: 'Enter your cost per funded loan',
    icon: '💵'
  },
  {
    id: 'total_spend',
    label: 'Total Annual Spend',
    description: 'Enter your total verification budget',
    icon: '📈'
  },
  {
    id: 'per_verification',
    label: 'Cost per Verification',
    description: 'Enter your average verification cost',
    icon: '🔍'
  }
];

const placeholders: Record<CostMethod['id'], string> = {
  benchmark: '',
  per_loan: 'e.g., $120',
  total_spend: 'e.g., $500,000',
  per_verification: 'e.g., $35'
};

export function CostMethodStep({
  selectedMethod,
  customCost,
  onSelectMethod,
  onCustomCostChange,
  onContinue
}: CostMethodStepProps) {
  const needsInput = selectedMethod !== 'benchmark';
  const isValid = selectedMethod === 'benchmark' || (customCost && customCost > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-dark">
          How do you track verification costs?
        </h2>
        <p className="text-gray">
          Choose how you'd like to input your current costs
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {costMethods.map((method, index) => (
          <motion.button
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            onClick={() => onSelectMethod(method.id)}
            className={`p-5 rounded-xl border-2 text-left transition-all ${
              selectedMethod === method.id
                ? 'border-truv-blue bg-truv-blue-light shadow-lg shadow-truv-blue/10'
                : 'border-border hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="text-2xl mb-2">{method.icon}</div>
            <div className="font-semibold text-dark mb-1">{method.label}</div>
            <div className="text-sm text-gray">{method.description}</div>
          </motion.button>
        ))}
      </div>

      {needsInput && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-2"
        >
          <label className="block text-sm font-medium text-dark">
            Enter your {costMethods.find(m => m.id === selectedMethod)?.label.toLowerCase()}
          </label>
          <input
            type="number"
            value={customCost || ''}
            onChange={(e) => onCustomCostChange(parseInt(e.target.value) || 0)}
            placeholder={placeholders[selectedMethod]}
            className="w-full px-4 py-3 text-lg border border-border rounded-xl focus:border-truv-blue focus:ring-2 focus:ring-truv-blue-glow outline-none transition-all font-mono"
          />
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onContinue}
        disabled={!isValid}
        className={`w-full py-4 rounded-xl text-lg font-semibold transition-all ${
          isValid
            ? 'bg-truv-blue text-white hover:bg-truv-blue-dark shadow-lg shadow-truv-blue/25'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        See My Results
      </motion.button>
    </motion.div>
  );
}
