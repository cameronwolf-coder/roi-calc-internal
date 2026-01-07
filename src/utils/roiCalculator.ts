
export interface ROIInputs {
    fundedLoans: number;
    pullThroughRate: number; // e.g., 0.7
    e2eConversionRate: number; // e.g., 0.5
    borrowersPerApp: number; // e.g., 1.5
    w2BorrowerRate: number; // e.g., 0.75
    // retailWholesaleSplit not effectively used in simple calc but kept if needed
}

export interface ROIOutputs {
    annualSavings: number;
    savingsPercent: number;
    savingsPerLoan: number;

    // Legacy / Current
    currentVOAs: number;
    currentVOACost: number;
    currentTWNTotal: number;
    currentTWNCost: number;
    totalCurrentCost: number;

    // Truv
    truvVOAs: number;
    truvVOACost: number; // Bundled
    truvVOIEs: number;
    truvVOIECost: number; // The PFL Bundle Price
    truvTWNTotal: number;
    truvTWNCost: number;
    totalTruvCost: number;
}

// Pricing Tiers (Per Funded Loan)
// Source: Internal Google Sheet Analysis
const PRICING_TIERS = [
    { max: 1999, bundle: 70 },
    { max: 2999, bundle: 67.50 },
    { max: 4499, bundle: 62.50 },
    { max: 7499, bundle: 60.00 },
    { max: 9999, bundle: 55.00 },
    { max: 14999, bundle: 52.50 },
    { max: 24999, bundle: 45.00 },
    { max: 34999, bundle: 40.00 },
    { max: 49999, bundle: 35.00 },
    { max: Infinity, bundle: 30.00 },
];

export const calculateROI = (inputs: ROIInputs): ROIOutputs => {
    const {
        fundedLoans,
        pullThroughRate,
        e2eConversionRate,
        borrowersPerApp,
        w2BorrowerRate,
    } = inputs;

    const retailPct = 1.0; // Assume 100% Retail for ROI calculation as verified

    // --- Volume Metrics ---
    const appsStarted = Math.round(fundedLoans / e2eConversionRate);
    const appsSubmitted = Math.round(fundedLoans / pullThroughRate);
    const appSubmitCR = e2eConversionRate / pullThroughRate;
    const w2AppsSubmitted = appsSubmitted * w2BorrowerRate;

    // Verification Opportunities (Scaled)
    const voasDuringApp = appsStarted * borrowersPerApp * retailPct;
    const voiesDuringApp = appsStarted * w2BorrowerRate * borrowersPerApp * retailPct;
    const voiesAfterSubmit = w2AppsSubmitted * borrowersPerApp * retailPct;

    // Defaults
    const defaults = {
        voaCost: 10,
        twnCost: 62,
    };

    // --- Legacy Cost (Waterfall) ---
    const voaConvCurrent = 0.50;
    const ssvConvCurrent = 0.20;
    const twnConvCurrent = 0.60;

    const currentVOAs = voasDuringApp * voaConvCurrent;
    const currentSSV = currentVOAs * ssvConvCurrent;
    const voiesNeededAfterSSV = voiesAfterSubmit - (currentSSV * appSubmitCR);

    const currentTWNInitial = voiesNeededAfterSSV * twnConvCurrent;
    const currentTWNReverify = currentTWNInitial * pullThroughRate;

    const currentVOACost = currentVOAs * defaults.voaCost;
    const currentTWNCost = (currentTWNInitial + currentTWNReverify) * defaults.twnCost;
    const totalCurrentCost = currentVOACost + currentTWNCost;

    // --- Future State (Truv PFL Bundle + Funnel Fallback) ---
    // Using Corrected Funnel Logic (42% Success, 36% Fallback)
    const voaConvTruv = 0.60;
    const ssvConvTruv = 0.24;
    const voieConvTruv = 0.42;
    const twnConvReduced = 0.36;

    const truvVOAs = voasDuringApp * voaConvTruv;
    const truvSSV = truvVOAs * ssvConvTruv;
    const truvVOIEs = voiesDuringApp * voieConvTruv;

    // Calculate remaining volume for TWN fallback
    const voiesStillNeeded = voiesAfterSubmit - ((truvSSV + truvVOIEs) * appSubmitCR);
    const truvTWNInitial = Math.max(0, voiesStillNeeded * twnConvReduced);
    const truvTWNReverify = truvTWNInitial * pullThroughRate;

    // Cost Calculation

    // A. Bundle Cost
    const tier = PRICING_TIERS.find(t => fundedLoans <= t.max) || PRICING_TIERS[PRICING_TIERS.length - 1];
    const truvPflPrice = tier.bundle;
    const truvBundleCost = fundedLoans * truvPflPrice;

    // B. Fallback Cost
    const truvFallbackCost = (truvTWNInitial + truvTWNReverify) * defaults.twnCost;

    const totalTruvCost = truvBundleCost + truvFallbackCost;

    const annualSavings = totalCurrentCost - totalTruvCost;
    const savingsPercent = totalCurrentCost > 0 ? (annualSavings / totalCurrentCost) * 100 : 0;
    const savingsPerLoan = fundedLoans > 0 ? annualSavings / fundedLoans : 0;

    return {
        annualSavings,
        savingsPercent,
        savingsPerLoan,
        currentVOAs,
        currentVOACost,
        currentTWNTotal: currentTWNInitial + currentTWNReverify,
        currentTWNCost,
        totalCurrentCost,
        truvVOAs,
        truvVOACost: 0,
        truvVOIEs,
        truvVOIECost: truvBundleCost,
        truvTWNTotal: truvTWNInitial + truvTWNReverify,
        truvTWNCost: truvFallbackCost,
        totalTruvCost,
    };
};
