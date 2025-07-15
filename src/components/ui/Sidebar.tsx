import { Twitter } from "../icons/Twitter"
import { Youtube } from "../icons/Youtube"
import { Sidebaritem } from "./Sidebaritem"
import { Brain, Menu, X, Home, BookOpen, Settings, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Sidebar = ({ onFilterType, activeType }: { onFilterType?: (type: string | null) => void, activeType?: string | null }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const toggleSidebar = () => setIsOpen(!isOpen)

    const sidebarVariants = {
        closed: {
            x: "-100%",
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30
            }
        },
        open: {
            x: 0,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        closed: { opacity: 0, x: -20 },
        open: { opacity: 1, x: 0 }
    }

    const overlayVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    }

    function handleLogout() {
        localStorage.clear();
        navigate("/signin");
    }

    function handleFilterClick(type: string | null) {
        if (onFilterType) {
            onFilterType(type);
        }
        if (isMobile) {
            setIsOpen(false);
        }
    }

    // Desktop Sidebar
    if (!isMobile) {
        return (
            <aside className="h-screen bg-white border-r border-gray-100 w-72 fixed left-0 top-0 px-6 py-8 flex flex-col font-['Inter'] z-30 shadow-sm">
                {/* Logo */}
                <motion.div 
                    className="flex items-center gap-3 mb-10 select-none"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.span 
                        className="inline-flex items-center justify-center w-10 h-10 bg-black rounded-xl"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Brain className="w-6 h-6 text-white" />
                    </motion.span>
                    <span className="text-2xl font-bold text-gray-900 tracking-tight">Brainly</span>
                </motion.div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2 mt-2 flex-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <Sidebaritem text="Home" icon={<Home size={22} />} isActive={!activeType} onClick={() => handleFilterClick(null)} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <Sidebaritem text="Twitter" icon={<Twitter size={22} />} isActive={activeType === "Twitter"} onClick={() => handleFilterClick("Twitter")} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <Sidebaritem text="Youtube" icon={<Youtube size={22} />} isActive={activeType === "Youtube"} onClick={() => handleFilterClick("Youtube")} />
                    </motion.div>
                </nav>

                {/* Bottom section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="space-y-2"
                >
                    <Sidebaritem text="Logout" icon={<LogOut size={22} />} onClick={handleLogout} />
                </motion.div>
            </aside>
        )
    }

    // Mobile Sidebar with Hamburger
    return (
        <>
            {/* Hamburger Button */}
            <motion.button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 p-3 bg-black text-white rounded-xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Menu size={24} />
            </motion.button>

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40"
                        variants={overlayVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        onClick={toggleSidebar}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        className="fixed inset-0 z-50 bg-white flex flex-col font-['Inter']"
                        variants={sidebarVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        {/* Header */}
                        <motion.div 
                            className="flex items-center justify-between p-6 border-b border-gray-100"
                            variants={itemVariants}
                        >
                            <div className="flex items-center gap-3">
                                <motion.span 
                                    className="inline-flex items-center justify-center w-10 h-10 bg-black rounded-xl"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    <Brain className="w-6 h-6 text-white" />
                                </motion.span>
                                <span className="text-2xl font-bold text-gray-900 tracking-tight">Brainly</span>
                            </div>
                            <motion.button
                                onClick={toggleSidebar}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <X size={24} />
                            </motion.button>
                        </motion.div>

                        {/* Navigation */}
                        <nav className="flex flex-col gap-2 p-6 flex-1">
                            <motion.div variants={itemVariants}>
                                <Sidebaritem text="Home" icon={<Home size={24} />} isActive={!activeType} onClick={() => handleFilterClick(null)} />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <Sidebaritem text="Twitter" icon={<Twitter size={24} />} isActive={activeType === "Twitter"} onClick={() => handleFilterClick("Twitter")} />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <Sidebaritem text="Youtube" icon={<Youtube size={24} />} isActive={activeType === "Youtube"} onClick={() => handleFilterClick("Youtube")} />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <Sidebaritem text="Logout" icon={<LogOut size={24} />} onClick={handleLogout} />
                            </motion.div>
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    )
}