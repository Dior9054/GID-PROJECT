
import { InputHTMLAttributes, useState } from "react"

interface BlockProps extends InputHTMLAttributes<HTMLInputElement> {
    LogIn?: any,
    error?: any,
    PAssword?: any,
    args?: any
}

export default function InputBase({ LogIn, error, PAssword, ...args }: BlockProps) {
    const [hidshow, setHidSho] = useState(false)

    const handle__Password = () => {
        setHidSho(prev => !prev)
    }

    return (
        <div className={`flex flex-col ${!!LogIn ? "mb-[8px]" : !!error ? "mb-[8px]" : ""}`}>
            <div className={`h-[54px] rounded-[32px] border border-solid border-[#1083E666] px-[32px] flex items-center gap-[15px] ${!!error ? "border-[#EB5757]" : ""}`}>
                <input {...args} type={!!PAssword ? !hidshow ? "password" : "text" : args.type} className={`text-[#212121] placeholder:opacity-[40%] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none ${!!error ? "text-[#EB5757]" : ""}`} />
                {
                    !!PAssword
                    &&
                    <button type="button" onClick={handle__Password}>
                        {
                            !!hidshow
                                ?
                                <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.61342 5.97513C1.52262 5.83137 1.47723 5.75949 1.45182 5.64862C1.43273 5.56534 1.43273 5.43401 1.45182 5.35073C1.47723 5.23986 1.52262 5.16798 1.61341 5.02422C2.36369 3.83624 4.59693 0.833008 8.00027 0.833008C11.4036 0.833008 13.6369 3.83623 14.3871 5.02422C14.4779 5.16798 14.5233 5.23986 14.5487 5.35073C14.5678 5.43401 14.5678 5.56534 14.5487 5.64862C14.5233 5.75949 14.4779 5.83137 14.3871 5.97513C13.6369 7.16311 11.4036 10.1663 8.00027 10.1663C4.59693 10.1663 2.36369 7.16311 1.61342 5.97513Z" stroke={!!error ? "#EB5757" : "#1083E6"} strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8.00027 7.49967C9.10484 7.49967 10.0003 6.60424 10.0003 5.49967C10.0003 4.39511 9.10484 3.49967 8.00027 3.49967C6.8957 3.49967 6.00027 4.39511 6.00027 5.49967C6.00027 6.60424 6.8957 7.49967 8.00027 7.49967Z" stroke={!!error ? "#EB5757" : "#1083E6"} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                :
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.16196 2.39488C7.4329 2.35482 7.7124 2.33333 8.00028 2.33333C11.4036 2.33333 13.6369 5.33656 14.3871 6.52455C14.4779 6.66833 14.5233 6.74023 14.5488 6.85112C14.5678 6.93439 14.5678 7.06578 14.5487 7.14905C14.5233 7.25993 14.4776 7.3323 14.3861 7.47705C14.1862 7.79343 13.8814 8.23807 13.4777 8.7203M4.48288 3.47669C3.0415 4.45447 2.06297 5.81292 1.61407 6.52352C1.52286 6.66791 1.47725 6.74011 1.45183 6.85099C1.43273 6.93426 1.43272 7.06563 1.45181 7.14891C1.47722 7.25979 1.52262 7.33168 1.61342 7.47545C2.36369 8.66344 4.59694 11.6667 8.00028 11.6667C9.37255 11.6667 10.5546 11.1784 11.5259 10.5177M2.00028 1L14.0003 13M6.58606 5.58579C6.22413 5.94772 6.00028 6.44772 6.00028 7C6.00028 8.10457 6.89571 9 8.00028 9C8.55256 9 9.05256 8.77614 9.41449 8.41421" stroke={!!error ? "#EB5757" : "#1083E6"} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                        }
                    </button>
                }
            </div>
            {
                !LogIn
                &&
                <p className="px-[32px] text-[#EB5757] font-inter font-[400] text-[14px] leading-[18px] mt-[8px]">{error}</p>
            }
        </div>
    )
}
