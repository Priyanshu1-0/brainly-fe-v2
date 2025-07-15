import { ShareIcon } from "../icons/ShareIcon"

    interface CardProps {
        title: string,
        link: string,
        type: "Youtube" | "Twitter"
    }

export const Card = (props: CardProps) =>{
    return<div>
        <div className="p-4 bg-white rounded-md border-gray-200 
        max-w-72 border min-h-48 min-w-72
        ">
            <div className="flex justify-between items-center">
                <div className="flex items-center text-md">
                    <div className="pr-4 text-gray-500">
                    <ShareIcon size="md"></ShareIcon>
                    </div>
                    {props.title}
                </div>
                <div className="flex items-center">
                    <div className="pr-4 text-gray-500">
                        <a href={props.link} target="_blank">
                        <ShareIcon size="md"></ShareIcon>
                        </a>
                    </div>
                    <div className="text-gray-500">
                    <ShareIcon size="md"></ShareIcon>
                    </div>
                </div>

            </div>
            <div className="pt-4">  

            {props.type === "Youtube" &&   <iframe className="w-full" 
            src={props.link.replace("watch","embed").replace("?v=","/")} 
            title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; 
            clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
            
            {props.type === "Twitter" && <blockquote className="twitter-tweet">
<a href={props.link.replace("x.com","twitter.com")}>
</a></blockquote> }
            </div>
        </div>
    </div>
}