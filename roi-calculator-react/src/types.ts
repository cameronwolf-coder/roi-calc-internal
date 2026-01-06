export interface FormData {
  fundedLoans: number;
  industry: 'mortgage' | 'credit_union' | 'consumer' | 'auto';
}

export interface CostMethod {
  id: 'benchmark' | 'per_loan' | 'total_spend' | 'per_verification';
  label: string;
  description: string;
  icon: string;
}

export interface AdvancedInputs {
  retailPercent: number;
  wholesalePercent: number;
  borrowersPerApp: number;
  endToEndCR: number;
  pullThroughRate: number;
  w2Rate: number;
}

export interface LeadFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  jobTitle: string;
  losSystem: string;
  posSystem: string;
}

export interface CalculationResults {
  annualSavings: number;
  savingsPerLoan: number;
  manualReduction: number;
  currentCost: number;
  futureCost: number;
  currentVOAs: number;
  currentTWNs: number;
  truvVOAs: number;
  truvVOIEs: number;
  remainingTWNs: number;
}

export type Step = 0 | 1 | 2;
