
import { useEffect, useState } from "react"
import { useIntl } from "react-intl"
import { AUTHAPI } from "../axios"
import Outentication from "./Outentication"
import SettingsContent from "./SettingsContent"
import BlueBlock from "./UI/BlueBlock"
import LanguageChangeBlock from "./UI/LanguageChangeBlock"
import Loading from "./UI/Loading"
import Nav from "./UI/Nav"
import Search from "./UI/Search"
import WhiteBlock from "./UI/WhiteBlock"

export default function Header() {
    const $intel: any = useIntl().messages
    const [modal, setModal] = useState(false)
    const [closeSettings, setCloseSettings] = useState(false)
    const [hasLogin, setHasLogin] = useState(false)
    const [loading, setLoading] = useState(false)

    const handle__Logout = () => {
        setLoading(true)
        AUTHAPI.post("api/v1/accounts/logout/", { revoke_token: true })
            .then(() => {
                setLoading(false)
                localStorage.removeItem("logined")
                localStorage.removeItem("token")
                localStorage.removeItem("email")
            })
    }

    const handle__LogIn = () => {
        setModal(prev => !prev)
    }

    const handle__Settings = () => {
        setCloseSettings(prev => !prev)
    }

    useEffect(() => {
        sessionStorage.clear()
        localStorage.removeItem("country")
        localStorage.removeItem("code")
        let a = JSON.parse(localStorage.getItem("logined") as any)
        if (!!a && a == true) {
            setHasLogin(true)
        } else {
            setHasLogin(false)
        }
    }, [modal, loading])

    return (
        <>
            {
                !!loading
                &&
                <Loading />
            }
            {
                !!modal
                &&
                <Outentication close={setModal} />
            }
            {
                !!closeSettings
                &&
                <SettingsContent close={setCloseSettings} />
            }
            <header className="container z-[99]">
                <div className="flex items-center justify-between py-[28px]">
                    <img src="/assets/svg/logo.svg" />
                    <Nav />
                    <div className="flex w-full items-center justify-between ml-[40px]">
                        <Search />
                        <LanguageChangeBlock />
                    </div>
                    <div className="flex items-center gap-[20px] ml-[20px]">
                        {
                            !hasLogin
                                ?
                                <WhiteBlock className="whitespace-nowrap" onClick={handle__LogIn}>{$intel['app.header_button1']}</WhiteBlock>
                                :
                                <>
                                    <BlueBlock onClick={handle__Settings}>
                                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.3337 13C11.3337 12.0696 11.3337 11.6044 11.2188 11.2259C10.9603 10.3736 10.2934 9.70669 9.44109 9.44816C9.06256 9.33333 8.59737 9.33333 7.66699 9.33333L4.33366 9.33333C3.40328 9.33333 2.93809 9.33333 2.55956 9.44816C1.7073 9.70669 1.04035 10.3736 0.781819 11.2259C0.666992 11.6044 0.666992 12.0696 0.666992 13M9.00033 4C9.00033 5.65685 7.65718 7 6.00033 7C4.34347 7 3.00033 5.65685 3.00033 4C3.00033 2.34315 4.34347 1 6.00033 1C7.65718 1 9.00033 2.34315 9.00033 4Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </BlueBlock>
                                    <WhiteBlock onClick={handle__Logout}>{$intel['app.header_button2']}</WhiteBlock>
                                </>
                        }
                    </div>
                </div>
            </header>
        </>
    )
}
