
import React from 'react';
import type { ROIInputs } from '../utils/roiCalculator';

interface Props {
    inputs: ROIInputs;
    onChange: (inputs: ROIInputs) => void;
}

export const RoiInputForm: React.FC<Props> = ({ inputs, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({
            ...inputs,
            [name]: parseFloat(value),
        });
    };

    return (
        <div className="card input-card">
            <h2>Calculator Inputs</h2>
            <div className="input-group">
                <label>
                    Funded Loans (Annually)
                    <input
                        type="number"
                        name="fundedLoans"
                        value={inputs.fundedLoans}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div className="input-group">
                <label>
                    Pull-through Rate (%)
                    <input
                        type="number"
                        name="pullThroughRate"
                        step="0.01"
                        value={inputs.pullThroughRate}
                        onChange={handleChange}
                    />
                    <span className="helper">Apps Submitted → Funded (e.g., 0.7)</span>
                </label>
            </div>

            <div className="input-group">
                <label>
                    E2E Conversion Rate
                    <input
                        type="number"
                        name="e2eConversionRate"
                        step="0.01"
                        value={inputs.e2eConversionRate}
                        onChange={handleChange}
                    />
                    <span className="helper">Apps Started → Funded (e.g., 0.5)</span>
                </label>
            </div>

            <div className="input-row">
                <label>
                    Borrowers per App
                    <input
                        type="number"
                        name="borrowersPerApp"
                        step="0.1"
                        value={inputs.borrowersPerApp}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    W-2 Borrower Rate
                    <input
                        type="number"
                        name="w2BorrowerRate"
                        step="0.01"
                        value={inputs.w2BorrowerRate}
                        onChange={handleChange}
                    />
                </label>
            </div>
        </div>
    );
};
