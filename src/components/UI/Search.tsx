
import { useIntl } from "react-intl"
import WhiteBlock from "./WhiteBlock"

export default function Search() {
    const $intel: any = useIntl().messages

    return (
        <WhiteBlock className="!gap-[10px]">
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 12.5L10.1 9.6M6.33333 2.5C8.17428 2.5 9.66667 3.99238 9.66667 5.83333M11.6667 5.83333C11.6667 8.77885 9.27885 11.1667 6.33333 11.1667C3.38781 11.1667 1 8.77885 1 5.83333C1 2.88781 3.38781 0.5 6.33333 0.5C9.27885 0.5 11.6667 2.88781 11.6667 5.83333Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input type="text" placeholder={$intel['app.header_search']} className="text-[#212121] placeholder:opacity-[80%] bg-transparent font-inter font-[300] text-[16px] leading-[19px] placeholder:text-[#212121] outline-none underline" />
        </WhiteBlock>
    )
}
