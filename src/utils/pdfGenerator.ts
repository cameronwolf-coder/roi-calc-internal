import jsPDF from 'jspdf';
import type { CalculationResults, AdvancedInputs } from '../types';
import { formatCurrency, formatNumber, formatPercent } from './calculations';

// Truv Brand Colors
const TRUV_BLUE = '#2C64E3';
const TRUV_DARK_BLUE = '#0F1C47';
const TRUV_BLACK = '#171717';
const TRUV_LIGHT_BLUE = '#C5D9F7';

export function generateROIReport(
    results: CalculationResults,
    fundedLoans: number,
    advancedInputs: AdvancedInputs
): void {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let y = margin;

    // Helper functions
    const drawLine = (yPos: number, color = '#e5e5e5') => {
        doc.setDrawColor(color);
        doc.setLineWidth(0.3);
        doc.line(margin, yPos, pageWidth - margin, yPos);
    };

    const centerText = (text: string, yPos: number, fontSize: number, color: string, fontStyle: 'normal' | 'bold' = 'normal') => {
        doc.setFontSize(fontSize);
        doc.setTextColor(color);
        doc.setFont('helvetica', fontStyle);
        doc.text(text, pageWidth / 2, yPos, { align: 'center' });
    };

    // Header with Truv branding
    doc.setFillColor(TRUV_DARK_BLUE);
    doc.rect(0, 0, pageWidth, 40, 'F');

    // Truv logo text (simplified since we can't embed SVG easily)
    doc.setFontSize(28);
    doc.setTextColor('#FFFFFF');
    doc.setFont('helvetica', 'bold');
    doc.text('truv', margin, 26);

    // Report title
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('ROI Calculator Report', pageWidth - margin, 26, { align: 'right' });

    y = 55;

    // Main headline
    centerText('Your Potential Savings', y, 24, TRUV_BLACK, 'bold');
    y += 15;

    // Big savings number
    centerText(formatCurrency(results.annualSavings), y, 42, TRUV_BLUE, 'bold');
    y += 10;
    centerText('per year', y, 12, '#6b7280');
    y += 12;

    // Subtitle
    doc.setFontSize(11);
    doc.setTextColor('#374151');
    doc.setFont('helvetica', 'normal');
    const subtitle = `Based on a ${formatCurrency(results.savingsPerLoan)} cost reduction per loan at ${formatNumber(fundedLoans)} loans/year`;
    doc.text(subtitle, pageWidth / 2, y, { align: 'center' });
    y += 20;

    drawLine(y);
    y += 15;

    // Cost Comparison Section
    doc.setFontSize(14);
    doc.setTextColor(TRUV_BLACK);
    doc.setFont('helvetica', 'bold');
    doc.text('Cost Comparison', margin, y);
    y += 12;

    // Current Cost Box
    doc.setFillColor('#f9fafb');
    doc.roundedRect(margin, y, (pageWidth - margin * 2 - 10) / 2, 35, 3, 3, 'F');

    doc.setFontSize(10);
    doc.setTextColor('#6b7280');
    doc.setFont('helvetica', 'normal');
    doc.text('CURRENT COST', margin + 10, y + 10);

    doc.setFontSize(20);
    doc.setTextColor(TRUV_BLACK);
    doc.setFont('helvetica', 'bold');
    doc.text(formatCurrency(results.currentCost), margin + 10, y + 24);

    doc.setFontSize(9);
    doc.setTextColor('#9ca3af');
    doc.setFont('helvetica', 'normal');
    doc.text('Legacy Process', margin + 10, y + 31);

    // Truv Cost Box
    const truvBoxX = margin + (pageWidth - margin * 2 - 10) / 2 + 10;
    doc.setFillColor('#EFF6FF');
    doc.roundedRect(truvBoxX, y, (pageWidth - margin * 2 - 10) / 2, 35, 3, 3, 'F');

    // Blue accent line
    doc.setFillColor(TRUV_BLUE);
    doc.rect(truvBoxX, y, (pageWidth - margin * 2 - 10) / 2, 2, 'F');

    doc.setFontSize(10);
    doc.setTextColor(TRUV_BLUE);
    doc.setFont('helvetica', 'normal');
    doc.text('TRUV COST', truvBoxX + 10, y + 12);

    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(formatCurrency(results.futureCost), truvBoxX + 10, y + 26);

    doc.setFontSize(9);
    doc.setTextColor('#9ca3af');
    doc.setFont('helvetica', 'normal');
    doc.text('PFL Bundle + Fallback', truvBoxX + 10, y + 33);

    y += 50;

    // Verification Breakdown Section
    doc.setFontSize(14);
    doc.setTextColor(TRUV_BLACK);
    doc.setFont('helvetica', 'bold');
    doc.text('How Truv Handles Your Verifications', margin, y);

    // Less TWN badge
    doc.setFillColor('#DCFCE7');
    const badgeText = `${formatPercent(results.manualReduction)} less TWN usage`;
    const badgeWidth = doc.getTextWidth(badgeText) + 10;
    doc.roundedRect(pageWidth - margin - badgeWidth - 5, y - 5, badgeWidth + 10, 8, 2, 2, 'F');
    doc.setFontSize(9);
    doc.setTextColor('#166534');
    doc.setFont('helvetica', 'bold');
    doc.text(badgeText, pageWidth - margin - 5, y, { align: 'right' });

    y += 15;

    // Verification items
    const verificationItems = [
        {
            title: 'Income verified by Truv',
            description: 'Direct payroll connections via 1,700+ employers',
            value: formatNumber(results.truvVOIEs),
            isTruv: true
        },
        {
            title: 'Assets verified by Truv',
            description: 'Direct bank connections via 16,000+ institutions',
            value: formatNumber(results.truvVOAs),
            isTruv: true
        },
        {
            title: 'TWN fallback required',
            description: 'Manual process when direct isn\'t available',
            value: formatNumber(results.remainingTWNs),
            isTruv: false
        }
    ];

    verificationItems.forEach((item) => {
        const boxHeight = 18;

        if (item.isTruv) {
            doc.setFillColor('#FFFFFF');
            doc.setDrawColor(TRUV_LIGHT_BLUE);
            doc.roundedRect(margin, y, pageWidth - margin * 2, boxHeight, 2, 2, 'FD');
        } else {
            doc.setFillColor('#f3f4f6');
            doc.roundedRect(margin, y, pageWidth - margin * 2, boxHeight, 2, 2, 'F');
        }

        // Checkmark or clock icon indicator
        const iconX = margin + 6;
        const iconY = y + 5;
        if (item.isTruv) {
            doc.setFillColor(TRUV_LIGHT_BLUE);
            doc.circle(iconX + 4, iconY + 4, 4, 'F');
            doc.setDrawColor(TRUV_BLUE);
            doc.setLineWidth(0.8);
            doc.line(iconX + 2, iconY + 4, iconX + 4, iconY + 6);
            doc.line(iconX + 4, iconY + 6, iconX + 7, iconY + 2);
        } else {
            doc.setFillColor('#e5e7eb');
            doc.circle(iconX + 4, iconY + 4, 4, 'F');
            doc.setDrawColor('#9ca3af');
            doc.setLineWidth(0.5);
            doc.circle(iconX + 4, iconY + 4, 3, 'S');
        }

        // Title
        doc.setFontSize(11);
        doc.setTextColor(item.isTruv ? TRUV_BLACK : '#374151');
        doc.setFont('helvetica', 'bold');
        doc.text(item.title, margin + 18, y + 7);

        // Description
        doc.setFontSize(8);
        doc.setTextColor('#6b7280');
        doc.setFont('helvetica', 'normal');
        doc.text(item.description, margin + 18, y + 13);

        // Value
        doc.setFontSize(12);
        doc.setTextColor(item.isTruv ? TRUV_BLUE : '#6b7280');
        doc.setFont('helvetica', 'bold');
        doc.text(item.value, pageWidth - margin - 5, y + 10, { align: 'right' });

        y += boxHeight + 4;
    });

    y += 10;
    drawLine(y);
    y += 15;

    // Assumptions Section
    doc.setFontSize(14);
    doc.setTextColor(TRUV_BLACK);
    doc.setFont('helvetica', 'bold');
    doc.text('Calculation Assumptions', margin, y);
    y += 10;

    doc.setFontSize(10);
    doc.setTextColor('#374151');
    doc.setFont('helvetica', 'normal');

    const assumptions = [
        ['Funded Loans', formatNumber(fundedLoans) + '/year'],
        ['Retail vs Wholesale', `${advancedInputs.retailPercent}% / ${advancedInputs.wholesalePercent}%`],
        ['Borrowers per Application', advancedInputs.borrowersPerApp.toFixed(1)],
        ['End-to-End Conversion Rate', `${advancedInputs.endToEndCR}%`],
        ['Pull-Through Rate', `${advancedInputs.pullThroughRate}%`],
        ['W-2 Borrower Rate', `${advancedInputs.w2Rate}%`]
    ];

    assumptions.forEach(([label, value]) => {
        doc.setTextColor('#6b7280');
        doc.text(label, margin, y);
        doc.setTextColor(TRUV_BLACK);
        doc.text(value, pageWidth - margin, y, { align: 'right' });
        y += 7;
    });

    // Footer
    y = pageHeight - 20;
    drawLine(y - 5);

    doc.setFontSize(9);
    doc.setTextColor('#9ca3af');
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, y);
    doc.text('truv.com', pageWidth - margin, y, { align: 'right' });

    // Download the PDF
    doc.save(`truv-roi-report-${new Date().toISOString().split('T')[0]}.pdf`);
}
