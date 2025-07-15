import type { ReactElement } from "react"
import { motion } from "framer-motion"

export const Sidebaritem = ({text, icon, isActive = false, onClick}: {
    text: string,
    icon: ReactElement,
    isActive?: boolean,
    onClick?: () => void
}) => {
    return (
        <motion.div 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 group relative overflow-hidden ${
                isActive 
                    ? 'bg-black text-white shadow-lg hover:text-white' 
                    : 'hover:bg-gray-50'
            }`}
            whileHover={{ 
                scale: isActive ? 1 : 1.02,
                x: isActive ? 0 : 4
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
        >
            {/* Background animation on hover */}
            {!isActive && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl opacity-0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                />
            )}
            
            {/* Icon */}
            <div className="relative z-10 flex items-center justify-center">
                {icon}
            </div>
            
            {/* Text */}
            <span className="relative z-10 font-semibold">{text}</span>
            
            {/* Active indicator */}
            {isActive && (
                <motion.div
                    className="absolute right-2 w-2 h-2 bg-white rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                />
            )}
        </motion.div>
    )
}