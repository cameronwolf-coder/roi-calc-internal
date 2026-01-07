
import { useState, useMemo } from 'react';
import { RoiInputForm } from './components/RoiInputForm';
import { RoiResults } from './components/RoiResults';
import type { ROIInputs } from './utils/roiCalculator';
import { calculateROI } from './utils/roiCalculator';
import './App.css';

function App() {
  const [inputs, setInputs] = useState<ROIInputs>({
    fundedLoans: 2500,
    pullThroughRate: 0.7,
    e2eConversionRate: 0.5,
    borrowersPerApp: 1.5,
    w2BorrowerRate: 0.75,
  });

  const results = useMemo(() => calculateROI(inputs), [inputs]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Truv <span className="highlight">ROI Calculator</span></h1>
        <p>Estimate your savings by switching to the modern verification platform.</p>
      </header>

      <main className="calculator-layout">
        <section className="inputs-section">
          <RoiInputForm inputs={inputs} onChange={setInputs} />
        </section>

        <section className="results-section">
          <RoiResults results={results} />
        </section>
      </main>
    </div>
  );
}

export default App;
