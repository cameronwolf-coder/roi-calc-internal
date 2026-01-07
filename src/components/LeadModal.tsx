import { motion } from 'framer-motion';
import { useState } from 'react';
import type { LeadFormData } from '../types';

interface LeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: LeadFormData) => void;
}

export function LeadModal({ isOpen, onClose, onSubmit }: LeadModalProps) {
    const [step, setStep] = useState(1);
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

    const goToStep2 = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const goToStep1 = () => {
        setStep(1);
    };

    if (!isOpen) return null;

    const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-truv-blue focus:border-truv-blue outline-none transition-all text-gray-900";
    const selectClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-truv-blue focus:border-truv-blue outline-none transition-all text-gray-900 bg-white";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 overflow-y-auto max-h-[90vh]"
            >
                {/* Step Dots */}
                <div className="flex justify-center gap-2 mb-6">
                    <div className={`w-2 h-2 rounded-full transition-all ${step === 1 ? 'bg-truv-blue w-6' : 'bg-gray-200'}`} />
                    <div className={`w-2 h-2 rounded-full transition-all ${step === 2 ? 'bg-truv-blue w-6' : 'bg-gray-200'}`} />
                </div>

                {step === 1 ? (
                    /* Step 1: Who are you? */
                    <form onSubmit={goToStep2}>
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Who are you?</h2>
                            <p className="text-gray-500">Get your personalized ROI report</p>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Full Name</label>
                                    <input
                                        name="name"
                                        placeholder="John Smith"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Work Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="john@company.com"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Job Title</label>
                                    <input
                                        name="jobTitle"
                                        placeholder="VP of Operations"
                                        required
                                        value={formData.jobTitle}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Phone</label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        placeholder="(555) 123-4567"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 rounded-full bg-truv-blue text-white font-semibold text-lg hover:bg-truv-blue-dark transition-all transform hover:scale-[1.01] mt-6 flex items-center justify-center gap-2"
                        >
                            Continue
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </form>
                ) : (
                    /* Step 2: Company Details */
                    <form onSubmit={handleSubmit}>
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Details</h2>
                            <p className="text-gray-500">Help us personalize your analysis</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Company Name</label>
                                <input
                                    name="company"
                                    placeholder="Acme Lending"
                                    required
                                    value={formData.company}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>LOS System</label>
                                    <select
                                        name="losSystem"
                                        value={formData.losSystem}
                                        onChange={handleChange}
                                        className={selectClass}
                                    >
                                        <option value="">Select LOS</option>
                                        <option value="encompass">Encompass (ICE)</option>
                                        <option value="bytepro">Byte Pro</option>
                                        <option value="meridianlink">MeridianLink</option>
                                        <option value="blackknight">Black Knight</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>POS System</label>
                                    <select
                                        name="posSystem"
                                        value={formData.posSystem}
                                        onChange={handleChange}
                                        className={selectClass}
                                    >
                                        <option value="">Select POS</option>
                                        <option value="blend">Blend</option>
                                        <option value="encompassconsumerconnect">Encompass CC</option>
                                        <option value="floify">Floify</option>
                                        <option value="simplenexus">SimpleNexus</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                type="button"
                                onClick={goToStep1}
                                className="px-6 py-4 rounded-full border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-4 rounded-full bg-truv-blue text-white font-semibold text-lg hover:bg-truv-blue-dark transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2"
                            >
                                Get My Report
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                            </button>
                        </div>
                    </form>
                )}

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </motion.div>
        </div>
    );
}
