import { motion } from 'framer-motion';
import { useState } from 'react';
import type { LeadFormData } from '../types';

interface LeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: LeadFormData) => void;
}

export function LeadModal({ isOpen, onClose, onSubmit }: LeadModalProps) {
    const [formData, setFormData] = useState<LeadFormData>({
        name: '',
        company: '',
        email: '',
        phone: '',
        jobTitle: '',
        losSystem: '',
        posSystem: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 overflow-y-auto max-h-[90vh]"
            >
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-dark mb-2">Get Your Custom ROI Report</h2>
                    <p className="text-gray">
                        Enter your details to unlock the full breakdown and download the PDF report.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <input
                            name="name"
                            placeholder="Full Name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-truv-blue focus:border-truv-blue outline-none transition-all"
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Work Email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-truv-blue focus:border-truv-blue outline-none transition-all"
                        />
                        <input
                            name="company"
                            placeholder="Company Name"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-truv-blue focus:border-truv-blue outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 rounded-full bg-truv-blue text-white font-semibold text-lg hover:bg-truv-blue-dark transition-all transform hover:scale-[1.01] mt-4"
                    >
                        Unlock Report
                    </button>
                </form>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

            </motion.div>
        </div>
    );
}
