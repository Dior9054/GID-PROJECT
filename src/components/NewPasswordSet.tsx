
import { useState } from "react"
import API from "../axios"
import InputBase from "./UI/InputBase"
import Loading from "./UI/Loading"

export default function NewPasswordSet({ changeComp }: { changeComp: any }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    return (
        <>
            {
                !!loading
                &&
                <Loading />
            }
            <form className="flex flex-col items-center w-[100%]" onSubmit={(e: any) => {
                e.preventDefault()
                setLoading(true)
                console.log("true");


                let a = new FormData(e.target)
                let b: any = Object.fromEntries(a.entries())

                let count = JSON.parse(localStorage.getItem("code") as any)

                API.post(`api/v1/accounts/reset-password/send-code/${count}`, b)
                    .then(() => {
                        changeComp(0)
                    })
                    .catch((err: any) => setError(err?.response?.data?.detail))
                    .finally(() => setLoading(false))
            }} onChange={() => setError("")}>
                <h3 className="mt-[44px] text-[#212121] font-inter font-[700] text-[36px] leading-[39px] mb-[16px]">Новый пароль</h3>
                <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[20px] opacity-[60%] max-w-[70%] text-center mb-[28px]">Теперь напишите свой новый пароль</p>
                <div className="w-[100%]">
                    <InputBase type="password" LogIn={true} PAssword={true} error={error} required placeholder="Password" name="password" />
                    <InputBase type="password" LogIn={true} PAssword={true} error={error} required placeholder="Confirm Password" name="password_confirm" />
                    <p className="px-[32px] text-[#EB5757] font-inter font-[400] text-[14px] leading-[18px] mt-[8px]">{error}</p>
                </div>
                <div className="w-[100%] mt-[28px]">
                    <button type="submit" className={`text-white font-inter font-[400] text-[16px] leading-[22px] w-[100%] bg-[#1083E6] h-[54px] rounded-[32px]`}>Войти</button>
                </div>
            </form>
        </>
    )
}
