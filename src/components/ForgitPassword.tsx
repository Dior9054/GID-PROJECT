
import { useState } from "react"
import API from "../axios"
import InputBase from "./UI/InputBase"
import Loading from "./UI/Loading"

export default function ForgitPassword({ changeComp }: { changeComp: any }) {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    return (
        <>
            {
                !!loading
                &&
                <Loading />
            }
            <form onSubmit={(e: any) => {
                e.preventDefault()
                setLoading(true)

                let a = new FormData(e.target)
                let b = Object.fromEntries(a.entries())

                API.post(`api/v1/accounts/reset-password/get-code/${b.getCode}`)
                    .then(() => changeComp(7))
                    .catch(() => setError("Такой пользователь не нейден"))
                    .finally(() => setLoading(false))
            }} className="flex flex-col items-center w-[100%]" onChange={() => setError("")}>
                <h3 className="mt-[44px] text-[#212121] font-inter font-[700] text-[36px] leading-[39px] mb-[16px]">Забыли пароль?</h3>
                <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[20px] opacity-[60%] max-w-[70%] text-center mb-[28px]">Войдите с помощью кода подтверждения </p>
                <div className="w-[100%]">
                    <InputBase type="email" error={error} required placeholder="Email" name="getCode" />
                </div>
                <div className="w-[100%] mt-[28px]">
                    <button type="submit" className={`text-white border border-solid border-[#1083E6] font-inter font-[400] text-[16px] leading-[22px] duration-200 w-[100%] bg-[#1083E6] h-[54px] rounded-[32px] mb-[8px]`}>Получить код</button>
                    <button type="button" className={`text-[#1083E6] border border-solid border-[#1083E6] font-inter font-[400] text-[16px] leading-[22px] duration-200 w-[100%] h-[54px] rounded-[32px]`} onClick={() => changeComp(0)}>Назад к регистрации</button>
                </div>
            </form>
        </>
    )
}
