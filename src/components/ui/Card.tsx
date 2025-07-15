import { ShareIcon } from "../icons/ShareIcon"
import { Youtube } from "../icons/Youtube"
import { Twitter } from "../icons/Twitter"
import { Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect } from "react"

interface CardProps {
    id: string,
    title: string,
    link: string,
    type: "Youtube" | "Twitter",
    onDelete: (id: string) => void
}

export const Card = (props: CardProps) => {
    function handleDelete() {
        props.onDelete(props.id);
    }

    useEffect(() => {
        // @ts-ignore
        const twttr = (window as any).twttr;
        if (props.type === "Twitter" && twttr && twttr.widgets) {
            twttr.widgets.load();
        }
    }, [props.link, props.type]);

    return (
        <motion.div
            className="w-full md:max-w-xs bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Header row */}
            <div className="flex items-center justify-between mb-3">
                {/* Type icon */}
                <div className="flex items-center gap-2">
                    {props.type === "Youtube" && <Youtube size={22} />}
                    {props.type === "Twitter" && <Twitter size={22} />}
                </div>
                {/* Title */}
                <div className="flex-1 mx-2 text-center">
                    <span className="font-semibold text-gray-900 truncate block max-w-[120px]">{props.title}</span>
                </div>
                {/* Share and Delete icons */}
                <div className="flex items-center gap-2">
                    <a href={props.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                        <ShareIcon size="md" />
                    </a>
                    <button onClick={handleDelete} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
            {/* Content area */}
            <div className="pt-2 w-full flex-1">
                {props.type === "Youtube" && (
                    <iframe
                        className="w-full aspect-video rounded-md border"
                        src={props.link.replace("watch", "embed").replace("?v=", "/")}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                )}
                {props.type === "Twitter" && (
                    <blockquote className="twitter-tweet w-full">
                        <a href={props.link.replace("x.com", "twitter.com")}></a>
                    </blockquote>
                )}
            </div>
        </motion.div>
    );
}