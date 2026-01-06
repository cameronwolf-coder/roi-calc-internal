import { motion } from 'framer-motion';
import type { CalculationResults } from '../types';
import { formatCurrency, formatNumber, formatPercent } from '../utils/calculations';

interface ResultsStepProps {
  results: CalculationResults;
  isGated: boolean;
  onUnlock: () => void;
}

const industryQuotes = {
  mortgage: {
    quote: "Truv has transformed our verification process. We've seen significant cost savings and faster closings.",
    author: "VP of Operations",
    company: "Top 20 Mortgage Lender"
  },
  credit_union: {
    quote: "Borrowers try Truv first because it has proven most reliable.",
    author: "Austin Coleman, SVP",
    company: "America First Credit Union"
  },
  consumer: {
    quote: "Real-time income verification has reduced our fraud rates and improved approval times.",
    author: "Head of Underwriting",
    company: "Leading Fintech Lender"
  },
  auto: {
    quote: "Same-day funding is now possible thanks to instant verification.",
    author: "Director of Lending",
    company: "National Auto Finance"
  }
};

export function ResultsStep({ results, isGated, onUnlock }: ResultsStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-truv-blue-light rounded-2xl p-6 text-center"
        >
          <div className="text-sm text-truv-blue font-medium mb-2">Annual Savings</div>
          <div className="text-3xl font-bold text-truv-blue font-mono">
            {formatCurrency(results.annualSavings)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-success-light rounded-2xl p-6 text-center"
        >
          <div className="text-sm text-success font-medium mb-2">Per Funded Loan</div>
          <div className="text-3xl font-bold text-success font-mono">
            {formatCurrency(results.savingsPerLoan)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-100 rounded-2xl p-6 text-center"
        >
          <div className="text-sm text-gray font-medium mb-2">Manual Reduction</div>
          <div className="text-3xl font-bold text-dark font-mono">
            {formatPercent(results.manualReduction)}
          </div>
        </motion.div>
      </div>

      {/* Detailed Breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        <div className={`rounded-2xl border border-border overflow-hidden ${isGated ? 'blur-sm' : ''}`}>
          <div className="grid grid-cols-2">
            {/* Current State */}
            <div className="p-6 border-r border-border">
              <h3 className="font-semibold text-dark mb-4">Current State</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray">VOAs</span>
                  <span className="font-mono font-medium">{formatNumber(results.currentVOAs)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray">TWN VOIEs</span>
                  <span className="font-mono font-medium">{formatNumber(results.currentTWNs)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-medium text-dark">Total Cost</span>
                  <span className="font-mono font-bold text-dark">{formatCurrency(results.currentCost)}</span>
                </div>
              </div>
            </div>

            {/* With Truv */}
            <div className="p-6 bg-truv-blue-light/30">
              <h3 className="font-semibold text-truv-blue mb-4">With Truv</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray">Truv VOAs</span>
                  <span className="font-mono font-medium">{formatNumber(results.truvVOAs)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray">Truv VOIEs</span>
                  <span className="font-mono font-medium">{formatNumber(results.truvVOIEs)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray">TWN (remaining)</span>
                  <span className="font-mono font-medium">{formatNumber(results.remainingTWNs)}</span>
                </div>
                <div className="border-t border-truv-blue/20 pt-3 flex justify-between">
                  <span className="font-medium text-truv-blue">Total Cost</span>
                  <span className="font-mono font-bold text-truv-blue">{formatCurrency(results.futureCost)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gate Overlay */}
        {isGated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onUnlock}
              className="bg-truv-blue text-white px-8 py-4 rounded-xl font-semibold shadow-xl shadow-truv-blue/30"
            >
              Unlock Full Report
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Quote */}
      {!isGated && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-50 rounded-2xl p-6 border-l-4 border-truv-blue"
        >
          <p className="text-gray italic mb-3">
            "{industryQuotes.credit_union.quote}"
          </p>
          <p className="text-sm text-dark font-medium">
            — {industryQuotes.credit_union.author}, {industryQuotes.credit_union.company}
          </p>
        </motion.div>
      )}

      {/* CTA */}
      {!isGated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4"
        >
          <button className="flex-1 py-4 rounded-xl border-2 border-truv-blue text-truv-blue font-semibold hover:bg-truv-blue-light transition-colors">
            Download PDF Report
          </button>
          <button className="flex-1 py-4 rounded-xl bg-truv-blue text-white font-semibold hover:bg-truv-blue-dark transition-colors shadow-lg shadow-truv-blue/25">
            Talk to Sales
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
