import { InputHTMLAttributes } from "react";

interface BlockProps extends InputHTMLAttributes<HTMLInputElement> {
    children: any,
    className?: string,
    args?: any
}

export default function BlueBlock({ children, className, ...args }: BlockProps) {
    return (
        <div className="w-[54px] h-[48px] bg-[#1083E6] flex items-center justify-center rounded-[24px]" {...args}>
            {
                children
            }
        </div>
    )
}
