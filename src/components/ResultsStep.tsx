import { motion } from 'framer-motion';
import { useState } from 'react';
import type { CalculationResults, AdvancedInputs } from '../types';
import { formatCurrency, formatNumber, formatPercent } from '../utils/calculations';

interface ResultsStepProps {
    results: CalculationResults;
    isGated: boolean;
    onUnlock: () => void;
    advancedInputs: AdvancedInputs;
    onAdvancedInputsChange: (inputs: AdvancedInputs) => void;
}

export function ResultsStep({
    results,
    // isGated,
    onUnlock,
    advancedInputs,
    onAdvancedInputsChange
}: ResultsStepProps) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    // If gated, we could hide the exact savings or blur them.
    // For this version, we show the savings but gate the "Get Report" or deep details.
    // Or we just follow the original design which shows everything.
    // Let's assume gated means "Show top line, blur breakdown" or similar?
    // Current requirement: "Verify PFL calculation logic".
    // Screenshot shows full breakdown. Let's assume unlocked view for now or simple gating.

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-dark">Your Potential Savings</h2>
                <div className="text-5xl font-bold text-truv-blue tracking-tight py-4">
                    {formatCurrency(results.annualSavings)}
                    <span className="text-lg text-gray-500 font-normal ml-2">/ year</span>
                </div>
                <p className="text-gray-600">
                    Based on {formatNumber(results.savingsPerLoan)} cost reduction per loan
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm text-center">
                    <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wider mb-2">Current Cost</h3>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(results.currentCost)}</div>
                    <div className="text-sm text-gray-400 mt-1">Legacy Process</div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-truv-blue shadow-sm text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-truv-blue" />
                    <h3 className="text-truv-blue font-medium text-sm uppercase tracking-wider mb-2">Truv Cost</h3>
                    <div className="text-2xl font-bold text-truv-blue">{formatCurrency(results.futureCost)}</div>
                    <div className="text-sm text-gray-400 mt-1">PFL Bundle + Fallback</div>
                </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900">Verification Breakdown</h3>
                    <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                        {formatPercent(results.manualReduction)} less manual work
                    </span>
                </div>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Truv Verified Income (42%)</span>
                        <span className="font-medium">{formatNumber(results.truvVOIEs)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Truv Verified Employment (Assets/History)</span>
                        <span className="font-medium">{formatNumber(results.truvVOAs)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                        <span className="text-gray-600">Remaining TWN (Fallback)</span>
                        <span className="font-medium text-gray-900">{formatNumber(results.remainingTWNs)}</span>
                    </div>
                </div>
            </div>

            {showAdvanced ? (
                <div className="border-t border-gray-200 pt-8 mt-8">
                    <h3 className="font-semibold text-gray-900 mb-4">Advanced Assumptions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Pull Through Rate</label>
                            <input
                                type="number"
                                value={advancedInputs.pullThroughRate}
                                onChange={(e) => onAdvancedInputsChange({ ...advancedInputs, pullThroughRate: Number(e.target.value) })}
                                className="w-full p-2 border border-gray-200 rounded text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">W-2 Rate</label>
                            <input
                                type="number"
                                value={advancedInputs.w2Rate}
                                onChange={(e) => onAdvancedInputsChange({ ...advancedInputs, w2Rate: Number(e.target.value) })}
                                className="w-full p-2 border border-gray-200 rounded text-sm"
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => setShowAdvanced(false)}
                        className="mt-4 text-sm text-gray-500 hover:text-gray-900 underline"
                    >
                        Hide Advanced Settings
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setShowAdvanced(true)}
                    className="text-sm text-gray-500 hover:text-gray-900 underline flex items-center justify-center w-full"
                >
                    View Advanced Assumptions
                </button>
            )}

            <div className="pt-4">
                <button
                    onClick={onUnlock}
                    className="w-full bg-truv-blue text-white font-semibold py-4 rounded-full shadow-lg hover:bg-truv-blue-dark transition-all transform hover:scale-[1.02]"
                >
                    Download Full Report
                </button>
                <button
                    onClick={() => window.location.reload()}
                    className="w-full mt-4 text-gray-500 hover:text-gray-900 font-medium"
                >
                    Start Over
                </button>
            </div>

        </motion.div>
    );
}
