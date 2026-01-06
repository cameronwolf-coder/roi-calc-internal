import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-truv-blue rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-semibold text-dark text-lg">Truv</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray text-sm">ROI Calculator</span>
          <a
            href="https://www.truv.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="text-truv-blue hover:text-truv-blue-dark text-sm font-medium transition-colors"
          >
            Talk to Sales →
          </a>
        </div>
      </div>
    </motion.header>
  );
}
