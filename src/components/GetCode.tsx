
import { useState } from "react"
import API from "../axios"
import Loading from "./UI/Loading"

export default function GetCode({ changeComp }: { changeComp: any }) {
    const [state, setState] = useState("")
    const [loading, setLoading] = useState(false)

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

                let a = new FormData(e.target)
                let b: any = Object.fromEntries(a.entries())

                let count = b.a + b.b + b.c + b.d

                API.post(`api/v1/accounts/reset-password/chek-code/${count}`)
                    .then((res: any) => {
                        localStorage.setItem("code", JSON.stringify(res?.code))
                        changeComp(8)
                    })
                    .catch((err: any) => setState(err?.response?.data?.detail))
                    .finally(() => setLoading(false))

            }} onChange={() => {
                setState("")
            }}>
                <h3 className="mt-[44px] text-[#212121] font-inter font-[700] text-[36px] leading-[39px] mb-[16px]">Введите код</h3>
                <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[20px] opacity-[60%] max-w-[98%] text-center mb-[28px]">Мы только что отправили код подтверждения на адрес PROlab@gmail.com</p>
                <div className="w-[100%] flex items-center justify-center gap-[8px]">
                    <input type="text" name="a" maxLength={1} className={`w-[54px] text-[#212121] font-inter font-[400] text-[16px] leading-[24px] h-[54px] text-center rounded-[50%] outline-none border border-solid border-[#1083E6] ${!!state ? "!border-[#EB5757]" : ""}`} placeholder="_" onChange={(e: any) => {
                        if (e.target.nextElementSibling) {
                            e.target.nextElementSibling.focus()
                        }
                    }} />
                    <input type="text" name="b" maxLength={1} className={`w-[54px] text-[#212121] font-inter font-[400] text-[16px] leading-[24px] h-[54px] text-center rounded-[50%] outline-none border border-solid border-[#1083E6] ${!!state ? "!border-[#EB5757]" : ""}`} placeholder="_" onChange={(e: any) => {
                        if (e.target.nextElementSibling) {
                            e.target.nextElementSibling.focus()
                        }
                    }} />
                    <input type="text" name="c" maxLength={1} className={`w-[54px] text-[#212121] font-inter font-[400] text-[16px] leading-[24px] h-[54px] text-center rounded-[50%] outline-none border border-solid border-[#1083E6] ${!!state ? "!border-[#EB5757]" : ""}`} placeholder="_" onChange={(e: any) => {
                        if (e.target.nextElementSibling) {
                            e.target.nextElementSibling.focus()
                        }
                    }} />
                    <input type="text" name="d" maxLength={1} className={`w-[54px] text-[#212121] font-inter font-[400] text-[16px] leading-[24px] h-[54px] text-center rounded-[50%] outline-none border border-solid border-[#1083E6] ${!!state ? "!border-[#EB5757]" : ""}`} placeholder="_" onChange={(e: any) => {
                        if (e.target.nextElementSibling) {
                            e.target.nextElementSibling.focus()
                        }
                    }} />
                </div>
                <p className="px-[32px] text-[#EB5757] font-inter font-[400] text-[14px] leading-[18px] mt-[8px]">{state}</p>
                <div className="w-[100%] mt-[28px]">
                    <button type="submit" className={`text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px] w-[100%] bg-[var(--blue-10,_#1083E61A)] h-[54px] rounded-[32px] mb-[8px] border border-solid border-[transparent] ${!!state ? "!bg-[#EB5757] !text-white" : ""}`}>Подтвердить </button>
                    <button type="button" onClick={() => changeComp(0)} className={`text-[#1083E6] border border-solid border-[#1083E6] font-inter font-[400] text-[16px] leading-[22px] duration-200 w-[100%] h-[54px] rounded-[32px]`}>Назад к регистрации</button>
                </div>
            </form>
        </>
    )
}
