import type { FormData, AdvancedInputs, CalculationResults } from '../types';

// Industry benchmarks (cost per funded loan)
const INDUSTRY_BENCHMARKS: Record<string, number> = {
  mortgage: 116,
  credit_union: 95,
  consumer: 78,
  auto: 65
};

// Conversion rates
const CURRENT_VOA_CONVERSION = 0.50;
const CURRENT_SSV_CONVERSION = 0.20;
const CURRENT_TWN_CONVERSION = 0.60;

const TRUV_VOA_CONVERSION = 0.60;
const TRUV_SSV_CONVERSION = 0.24;
const TRUV_VOIE_CONVERSION = 0.42;
const TRUV_TWN_CONVERSION = 0.36; // Reduced after Truv captures easy ones

// Pricing
const VOA_COST = 10;
const TWN_COST = 62;
const TRUV_VOA_COST = 6;
const TRUV_VOIE_COST = 10;

export const DEFAULT_ADVANCED_INPUTS: AdvancedInputs = {
  retailPercent: 70,
  wholesalePercent: 20,
  borrowersPerApp: 1.5,
  endToEndCR: 30,
  pullThroughRate: 60,
  w2Rate: 80
};

export function calculateROI(
  formData: FormData,
  advancedInputs: AdvancedInputs = DEFAULT_ADVANCED_INPUTS,
  costMethod: 'benchmark' | 'per_loan' | 'total_spend' | 'per_verification' = 'benchmark',
  customCost?: number
): CalculationResults {
  const { fundedLoans, industry } = formData;
  const { borrowersPerApp, endToEndCR, pullThroughRate, w2Rate } = advancedInputs;

  // Calculate funnel metrics
  const e2eCR = endToEndCR / 100;
  const ptRate = pullThroughRate / 100;
  const w2Percent = w2Rate / 100;

  const appsStarted = fundedLoans / e2eCR;
  const appsSubmitted = fundedLoans / ptRate;
  const appSubmissionCR = e2eCR / ptRate;

  const voasDuringApp = appsStarted * borrowersPerApp;
  const w2AppsSubmitted = appsSubmitted * w2Percent;
  const voiesAfterSubmission = w2AppsSubmitted * borrowersPerApp;
  // voiesAtReverify used for re-verification calculations in future versions
  void (fundedLoans * borrowersPerApp);

  // Current state calculations
  const currentVOAs = voasDuringApp * CURRENT_VOA_CONVERSION;
  const currentSSV = currentVOAs * CURRENT_SSV_CONVERSION;
  const voiesRequiredAfterSSV = voiesAfterSubmission - (currentSSV * appSubmissionCR);
  const currentTWNInitial = voiesRequiredAfterSSV * CURRENT_TWN_CONVERSION;
  const currentTWNReverify = currentTWNInitial * ptRate;
  const currentTWNs = currentTWNInitial + currentTWNReverify;

  const currentVOACost = currentVOAs * VOA_COST;
  const currentTWNCost = currentTWNs * TWN_COST;
  const currentCost = currentVOACost + currentTWNCost;

  // Future state with Truv
  const truvVOAs = voasDuringApp * TRUV_VOA_CONVERSION;
  const truvSSV = truvVOAs * TRUV_SSV_CONVERSION;
  const truvVOIEs = voasDuringApp * w2Percent * TRUV_VOIE_CONVERSION;
  const voiesStillNeeded = voiesAfterSubmission - (truvSSV + truvVOIEs) * appSubmissionCR;
  const futureTWNInitial = Math.max(0, voiesStillNeeded * TRUV_TWN_CONVERSION);
  const futureTWNReverify = futureTWNInitial * ptRate;
  const remainingTWNs = futureTWNInitial + futureTWNReverify;

  const truvVOAFees = truvVOAs * TRUV_VOA_COST;
  const truvVOIEFees = truvVOIEs * TRUV_VOIE_COST;
  const futureTWNCost = remainingTWNs * TWN_COST;
  const futureCost = truvVOAFees + truvVOIEFees + futureTWNCost;

  // Calculate savings
  let annualSavings = currentCost - futureCost;

  // Adjust based on cost method if custom cost provided
  if (customCost && costMethod !== 'benchmark') {
    const benchmarkCostPerLoan = INDUSTRY_BENCHMARKS[industry];
    const adjustmentFactor = customCost / benchmarkCostPerLoan;

    if (costMethod === 'per_loan') {
      annualSavings = annualSavings * adjustmentFactor;
    } else if (costMethod === 'total_spend') {
      const impliedPerLoan = customCost / fundedLoans;
      annualSavings = annualSavings * (impliedPerLoan / benchmarkCostPerLoan);
    } else if (costMethod === 'per_verification') {
      // Rough estimate: average ~3 verifications per loan
      const impliedPerLoan = customCost * 3;
      annualSavings = annualSavings * (impliedPerLoan / benchmarkCostPerLoan);
    }
  }

  const savingsPerLoan = annualSavings / fundedLoans;
  const manualReduction = ((currentTWNs - remainingTWNs) / currentTWNs) * 100;

  return {
    annualSavings: Math.round(annualSavings),
    savingsPerLoan: Math.round(savingsPerLoan),
    manualReduction: Math.round(manualReduction),
    currentCost: Math.round(currentCost),
    futureCost: Math.round(futureCost),
    currentVOAs: Math.round(currentVOAs),
    currentTWNs: Math.round(currentTWNs),
    truvVOAs: Math.round(truvVOAs),
    truvVOIEs: Math.round(truvVOIEs),
    remainingTWNs: Math.round(remainingTWNs)
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}
