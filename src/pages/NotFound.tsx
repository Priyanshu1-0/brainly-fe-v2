import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Brain, Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4 relative overflow-hidden font-['Inter']">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gray-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gray-300 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md text-center"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-2xl mb-6 shadow-lg"
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4 tracking-tight">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-600 text-lg">Sorry, the page you're looking for doesn't exist.</p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 bg-black text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
          >
            <Home size={18} />
            <span>Go to Dashboard</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
} 