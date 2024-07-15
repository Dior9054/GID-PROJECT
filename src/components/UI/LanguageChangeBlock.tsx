
import { useContext } from "react"
import { LanguageChange } from "../../App"
import WhiteBlock from "./WhiteBlock"

export default function LanguageChangeBlock() {
    const [lang, setLang] = useContext<any>(LanguageChange)

    return (
        <WhiteBlock>
            <button className={`font-[300] font-inter text-[16px] leading-[19px] text-[#212121] opacity-[60%] hover:text-[#1083E6] hover:opacity-[100%] ${lang == "kg" ? "!opacity-[100%] !text-[#1083E6]" : ""}`} onClick={() => setLang("kg")}>Kg</button>
            <p className="text-[#212121] opacity-[20%] font-[300] font-inter text-[16px] leading-[19px]">/</p>
            <button className={`font-[300] font-inter text-[16px] leading-[19px] text-[#212121] opacity-[60%] hover:text-[#1083E6] hover:opacity-[100%] ${lang == "ru" ? "!opacity-[100%] !text-[#1083E6]" : ""}`} onClick={() => setLang("ru")}>Ru</button>
            <p className="text-[#212121] opacity-[20%] font-[300] font-inter text-[16px] leading-[19px]">/</p>
            <button className={`font-[300] font-inter text-[16px] leading-[19px] text-[#212121] opacity-[60%] hover:text-[#1083E6] hover:opacity-[100%] ${lang == "en" ? "!opacity-[100%] !text-[#1083E6]" : ""}`} onClick={() => setLang("en")}>En</button>
            <p className="text-[#212121] opacity-[20%] font-[300] font-inter text-[16px] leading-[19px]">/</p>
            <button className={`font-[300] font-inter text-[16px] leading-[19px] text-[#212121] opacity-[60%] hover:text-[#1083E6] hover:opacity-[100%] ${lang == "uz" ? "!opacity-[100%] !text-[#1083E6]" : ""}`} onClick={() => setLang("uz")}>Uz</button>
        </WhiteBlock>
    )
}
