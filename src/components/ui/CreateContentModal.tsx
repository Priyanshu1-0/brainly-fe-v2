import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "../Input"
import { useRef, useState } from "react"
import { BACKEND_URL } from "../../config"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"

    enum ContentType  {
        Youtube = "Youtube",
        Twitter = "Twitter"
    }

export const CreateContentModal = ({open, onClose}) =>{
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube)

    async function addContent(){
        const title = titleRef.current?.value
        const link  = linkRef.current?.value

        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            link,
            title,
            type
        },{
            headers:{
                "Authorization": localStorage.getItem("token")
            }
        })
        onClose();
    }

    // Close modal on overlay click
    function handleOverlayClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (e.target === e.currentTarget) onClose();
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleOverlayClick}
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-2 font-['Inter'] relative"
                        initial={{ scale: 0.95, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 40 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <CrossIcon />
                        </button>
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Add Content</h2>
                        </div>
                        <div className="space-y-4">
                            <Input reference={titleRef} placeholder ={"Title"} />
                            <Input reference={linkRef} placeholder = { "Link" } />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Type</h3>
                            <div className="flex gap-2 justify-center">
                                <Button text="Youtube" 
                                    variant={type===ContentType.Youtube ? "primary": "secondary"}
                                    onClick={()=>{setType(ContentType.Youtube)}}
                                    size="sm"
                                />
                                <Button text="Twitter" 
                                    variant={type===ContentType.Twitter ? "primary": "secondary"}
                                    onClick={()=>{setType(ContentType.Twitter)}}
                                    size="sm"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <Button onClick={addContent} variant="primary" text="Submit" size="md" fullWidth={true} />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

