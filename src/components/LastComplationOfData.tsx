import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearRegistrationError, FetchRegistration } from "../redux/slice/Registrate"
import InputBase from "./UI/InputBase"
import Loading from "./UI/Loading"

export default function LastComplationOfData({ changeComp }: { changeComp: any }) {
    const dispatch = useDispatch()
    const [confPass, setConfPass] = useState("")
    const fuck = useSelector((state: any) => state.registration)
    const [loading, setLoading] = useState(fuck.loading)
    const [wq, setWq] = useState(JSON.parse(sessionStorage.getItem("fuck_3") as any) || {
        password: "",
        address: "",
        city: "",
        confPassword: ""
    })

    const handle_Submit = (e: any) => {
        e.preventDefault()

        let a = new FormData(e.target)
        let b: any = Object.fromEntries(a.entries())
        let c = localStorage.getItem("country")

        let { confPassword, ...data } = b
        let git = JSON.parse(sessionStorage.getItem("fuck_2") as any)

        let total = {
            full_name: git.full_name,
            country: c,
            email: git.email,
            phone: git.phone,
            password: data.password,
            bids: {
                title: git.title,
                address: data.address,
                city: data.city,
                country: c,
            }
        }

        if (data.password == confPassword) {
            dispatch(FetchRegistration(total) as any)
        } else {
            setConfPass("Подтверждение пороля не совпала")
        }
    }

    useEffect(() => {
        if (!fuck.error) {
            sessionStorage.clear()
            localStorage.removeItem("country")
            changeComp(0)
            dispatch(clearRegistrationError() as any)
        }
        setLoading(fuck.loading)
    }, [fuck])

    return (
        <>
            {
                !!loading
                &&
                <Loading />
            }
            <form onSubmit={handle_Submit} className="flex flex-col items-center" onChange={(e: any) => {
                dispatch(clearRegistrationError() as any)

                let a = new FormData(e.currentTarget)
                let b = Object.fromEntries(a.entries())

                sessionStorage.setItem("fuck_3", JSON.stringify(b))
            }}>
                <h3 className="mt-[44px] text-[#212121] font-inter font-[700] text-[36px] leading-[39px] mb-[16px]">Добро пожаловать</h3>
                <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[20px] opacity-[60%] max-w-[70%] text-center mb-[28px]">Давайте заполним немножко форм и пойдем искать туры для себя</p>
                <div className="flex items-center w-[100%] mb-[28px] gap-[12px]">
                    <button type="button" className={`w-[54px] min-w-[54px] max-w-[54px] h-[54px] rounded-[50%] border border-solid border-[#27AE60] flex items-center justify-center bg-[#27AE60] ${!!(fuck?.error?.email || fuck?.error?.title || fuck?.error?.phone || fuck?.error?.full_name) ? "!bg-[#EB5757] !border-[#EB5757]" : ""}`} onClick={() => changeComp(4)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 15.1667C2.44649 13.1021 5.08918 11.8333 8 11.8333C10.9108 11.8333 13.5535 13.1021 15.5 15.1667M11.75 4.75C11.75 6.82107 10.0711 8.5 8 8.5C5.92893 8.5 4.25 6.82107 4.25 4.75C4.25 2.67893 5.92893 1 8 1C10.0711 1 11.75 2.67893 11.75 4.75Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div className="w-[100%] h-[1px] border-t border-solid border-t-[#21212133]"></div>
                    <button type="button" className="w-[54px] min-w-[54px] max-w-[54px] h-[54px] rounded-[50%] border border-solid border-[#1083E6] flex items-center justify-center bg-[#1083E6]" onClick={() => changeComp(5)}>
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.00033 17.8337C13.6027 17.8337 17.3337 14.1027 17.3337 9.50033C17.3337 4.89795 13.6027 1.16699 9.00033 1.16699C4.39795 1.16699 0.666992 4.89795 0.666992 9.50033C0.666992 14.1027 4.39795 17.8337 9.00033 17.8337Z" stroke="#FFFF" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11.2687 6.38863C11.6759 6.25292 11.8794 6.18507 12.0148 6.23334C12.1326 6.27535 12.2253 6.36805 12.2673 6.48585C12.3156 6.62122 12.2477 6.82478 12.112 7.2319L10.8724 10.9508C10.8338 11.0667 10.8144 11.1247 10.7815 11.1728C10.7523 11.2155 10.7155 11.2523 10.6728 11.2815C10.6247 11.3144 10.5667 11.3338 10.4508 11.3724L6.7319 12.612C6.32478 12.7477 6.12122 12.8156 5.98585 12.7673C5.86805 12.7253 5.77535 12.6326 5.73334 12.5148C5.68507 12.3794 5.75292 12.1759 5.88863 11.7687L7.12825 8.04989C7.1669 7.93394 7.18622 7.87596 7.21916 7.82782C7.24833 7.78517 7.28517 7.74833 7.32782 7.71916C7.37596 7.68622 7.43394 7.6669 7.54989 7.62825L11.2687 6.38863Z" stroke="#FFFF" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="w-[100%]">
                    <InputBase type="text" error={fuck?.error?.city} required placeholder="Город" value={wq.city} name="city" onChange={(e: any) => setWq((prev: any) => { return { ...prev, city: e.target.value } })} />
                    <InputBase type="text" error={fuck?.error?.address} required placeholder="Местоположение( Адрес)*" value={wq.address} name="address" onChange={(e: any) => setWq((prev: any) => { return { ...prev, address: e.target.value } })} />
                    <InputBase type="password" PAssword={true} error={fuck?.error?.password} required placeholder="Пароль*" value={wq.password} name="password" onChange={(e: any) => setWq((prev: any) => { return { ...prev, password: e.target.value } })} />
                    <InputBase type="password" PAssword={true} error={confPass} required placeholder="Повторите пароль*" value={wq.confPassword} name="confPassword" onChange={(e: any) => {
                        setWq((prev: any) => { return { ...prev, confPassword: e.target.value } })
                        setConfPass("")
                    }} />
                </div>
                <div className="w-[100%] mt-[28px]">
                    <button type="submit" className={`text-white font-inter font-[400] text-[16px] leading-[22px] w-[100%] bg-[#1083E6] h-[54px] rounded-[32px]`}>Отправить на проверку</button>
                </div>
            </form>
        </>
    )
}
