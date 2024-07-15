
import { useState } from "react"
import ChooseRegion from "./ChooseRegion"
import ChooseRole from "./ChooseRole"
import ComplateTheFormData from "./ComplateTheFormData"
import ForgitPassword from "./ForgitPassword"
import GetCode from "./GetCode"
import LastComplationOfData from "./LastComplationOfData"
import NewPasswordSet from "./NewPasswordSet"
import RegistrationModal from "./RegistrationModal"
import SignInModal from "./SignInModal"

export default function Outentication({ close }: { close: any }) {
    const [state, setState] = useState(0)
    let DATA = [
        {
            id: 0,
            comp: <SignInModal changeComp={setState} close={close} />
        },
        {
            id: 1,
            comp: <ChooseRegion changeComp={setState} />
        },
        {
            id: 2,
            comp: <ChooseRole changeComp={setState} />
        },
        {
            id: 3,
            comp: <RegistrationModal changeComp={setState} />
        },
        {
            id: 4,
            comp: <ComplateTheFormData changeComp={setState} />
        },
        {
            id: 5,
            comp: <LastComplationOfData changeComp={setState} />
        },
        {
            id: 6,
            comp: <ForgitPassword changeComp={setState} />
        },
        {
            id: 7,
            comp: <GetCode changeComp={setState} />
        },
        {
            id: 8,
            comp: <NewPasswordSet changeComp={setState} />
        }
    ]

    const handle__Close = (e: any) => {
        if (!e.target.closest(`#registrationLoginModalWindowContent`)) {
            close((prev: any) => !prev)
        }
    }

    return (
        <div className="w-[100%] h-[100%] bg-[#2121214D] fixed z-10 flex items-center justify-center" onClick={handle__Close}>
            <div className={`w-[80%] bg-white rounded-[64px] p-[80px] flex items-center gap-[40px] relative ${state === 1 ? "h-[max-content]" : "h-[90%]"}`} id="registrationLoginModalWindowContent">
                {
                    state == 1
                        ?
                        DATA[1].comp
                        :
                        <>
                            <button className="w-[80px] h-[80px] rounded-[50%] absolute top-[-10px] right-[-10px] bg-[#1083E6] flex items-center justify-center" onClick={() => close((prev: boolean) => !prev)}>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 1L1 17M1 1L17 17" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <img src="/assets/img/block_3.jpg" className="w-[50%] h-[100%] object-cover rounded-[32px]" />
                            <div className="w-[50%] h-[100%] flex flex-col items-center justify-center">
                                <div className="max-w-[450px] w-[100%] mx-auto flex flex-col items-center">
                                    <svg width="122" height="55" viewBox="0 0 122 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M36.5859 18.1013C36.2274 16.8537 35.7237 15.7513 35.0749 14.7942C34.4262 13.82 33.6323 12.9997 32.6933 12.3331C31.7714 11.6495 30.7129 11.1282 29.5178 10.7693C28.3397 10.4104 27.0337 10.2309 25.5996 10.2309C22.9191 10.2309 20.5631 10.8975 18.5314 12.2306C16.5168 13.5637 14.9461 15.5035 13.8193 18.0501C12.6925 20.5795 12.1291 23.673 12.1291 27.3305C12.1291 30.988 12.684 34.0985 13.7937 36.6622C14.9035 39.2258 16.4742 41.1828 18.5058 42.533C20.5375 43.8661 22.9362 44.5326 25.702 44.5326C28.2117 44.5326 30.3543 44.0882 32.1299 43.1995C33.9225 42.2937 35.2884 41.0204 36.2274 39.3797C37.1834 37.7389 37.6615 35.7991 37.6615 33.5602L39.9151 33.8934H26.3934V25.5359H48.3405V32.1502C48.3405 36.7647 47.3673 40.7299 45.421 44.0455C43.4747 47.3441 40.7943 49.8906 37.3798 51.6852C33.9652 53.4627 30.0555 54.3514 25.6508 54.3514C20.7338 54.3514 16.4144 53.2661 12.6925 51.0956C8.97068 48.9079 6.0683 45.8059 3.98543 41.7895C1.91962 37.756 0.886719 32.9705 0.886719 27.433C0.886719 23.1774 1.50134 19.3832 2.73058 16.0504C3.97689 12.7006 5.71831 9.86345 7.95485 7.53907C10.1914 5.21469 12.795 3.44577 15.7656 2.2323C18.7363 1.01884 21.9545 0.412109 25.4203 0.412109C28.391 0.412109 31.1567 0.847931 33.7177 1.71957C36.2786 2.57413 38.5493 3.78759 40.5297 5.35996C42.5272 6.93234 44.1577 8.8038 45.421 10.9744C46.6844 13.1278 47.4954 15.5035 47.8539 18.1013H36.5859Z" fill="#212121" />
                                        <path d="M67.7586 1.12993V53.6336H56.6699V1.12993H67.7586Z" fill="#212121" />
                                        <path d="M95.4741 53.6336H76.8819V1.12993H95.6278C100.903 1.12993 105.445 2.18103 109.252 4.28323C113.059 6.36833 115.987 9.36781 118.036 13.2817C120.102 17.1955 121.135 21.8784 121.135 27.3305C121.135 32.7996 120.102 37.4996 118.036 41.4306C115.987 45.3615 113.042 48.3781 109.201 50.4803C105.376 52.5825 100.801 53.6336 95.4741 53.6336ZM87.9707 44.1224H95.0132C98.2911 44.1224 101.048 43.5413 103.285 42.3791C105.539 41.1999 107.229 39.3797 108.356 36.9186C109.499 34.4404 110.071 31.2443 110.071 27.3305C110.071 23.4508 109.499 20.2804 108.356 17.8193C107.229 15.3582 105.547 13.5466 103.311 12.3844C101.074 11.2222 98.3168 10.6411 95.0388 10.6411H87.9707V44.1224Z" fill="#212121" />
                                    </svg>
                                    {
                                        DATA.map((item: any) => {
                                            if (item.id == state) {
                                                return item.comp
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}
