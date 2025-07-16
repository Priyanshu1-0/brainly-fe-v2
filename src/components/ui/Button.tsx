import type { ReactElement } from "react";

type Variants = "primary" | "secondary"
export interface ButtonProps {
    variant: Variants;
    size?: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void
    fullWidth?: boolean
    loading?: boolean
}

const defaultStyles = "rounded-md p-2 flex items-center font-light" 

const sizeStyles = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6"
}

const variantStyles ={
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-600"
}

export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${defaultStyles}
    ${sizeStyles[props.size || "md"]} ${props.fullWidth ? " w-full flex justify-center items-center" : ""}
    ${props.loading? "opacity-45" : ""}`} disabled={props.loading}>
       {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.text} {props.endIcon}    
    </button>
}