import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "../Input"
import { useRef, useState } from "react"

    enum ContentType  {
        Youtube = "Youtube",
        Twitter = "Twitter"
    }

export const CreateContentModal = ({open, onClose}) =>{
    const titleRef = useRef<HTMLInputElement>();
    
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube)

    function addContent(){
        const title = titleRef.current?.value
        const link  = linkRef.current?.value
    }


    return <div>
     
       {open && <div
       className="w-screen h-screen top-0 left-0 fixed bg-slate-500
       flex justify-center bg-opacity-60"
       >
        <div className="flex flex-col justify-center">
        <span className="bg-white opacity-100 p-4 rounded">
            <div className="flex justify-end">
                <div onClick={onClose}>
                <CrossIcon></CrossIcon>
                </div>
            </div>
            <div>
                <Input reference={titleRef} placeholder ={"Title"}></Input>
                <Input reference ={linkRef}placeholder = { "Link" }></Input>
            </div>
            <div>
                <h1>Type</h1>
                <div className="flex gap-1 p-4 justify-center">
             <Button text="Youtube" 
             variant={type===ContentType.Youtube ? "primary": "secondary"}
             onClick={()=>{setType(ContentType.Youtube)}}
             ></Button>
             <Button text="Twitter" 
             variant={type===ContentType.Twitter ? "primary": "secondary"}
             onClick={()=>{setType(ContentType.Twitter)}}
             ></Button>
             </div>
            </div>
            <div className="flex justify-center">
            <Button onClick = {addContent} variant="primary" text="Submit"></Button>
            </div>
        </span>
        </div>
        </div>}
       
    </div>
}

