import { InputHTMLAttributes } from "react";

interface BlockDataProps extends InputHTMLAttributes<HTMLInputElement> {
    children: any,
    className?: string,
    args?: any
}

export default function WhiteBlock({ children, className, ...args }: BlockDataProps) {
    return (
        <div className={`flex items-center gap-[4px] bg-white h-[48px] px-[24px] rounded-[24px] cursor-pointer ${className}`} {...args}>
            {
                children
            }
        </div>
    )
}
