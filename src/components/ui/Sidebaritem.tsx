import type { ReactElement } from "react"

export const Sidebaritem = ({text, icon}: {
    text: string,
    icon: ReactElement
}) => {
    return <div className="flex text-gray-700 py-2 cursor-pointer
    hover:bg-slate-100 rounded max-w-48 p-4 transition-all duration-150
    ">
        <div className="pr-2">
        {icon}
        </div>
        <div>
        {text}
        </div>
    </div>
}