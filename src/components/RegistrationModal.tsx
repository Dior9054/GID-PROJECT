import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearRegistrationError, FetchRegistration } from "../redux/slice/Registrate"
import InputBase from "./UI/InputBase"
import Loading from "./UI/Loading"

export default function RegistrationModal({ changeComp }: { changeComp: any }) {
    const dispatch = useDispatch()
    const fuck = useSelector((state: any) => state.registration)
    const [confPass, setConfPass] = useState("")
    const [loading, setLoading] = useState(fuck.loading)

    const handle_Submit = (e: any) => {
        e.preventDefault()

        let a = new FormData(e.target)
        let b: any = Object.fromEntries(a.entries())
        let c = localStorage.getItem("country")

        let { confPassword, ...data } = b

        if (b.password == confPassword) {
            dispatch(FetchRegistration({ ...data, country: c }) as any)
        } else {
            setConfPass("Подтверждение пороля не совпала")
        }
    }

    useEffect(() => {
        if (!fuck.error) {
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
            <form className="flex flex-col items-center" onSubmit={handle_Submit} onChange={() => {
                dispatch(clearRegistrationError() as any)
            }}>
                <h3 className="mt-[44px] text-[#212121] font-inter font-[700] text-[36px] leading-[39px] mb-[16px]">Добро пожаловать</h3>
                <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[20px] opacity-[60%] max-w-[70%] text-center mb-[28px]">Давайте заполним немножко форм и пойдем искать туры для себя</p>
                <div className="w-[100%]">
                    <InputBase type="text" error={fuck?.error?.full_name} required placeholder="ФИО*" name="full_name" />
                    <InputBase type="text" error={fuck?.error?.email} required placeholder="Почта*" name="email" />
                    <InputBase type="text" error={fuck?.error?.city} required placeholder="Город" name="city" />
                    <InputBase type="password" error={fuck?.error?.password} PAssword={true} required placeholder="Пароль*" name="password" />
                    <InputBase type="password" error={confPass} PAssword={true} required placeholder="Повторите пароль" name="confPassword" onChange={() => setConfPass("")} />
                </div>
                <div className="w-[100%] mt-[28px]">
                    <button type="submit" className={`text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px] opacity-[40%] duration-200 hover:opacity-[100%] w-[100%] bg-[var(--blue-10,_#1083E61A)] h-[54px] rounded-[32px]`}>Войти</button>
                </div>
            </form>
        </>
    )
}
