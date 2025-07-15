import { Twitter } from "../icons/Twitter"
import { Youtube } from "../icons/Youtube"
import { Sidebaritem } from "./Sidebaritem"

export const Sidebar = () =>{
    return <div className="h-screen bg-white border-r w-72
    fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8">
            Brainly
        </div>
        <div className="pt-8 pl-4">
            <Sidebaritem text="Twitter" icon={<Twitter></Twitter>}></Sidebaritem>
            <Sidebaritem text="Youtube" icon={<Youtube></Youtube>}></Sidebaritem>
        </div>
    </div>
}