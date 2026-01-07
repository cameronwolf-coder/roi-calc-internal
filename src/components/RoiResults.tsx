
import React from 'react';
import type { ROIOutputs } from '../utils/roiCalculator';

interface Props {
    results: ROIOutputs;
}

const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

export const RoiResults: React.FC<Props> = ({ results }) => {
    return (
        <div className="card results-card">
            <div className="savings-highlight">
                <h3>Estimated Annual Savings</h3>
                <div className="savings-amount">{formatCurrency(results.annualSavings)}</div>
                <div className="savings-percent">{results.savingsPercent.toFixed(1)}% Reduction</div>
                <div className="savings-per-loan">{formatCurrency(results.savingsPerLoan)} / loan</div>
            </div>

            <div className="summary-grid">
                <div className="summary-item">
                    <span className="label">Current Cost</span>
                    <span className="value text-danger">{formatCurrency(results.totalCurrentCost)}</span>
                </div>
                <div className="summary-item">
                    <span className="label">Truv Cost</span>
                    <span className="value text-success">{formatCurrency(results.totalTruvCost)}</span>
                </div>
            </div>

            <div className="breakdown-table">
                <h4>Cost Breakdown</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Current</th>
                            <th>With Truv</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>VOA (Checks)</td>
                            <td>{formatCurrency(results.currentVOACost)}</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>VOIE (Income)</td>
                            <td>—</td>
                            <td>{formatCurrency(results.truvVOIECost)} (Bundle)</td>
                        </tr>
                        <tr>
                            <td>TWN (Legacy)</td>
                            <td>{formatCurrency(results.currentTWNCost)}</td>
                            <td>{formatCurrency(results.truvTWNCost)}</td>
                        </tr>
                        <tr className="total-row">
                            <td>Total</td>
                            <td>{formatCurrency(results.totalCurrentCost)}</td>
                            <td>{formatCurrency(results.totalTruvCost)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
