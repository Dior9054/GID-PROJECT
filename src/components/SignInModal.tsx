
import { useState } from "react"
import API from "../axios"
import InputBase from "./UI/InputBase"

export default function SignInModal({ close, changeComp }: { close: any, changeComp: any }) {
    const [error, setError] = useState("")

    const handle__Submit = (e: any) => {
        e.preventDefault()

        let a = new FormData(e.target)
        let b = Object.fromEntries(a.entries())

        API.post("api/v1/accounts/login/", b)
            .then((res: any) => {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("email", JSON.stringify(b.email))
                localStorage.setItem("logined", JSON.stringify(true))
                close((prev: any) => !prev)
            })
            .catch(err => setError(err?.response?.data?.detail))
    }

    return (
        <div>
            <form onSubmit={handle__Submit} className="flex flex-col items-center" onChange={() => {
                setError("")
            }}>
                <h3 className="mt-[44px] text-[#212121] font-inter font-[700] text-[36px] leading-[39px] mb-[16px]">Добро пожаловать</h3>
                <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[20px] opacity-[60%] max-w-[70%] text-center mb-[28px]">Продолжить с Google или введите данные для входа</p>
                <div className="w-[100%]">
                    <InputBase LogIn={true} type="email" error={error} required placeholder="Email" name="login" />
                    <InputBase LogIn={true} type="password" error={error} PAssword={true} required placeholder="***********" name="password" />
                    <div className="flex items-center justify-between mt-[12px]">
                        <p className="text-[#EB5757] font-inter font-[400] text-[14px] leading-[19px]">{error}</p>
                        <button className="text-[#1083E6] underline ml-auto flex" onClick={() => changeComp(6)}>Забыли пароль</button>
                    </div>
                </div>
                <div className="w-[100%] mt-[28px]">
                    <button type="submit" className={`text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px] hover:bg-[#1083E6] hover:text-white duration-200 w-[100%] bg-[var(--blue-10,_#1083E61A)] h-[54px] rounded-[32px] ${!!error ? "!bg-[#EB5757] !opacity-[100%] !text-white" : ""}`}>Войти</button>
                    <div className="flex items-center justify-between mt-[12px] mb-[28px]">
                        <p className="text-[#212121] font-inter font-[400] text-[14px] leading-[18px] opacity-[60%]">Вы еще не зарегистрировались?</p>
                        <button className="text-[#1083E6] underline ml-auto flex" onClick={() => changeComp(1)}>Создать аккаунт</button>
                    </div>
                </div>
                <div className="flex items-center gap-[20px] w-[100%] mb-[20px]">
                    <span className="flex border-t border-solid border-t-[#21212133] w-[100%]"></span>
                    <p className="text-[#212121] font-inter font-[400] text-[14px] leading-[18px] opacity-[60%]">или</p>
                    <span className="flex border-t border-solid border-t-[#21212133] w-[100%]"></span>
                </div>
                <div className="w-[100%] flex gap-[8px]">
                    <button type="button" className="w-[100%] text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] flex items-center gap-[10px] justify-center border border-solid border-[#1083E6] bg-[var(--blue-20,_#1083E633)] rounded-[32px] h-[54px]">
                        <img src="/assets/svg/google.svg" />
                        Google
                    </button>
                    <button type="button" className="w-[100%] text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] flex items-center gap-[10px] justify-center border border-solid border-[#1083E6] rounded-[32px] h-[54px]">
                        <img src="/assets/svg/facebook.svg" />
                        Facebook
                    </button>
                </div>
            </form>
        </div>
    )
}
