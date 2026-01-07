import { motion } from 'framer-motion';
interface CalculatingSpinnerProps {
    isVisible: boolean;
}

export function CalculatingSpinner({ isVisible }: CalculatingSpinnerProps) {
    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-4"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 mx-auto border-4 border-truv-blue-light border-t-truv-blue rounded-full"
                />
                <div className="text-lg font-medium text-dark">Calculating your savings...</div>
            </motion.div>
        </motion.div>
    );
}
