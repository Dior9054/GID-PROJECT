import { useIntl } from "react-intl"

export default function Nav() {
    const $intel: any = useIntl().messages

    return (
        <nav className="flex items-center gap-[40px] ml-[150px]">
            <a href="#" className="leading-[19px] text-[16px] font-[400] font-inter text-[#212121] opacity-[100%]">{$intel['app.nav1']}</a>
            <a href="#" className="leading-[19px] text-[16px] font-[400] font-inter text-[#212121] opacity-[60%] hover:opacity-[100%] duration-200">{$intel['app.nav2']}</a>
            <a href="#" className="leading-[19px] text-[16px] font-[400] font-inter text-[#212121] opacity-[60%] hover:opacity-[100%] duration-200">{$intel['app.nav3']}</a>
        </nav>
    )
}
