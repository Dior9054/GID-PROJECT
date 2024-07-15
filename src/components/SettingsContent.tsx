
import { useState } from "react"
import { AUTHAPI } from "../axios"
import ChangePassword from "./ChangePassword"
import FavoriteRoom from "./FavoriteRoom"
import MyReviews from "./MyReviews"
import OwnRoom from "./OwnRoom"

export default function SettingsContent({ close }: { close: any }) {
    const [state, setState] = useState(false)
    const [change, setChange] = useState(0)
    const DATA = [
        {
            id: 0,
            comp: <OwnRoom />
        },
        {
            id: 1,
            comp: <FavoriteRoom />
        },
        {
            id: 2,
            comp: <MyReviews />
        },
        {
            id: 3,
            comp: <ChangePassword />
        }
    ]

    return (
        <>
            {
                state
                &&
                <div className="fixed z-[9] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] h-[100%] flex items-center justify-center bg-[#2121214D]"
                    onClick={(e: any) => {
                        if (!e.target.closest("#deleteacountmodalid")) {
                            setState(false)
                        }
                    }}
                >
                    <div className="bg-white rounded-[64px] py-[48px] px-[80px] max-w-[839px] w-[100%]" id="deleteacountmodalid">
                        <h6 className="text-[#212121] font-inter font-[700] text-[36px] leading-[36px] text-center mb-[16px]">Вы точно хотите выйти с акаунта</h6>
                        <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[19px] opacity-[40%] text-center max-w-[64%] mx-auto mb-[44px]">Надеимся вы запомнили свой пароль. Мы будем скучать по вам.</p>
                        <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#EB5757] h-[54px] rounded-[32px] px-[167px] mx-auto flex items-center" onClick={() => {
                            AUTHAPI.post("api/v1/accounts/logout/", { revoke_token: true })
                            localStorage.removeItem("logined")
                            localStorage.removeItem("token")
                            localStorage.removeItem("email")
                        }}>Выйти</button>
                    </div>
                </div>
            }
            <div className="w-[100%] h-[100%] bg-[#2121214D] fixed z-[8] flex items-center justify-center"
                onClick={(event: any) => {
                    if (!event.target.closest(`#registrationLoginModalWindowContent`)) {
                        close((prev: any) => !prev)
                    }
                }}>
                <div className="w-[85%] h-[80%] bg-white rounded-[64px] p-[80px] flex items-center gap-[40px] relative" id="registrationLoginModalWindowContent">
                    <button className="w-[80px] h-[80px] rounded-[50%] absolute top-[-10px] right-[-10px] bg-[#1083E6] flex items-center justify-center" onClick={() => close((prev: boolean) => !prev)}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 1L1 17M1 1L17 17" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div className="flex flex-col gap-[12px]">
                        <button className={`border border-solid border-[#1083E6] rounded-[24px] w-[200px] h-[48px] text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] duration-200 hover:bg-[#1083E6] hover:text-white ${change == 0 ? "bg-[#1083E6] text-white" : ""}`} onClick={() => setChange(0)}>Личный кабинет</button>
                        <button className={`border border-solid border-[#1083E6] rounded-[24px] w-[200px] h-[48px] text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] duration-200 hover:bg-[#1083E6] hover:text-white ${change == 1 ? "bg-[#1083E6] text-white" : ""}`} onClick={() => setChange(1)}>Избранное</button>
                        <button className={`border border-solid border-[#1083E6] rounded-[24px] w-[200px] h-[48px] text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] duration-200 hover:bg-[#1083E6] hover:text-white ${change == 2 ? "bg-[#1083E6] text-white" : ""}`} onClick={() => setChange(2)}>Мои коментарии</button>
                        <button className={`border border-solid border-[#1083E6] rounded-[24px] w-[200px] h-[48px] text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] duration-200 hover:bg-[#1083E6] hover:text-white ${change == 3 ? "bg-[#1083E6] text-white" : ""}`} onClick={() => setChange(3)}>Настройки</button>
                        <button className={`border border-solid border-[#EB5757] rounded-[24px] w-[200px] h-[48px] text-[#EB5757] font-inter font-[400] text-[16px] leading-[19px] duration-200 hover:bg-[#EB5757] hover:text-white`} onClick={() => setState(prev => !prev)}>Выйти</button>
                    </div>
                    {
                        DATA.map((item: any) => {
                            if (item.id == change) {
                                return item.comp
                            }
                        })
                    }
                </div>
            </div>
        </>
    )
}
