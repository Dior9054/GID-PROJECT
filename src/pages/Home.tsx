// import { useEffect, useRef, useState } from "react";

import React, { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import API, { AUTHAPI } from "../axios"
import { clearRegistrationError, FetchCheckPassword, FetchForgotPassword, FetchRegistration } from "../redux/slice/Registrate"
import { FormattedMessage, useIntl } from "react-intl"
import { LanguageChange } from "../App"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';
import { FetchToursGet } from "../redux/slice/Tours"

export default function Home() {
    // let sliderRef: any = useRef<HTMLDivElement | null>(null)
    // let sliderCurrentRef = useRef<HTMLDivElement>(null)
    // let [state, setState] = useState(0)

    // useEffect(() => {
    //     if (!!sliderCurrentRef.current) {
    //         let a: any = sliderCurrentRef.current.querySelectorAll("button")
    //         console.log(state);


    //         a.forEach((item: any, index: number) => {
    //             if (index == state) {
    //                 item.classList.add("bg-white")
    //             } else {
    //                 item.classList.remove("bg-white")
    //             }
    //         })
    //     }
    // }, [state])

    // useEffect(() => {
    //     if (!!sliderRef.current && !!sliderCurrentRef.current) {
    //         let sliderCurrentElem = sliderCurrentRef.current?.querySelectorAll("button")

    //         sliderCurrentElem.forEach((item, index) => {
    //             item.addEventListener("click", (e: any) => {
    //                 let half = sliderRef.current.querySelectorAll('div')[0].clientWidth
    //                 setState(index)

    //                 sliderRef.current.scrollBy({
    //                     left: half * (index + 1),
    //                     top: 0,
    //                     behavior: "smooth"
    //                 })
    //             })
    //         })

    //         let fix = 0

    //         const handleEvent = (e: any) => {
    //             let half = e.currentTarget.clientWidth

    //             if ((half / 100 * 50) >= e.offsetX) {
    //                 half = -half
    //                 fix -= 1
    //                 // setState(prev => prev - 1)
    //             } else {
    //                 half = Math.abs(half)
    //                 fix += 1
    //                 // setState(prev => prev + 1)
    //             }

    //             e.currentTarget.scrollBy({
    //                 left: half,
    //                 top: 0,
    //                 behavior: "smooth"
    //             })
    //         }

    //         sliderRef.current.addEventListener("mousedown", (e: any) => {
    //             e.currentTarget.addEventListener("mousemove", handleEvent)

    //             e.currentTarget.addEventListener("mouseup", (e: any) => {
    //                 e.currentTarget.removeEventListener("mousemove", handleEvent)
    //                 setState(prev => prev + fix)
    //             })
    //         })

    //         return () => {
    //             if (sliderRef.current) {
    //                 return sliderRef.current.removeEventListener("mousedown", (e: any) => {
    //                     e.currentTarget.addEventListener("mousemove", handleEvent)

    //                     e.currentTarget.addEventListener("mouseup", (e: any) => {
    //                         e.currentTarget.removeEventListener("mousemove", handleEvent)
    //                         setState(prev => prev + fix)
    //                     })
    //                 })
    //             }
    //         }
    //     }

    // }, [sliderRef])

    const [modal, setModal] = useState(true)
    const [closeModal, setCloseModal] = useState(false)
    const [settings, setSettings] = useState<"Пользователь" | "Компания">("Пользователь")
    const [closeSettings, setCloseSettings] = useState(false)
    let $intel: any = useIntl().messages
    const [lang, setLang] = useContext(LanguageChange as any)
    const dispatch = useDispatch()
    const tours = useSelector((state: any) => state.tours)

    useEffect(() => {
        localStorage.setItem("language", lang)
    }, [lang])

    console.log(tours);

    useEffect(() => {
        dispatch(FetchToursGet() as any)
    }, [])

    return (
        <>
            {
                !!modal
                    ?
                    !!closeModal
                    &&
                    <Outentication close={setCloseModal} />
                    :
                    ""
            }
            {
                settings == "Пользователь"
                    ?
                    !!closeSettings
                    &&
                    <SettingsContent close={setCloseSettings} />
                    :
                    ""
            }
            <div>
                {/* <div className="w-full h-[950px] bg-[url(/assets/img/home_header_mountain.jpg)] bg-cover bg-center rounded-b-[128px]">
                    <header className="container">
                        <div className="flex items-center justify-between py-[28px]">
                            <div>
                                <svg width="58" height="26" viewBox="0 0 58 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.6069 8.64893C17.4396 8.07131 17.2045 7.56095 16.9018 7.11785C16.599 6.66684 16.2285 6.28704 15.7903 5.97845C15.3601 5.66195 14.8661 5.42062 14.3084 5.25446C13.7587 5.08829 13.1492 5.00521 12.4799 5.00521C11.2291 5.00521 10.1296 5.3138 9.18146 5.93098C8.24132 6.54815 7.50833 7.44622 6.98249 8.62519C6.45665 9.79624 6.19373 11.2284 6.19373 12.9217C6.19373 14.615 6.45266 16.055 6.97054 17.2419C7.48841 18.4288 8.2214 19.3348 9.16951 19.9599C10.1176 20.577 11.237 20.8856 12.5277 20.8856C13.6989 20.8856 14.6988 20.6799 15.5274 20.2685C16.364 19.8491 17.0014 19.2596 17.4396 18.5C17.8857 17.7404 18.1088 16.8423 18.1088 15.8058L19.1605 15.9601H12.8504V12.0909H23.0924V15.153C23.0924 17.2894 22.6382 19.1251 21.7299 20.6601C20.8217 22.1872 19.5708 23.3662 17.9774 24.197C16.3839 25.0199 14.5594 25.4314 12.5038 25.4314C10.2092 25.4314 8.19352 24.9289 6.45665 23.924C4.71978 22.9112 3.36534 21.4751 2.39333 19.6157C1.42929 17.7483 0.947266 15.5328 0.947266 12.9692C0.947266 10.9989 1.23409 9.24236 1.80773 7.69942C2.38935 6.14857 3.20201 4.83509 4.24572 3.75899C5.28944 2.68289 6.50445 1.86394 7.89076 1.30216C9.27707 0.740367 10.7789 0.459473 12.3963 0.459473C13.7826 0.459473 15.0733 0.661242 16.2684 1.06478C17.4635 1.46041 18.5231 2.02219 19.4473 2.75015C20.3795 3.4781 21.1404 4.34452 21.7299 5.34941C22.3195 6.34638 22.698 7.44622 22.8653 8.64893H17.6069Z" fill="#212121" />
                                    <path d="M32.1542 0.791798V25.099H26.9794V0.791798H32.1542Z" fill="#212121" />
                                    <path d="M45.0881 25.099H36.4117V0.791798H45.1598C47.6217 0.791798 49.741 1.27842 51.5177 2.25166C53.2944 3.21698 54.6608 4.60563 55.6168 6.4176C56.5809 8.22956 57.0629 10.3976 57.0629 12.9217C57.0629 15.4537 56.5809 17.6296 55.6168 19.4495C54.6608 21.2694 53.2864 22.6659 51.4938 23.6392C49.7091 24.6124 47.5739 25.099 45.0881 25.099ZM41.5864 20.6957H44.8729C46.4027 20.6957 47.6894 20.4267 48.7331 19.8887C49.7848 19.3427 50.5735 18.5 51.0994 17.3606C51.6332 16.2133 51.9001 14.7336 51.9001 12.9217C51.9001 11.1255 51.6332 9.65777 51.0994 8.51837C50.5735 7.37897 49.7888 6.54024 48.745 6.00219C47.7013 5.46414 46.4146 5.19511 44.8849 5.19511H41.5864V20.6957Z" fill="#212121" />
                                </svg>
                            </div>
                            <nav className="flex items-center gap-[40px] ml-[150px]">
                                <a href="#" className="leading-[19px] text-[16px] font-[400] font-inter text-[#212121] opacity-[60%] !opacity-[100%]">{$intel['app.nav1']}</a>
                                <a href="#" className="leading-[19px] text-[16px] font-[400] font-inter text-[#212121] opacity-[60%] hover:opacity-[100%] duration-200">{$intel['app.nav2']}</a>
                                <a href="#" className="leading-[19px] text-[16px] font-[400] font-inter text-[#212121] opacity-[60%] hover:opacity-[100%] duration-200">{$intel['app.nav3']}</a>
                            </nav>
                            <div className="flex w-full items-center justify-between ml-[40px]">
                                <label className="flex items-center gap-[10px] bg-white h-[48px] pl-[24px] pr-[15px] rounded-[24px] cursor-pointer">
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 12.5L10.1 9.6M6.33333 2.5C8.17428 2.5 9.66667 3.99238 9.66667 5.83333M11.6667 5.83333C11.6667 8.77885 9.27885 11.1667 6.33333 11.1667C3.38781 11.1667 1 8.77885 1 5.83333C1 2.88781 3.38781 0.5 6.33333 0.5C9.27885 0.5 11.6667 2.88781 11.6667 5.83333Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <input type="text" placeholder={$intel['app.header_search']} className="text-[#212121] placeholder:opacity-[80%] bg-transparent font-inter font-[300] text-[16px] leading-[19px] placeholder:text-[#212121] outline-none underline" />
                                </label>
                                <div className="flex items-center gap-[4px] bg-white h-[48px] px-[24px] rounded-[24px] cursor-pointer">
                                    <button className={`font-[300] font-inter text-[16px] leading-[19px] text-[#212121] opacity-[60%] hover:text-[#1083E6] hover:opacity-[100%] ${lang == "kg" ? "!opacity-[100%] !text-[#1083E6]" : ""}`} onClick={() => setLang("kg")}>Kg</button>
                                    <p className="text-[#212121] opacity-[20%] font-[300] font-inter text-[16px] leading-[19px]">/</p>
                                    <button className={`font-[300] font-inter text-[16px] leading-[19px] text-[#212121] opacity-[60%] hover:text-[#1083E6] hover:opacity-[100%] ${lang == "ru" ? "!opacity-[100%] !text-[#1083E6]" : ""}`} onClick={() => setLang("ru")}>Ru</button>
                                    <p className="text-[#212121] opacity-[20%] font-[300] font-inter text-[16px] leading-[19px]">/</p>
                                    <button className={`font-[300] font-inter text-[16px] leading-[19px] text-[#212121] opacity-[60%] hover:text-[#1083E6] hover:opacity-[100%] ${lang == "en" ? "!opacity-[100%] !text-[#1083E6]" : ""}`} onClick={() => setLang("en")}>En</button>
                                    <p className="text-[#212121] opacity-[20%] font-[300] font-inter text-[16px] leading-[19px]">/</p>
                                    <button className={`font-[300] font-inter text-[16px] leading-[19px] text-[#212121] opacity-[60%] hover:text-[#1083E6] hover:opacity-[100%] ${lang == "uz" ? "!opacity-[100%] !text-[#1083E6]" : ""}`} onClick={() => setLang("uz")}>Uz</button>
                                </div>
                            </div>
                            <div className="flex items-center gap-[20px] ml-[20px]">
                                <button className="w-[54px] h-[48px] bg-[#1083E6] flex items-center justify-center rounded-[24px]" onClick={() => setCloseSettings(prev => !prev)}>
                                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.3337 13C11.3337 12.0696 11.3337 11.6044 11.2188 11.2259C10.9603 10.3736 10.2934 9.70669 9.44109 9.44816C9.06256 9.33333 8.59737 9.33333 7.66699 9.33333L4.33366 9.33333C3.40328 9.33333 2.93809 9.33333 2.55956 9.44816C1.7073 9.70669 1.04035 10.3736 0.781819 11.2259C0.666992 11.6044 0.666992 12.0696 0.666992 13M9.00033 4C9.00033 5.65685 7.65718 7 6.00033 7C4.34347 7 3.00033 5.65685 3.00033 4C3.00033 2.34315 4.34347 1 6.00033 1C7.65718 1 9.00033 2.34315 9.00033 4Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <button className="text-[#212121] font-inter font-[400] text-[18px] leading-[21px] bg-white rounded-[24px] h-[48px] px-[24px] text-nowrap" onClick={() => setCloseModal(prev => !prev)}>
                                    {$intel['app.header_button1']}
                                </button>
                                <button className="text-[#212121] font-inter font-[400] text-[18px] leading-[21px] bg-white rounded-[24px] h-[48px] px-[24px] text-nowrap" onClick={() => AUTHAPI.post("api/v1/accounts/logout/", { revoke_token: true })}>{$intel['app.header_button2']}</button>
                            </div>
                        </div>
                    </header>
                    <div className="container !mt-[85px]">
                        <div className="max-w-[1050px] flex relative flex-col gap-[57px] bg-[linear-gradient(0deg,_#21212199,_rgba(16,_131,_230,_0.2),_#21212199,_rgba(16,_131,_230,_0.2)),_linear-gradient(0deg,_#21212199,_rgba(33,_33,_33,_0.6),_#21212199,_rgba(33,_33,_33,_0.6))] rounded-[64px] p-[80px]">
                            <div>
                                <Swiper
                                    pagination={{
                                        clickable: true,
                                        el: ".swiper-pagination",
                                        type: "bullets"
                                    }}
                                    loop={true}
                                    autoplay={{
                                        delay: 2000,
                                    }}
                                    speed={500}
                                    modules={[Pagination, Navigation, Autoplay]}
                                    className="mySwiper"
                                >
                                    <SwiperSlide>
                                        <div className="w-[100%] min-w-[100%] max-w-[100%] snap-center">
                                            <p className="text-white font-inter font-[400] text-[20px] leading-[26px] mb-[24px]">{$intel['app.header_slider_1']}</p>
                                            <p className="text-white font-inter font-[700] text-[64px] leading-[70px] mb-[28px]">{$intel['app.header_slider_2']}</p>
                                            <p className="text-white font-inter font-[400] text-[20px] leading-[26px] opacity-[60%]">{$intel['app.header_slider_3']}</p>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="w-[100%] min-w-[100%] max-w-[100%] snap-center">
                                            <p className="text-white font-inter font-[400] text-[20px] leading-[26px] mb-[24px]">{$intel['app.header_slider_1']}</p>
                                            <p className="text-white font-inter font-[700] text-[64px] leading-[70px] mb-[28px]">{$intel['app.header_slider_2']}</p>
                                            <p className="text-white font-inter font-[400] text-[20px] leading-[26px] opacity-[60%]">{$intel['app.header_slider_3']}</p>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="w-[100%] min-w-[100%] max-w-[100%] snap-center">
                                            <p className="text-white font-inter font-[400] text-[20px] leading-[26px] mb-[24px]">{$intel['app.header_slider_1']}</p>
                                            <p className="text-white font-inter font-[700] text-[64px] leading-[70px] mb-[28px]">{$intel['app.header_slider_2']}</p>
                                            <p className="text-white font-inter font-[400] text-[20px] leading-[26px] opacity-[60%]">{$intel['app.header_slider_3']}</p>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="w-[100%] min-w-[100%] max-w-[100%] snap-center">
                                            <p className="text-white font-inter font-[400] text-[20px] leading-[26px] mb-[24px]">{$intel['app.header_slider_1']}</p>
                                            <p className="text-white font-inter font-[700] text-[64px] leading-[70px] mb-[28px]">{$intel['app.header_slider_2']}</p>
                                            <p className="text-white font-inter font-[400] text-[20px] leading-[26px] opacity-[60%]">{$intel['app.header_slider_3']}</p>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="w-[100%] min-w-[100%] max-w-[100%] snap-center">
                                            <p className="text-white font-inter font-[400] text-[20px] leading-[26px] mb-[24px]">{$intel['app.header_slider_1']}</p>
                                            <p className="text-white font-inter font-[700] text-[64px] leading-[70px] mb-[28px]">{$intel['app.header_slider_2']}</p>
                                            <p className="text-white font-inter font-[400] text-[20px] leading-[26px] opacity-[60%]">{$intel['app.header_slider_3']}</p>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="w-[100%] min-w-[100%] max-w-[100%] snap-center">
                                            <p className="text-white font-inter font-[400] text-[20px] leading-[26px] mb-[24px]">{$intel['app.header_slider_1']}</p>
                                            <p className="text-white font-inter font-[700] text-[64px] leading-[70px] mb-[28px]">{$intel['app.header_slider_2']}</p>
                                            <p className="text-white font-inter font-[400] text-[20px] leading-[26px] opacity-[60%]">{$intel['app.header_slider_3']}</p>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                            <div className="flex items-center justify-between mt-[40px] relative">
                                <button className="text-white font-inter font-[500] text-[20px] leading-[24px] cursor-pointer bg-[#1083E6] rounded-[24px] h-[48px] px-[24px]">{$intel['app.header_slide_watch']}</button>
                                <div className="swiper-pagination flex !w-[max-content] !right-0 !left-auto !top-[50%] !translate-y-[-50%] !h-[100%] [&>.swiper-pagination-bullet]:w-[12px] [&>.swiper-pagination-bullet]:h-[12px] [&>.swiper-pagination-bullet]:rounded-[50%] [&>.swiper-pagination-bullet]:border-[1px] [&>.swiper-pagination-bullet]:border-solid [&>.swiper-pagination-bullet]:border-[#FFFFFF] [&>.swiper-pagination-bullet]:bg-[transparent] [&>.swiper-pagination-bullet]:opacity-[100%] [&>.swiper-pagination-bullet-active]:!bg-[#FFFFFF] [&>.swiper-pagination-bullet]:bg-[red]"></div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="container !mt-[100px] !mb-[100px]">
                    <div className="flex items-center justify-between mb-[40px]">
                        <h2 className="text-[#212121] leading-[70px] text-[64px] font-[700] font-inter">{$intel['app.nav2']}</h2>
                        <div className="mr-auto ml-[40px] flex items-center gap-[8px]">
                            <button className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] h-[48px] px-[24px] rounded-[24px] bg-[#1083E61A]">{$intel['app.text_1']}</button>
                            <button className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] h-[48px] px-[24px] rounded-[24px] bg-[#1083E61A]">{$intel['app.text_2']}</button>
                            <button className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] h-[48px] px-[24px] rounded-[24px] bg-[#1083E61A] text-white !bg-[#1083E6]">{$intel['app.text_3']}</button>
                            <button className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] h-[48px] px-[24px] rounded-[24px] bg-[#1083E61A]">{$intel['app.text_4']}</button>
                        </div>
                        <div className="flex items-center">
                            <label className="flex items-center gap-[10px] bg-white h-[48px] pl-[24px] pr-[15px] rounded-[24px] cursor-pointer">
                                <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 12.5L10.1 9.6M6.33333 2.5C8.17428 2.5 9.66667 3.99238 9.66667 5.83333M11.6667 5.83333C11.6667 8.77885 9.27885 11.1667 6.33333 11.1667C3.38781 11.1667 1 8.77885 1 5.83333C1 2.88781 3.38781 0.5 6.33333 0.5C9.27885 0.5 11.6667 2.88781 11.6667 5.83333Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input type="text" placeholder={$intel['app.header_search']} className="text-[#212121] placeholder:opacity-[80%] bg-transparent font-inter font-[300] text-[16px] leading-[19px] placeholder:text-[#212121] outline-none underline" />
                            </label>
                            <div className="flex items-center gap-[10px] bg-white h-[48px] px-[24px] rounded-[24px] cursor-pointer ml-[12px]">
                                <p className="text-[#212121CC,_#212121CC] font-inter font-[400] text-[18px] leading-[22px]">{$intel['app.text_5']}</p>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.8">
                                        <path d="M4 6L8 10L12 6" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>
                            </div>
                            <div className="h-[48px] rounded-[24px] flex items-center gap-[8px] bg-white p-[6px] ml-[12px]">
                                <button className="h-[36px] w-[36px] rounded-[50%] bg-[#1083E6] flex items-center justify-center">
                                    <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.5 1.0835L15.5 1.0835M0.5 6.91683L15.5 6.91683" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <button className="h-[36px] w-[36px] rounded-[50%] flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.66667 2.5L13.3333 17.5M2.5 14.1667L10 10M6.5 17.5H13.5C14.9001 17.5 15.6002 17.5 16.135 17.2275C16.6054 16.9878 16.9878 16.6054 17.2275 16.135C17.5 15.6002 17.5 14.9001 17.5 13.5V6.5C17.5 5.09987 17.5 4.3998 17.2275 3.86502C16.9878 3.39462 16.6054 3.01217 16.135 2.77248C15.6002 2.5 14.9001 2.5 13.5 2.5L6.5 2.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5L2.5 13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5Z" stroke="#1083E6" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 [&>div:nth-child(4)]:border-r-[transparent] [&>div:nth-child(8)]:border-r-[transparent]">
                        {
                            tours?.data?.results?.map((item: any, index: number) => (
                                <div key={item.id} className={`max-w-[420px] w-[100%] py-[32px] px-[24px] border-r border-b border-solid border-r-[#21212180] border-b-[transparent] ${index < 4 ? "!border-b-[#21212180]" : ""}`}>
                                    <div className={`bg-[url('${item.image}')] bg-cover bg-center h-[300px] rounded-[32px] p-[16px] flex flex-col justify-between`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-[4px] h-[42px] bg-white px-[12px] rounded-[24px]">
                                                <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">Рейтинг</p>
                                                <div className="flex items-center">
                                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                                    </svg>
                                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                                    </svg>
                                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                                    </svg>
                                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25577 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7525 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84227 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7525 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25577 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <button className="w-[40px] h-[40px] rounded-[50%] bg-white flex items-center justify-center" onClick={() => {
                                                AUTHAPI.get("api/v1/favorite-tours/")
                                            }}>
                                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.7404 1C13.0886 1 14.6663 3.235 14.6663 5.32C14.6663 9.5425 8.11819 13 7.99967 13C7.88116 13 1.33301 9.5425 1.33301 5.32C1.33301 3.235 2.91079 1 5.25893 1C6.60708 1 7.48856 1.6825 7.99967 2.2825C8.51079 1.6825 9.39227 1 10.7404 1Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="text-[#212121] font-inter font-[400] text-[14px] leading-[16px] h-[42px] bg-white rounded-[24px] flex items-center px-[24px] w-[max-content]">22.10.24</div>
                                    </div>
                                    <h4 className="text-[#212121] font-inter font-[600] text-[28px] leading-[30px] mt-[30px] mb-[16px] break-words text-ellipsis break-all hid_text_elips">{item.name}</h4>
                                    <div className="flex flex-wrap gap-[7px] mb-[30px]">
                                        {
                                            item.tags.map((val: any) => (
                                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">{val.title}</button>
                                            ))
                                        }
                                    </div>
                                    <div className="flex justify-between gap-[8px]">
                                        <div className="flex">
                                            <p className="text-[#212121] font-inter font-[700] text-[24px] leading-[26px] h-[54px] w-[75px] flex justify-center items-center">{item.price}$</p>
                                            <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px] opacity-[70%]">157$</p>
                                        </div>
                                        <div className="bg-white border border-solid border-[#1083E6] rounded-[32px] flex items-center w-[max-content] h-[54px] px-[20px] gap-[4px] ml-auto">
                                            <button className="w-[20px] h-[20px] flex items-center justify-center">
                                                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6 11L1 6L6 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                            <p className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px]">34</p>
                                            <button className="w-[20px] h-[20px] flex items-center justify-center">
                                                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 11L6 6L1 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </div>
                                        <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#1083E6] h-[54px] px-[32px] rounded-[32px]">Купить</button>
                                    </div>
                                </div>
                            ))
                        }
                        {/* <div className="max-w-[420px] w-[100%] py-[32px] px-[24px] border-r border-b border-r-solid border-b-solid border-r-[#21212180] border-b-[#21212180]">
                            <div className="bg-[url(/assets/img/cart_image.jpg)] bg-cover bg-center h-[300px] rounded-[32px] p-[16px] flex flex-col justify-between">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-[4px] h-[42px] bg-white px-[12px] rounded-[24px]">
                                        <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">Рейтинг</p>
                                        <div className="flex items-center">
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25577 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7525 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84227 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7525 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25577 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <button className="w-[40px] h-[40px] rounded-[50%] bg-white flex items-center justify-center">
                                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.7404 1C13.0886 1 14.6663 3.235 14.6663 5.32C14.6663 9.5425 8.11819 13 7.99967 13C7.88116 13 1.33301 9.5425 1.33301 5.32C1.33301 3.235 2.91079 1 5.25893 1C6.60708 1 7.48856 1.6825 7.99967 2.2825C8.51079 1.6825 9.39227 1 10.7404 1Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-[#212121] font-inter font-[400] text-[14px] leading-[16px] h-[42px] bg-white rounded-[24px] flex items-center px-[24px] w-[max-content]">22.10.24</div>
                            </div>
                            <h4 className="text-[#212121] font-inter font-[600] text-[28px] leading-[30px] mt-[30px] mb-[16px]">Однодневный поход в Кара-кой</h4>
                            <div className="flex flex-wrap gap-[7px] mb-[30px]">
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Кыргызстан</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Однодневный</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">В палатке</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Выезд утром</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Без палатки</button>
                            </div>
                            <div className="flex justify-between gap-[8px]">
                                <div className="flex">
                                    <p className="text-[#212121] font-inter font-[700] text-[24px] leading-[26px] h-[54px] w-[75px] flex justify-center items-center">15$</p>
                                    <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px] opacity-[70%]">157$</p>
                                </div>
                                <div className="bg-white border border-solid border-[#1083E6] rounded-[32px] flex items-center w-[max-content] h-[54px] px-[20px] gap-[4px] ml-auto">
                                    <button className="w-[20px] h-[20px] flex items-center justify-center">
                                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 11L1 6L6 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <p className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px]">34</p>
                                    <button className="w-[20px] h-[20px] flex items-center justify-center">
                                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 11L6 6L1 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#1083E6] h-[54px] px-[32px] rounded-[32px]">Купить</button>
                            </div>
                        </div>
                        <div className="max-w-[420px] w-[100%] py-[32px] px-[24px] border-r border-b border-r-solid border-b-solid border-r-[#21212180] border-b-[#21212180]">
                            <div className="bg-[url(/assets/img/cart_image.jpg)] bg-cover bg-center h-[300px] rounded-[32px] p-[16px] flex flex-col justify-between">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-[4px] h-[42px] bg-white px-[12px] rounded-[24px]">
                                        <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">Рейтинг</p>
                                        <div className="flex items-center">
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25577 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7525 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84227 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7525 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25577 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <button className="w-[40px] h-[40px] rounded-[50%] bg-white flex items-center justify-center">
                                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.7404 1C13.0886 1 14.6663 3.235 14.6663 5.32C14.6663 9.5425 8.11819 13 7.99967 13C7.88116 13 1.33301 9.5425 1.33301 5.32C1.33301 3.235 2.91079 1 5.25893 1C6.60708 1 7.48856 1.6825 7.99967 2.2825C8.51079 1.6825 9.39227 1 10.7404 1Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-[#212121] font-inter font-[400] text-[14px] leading-[16px] h-[42px] bg-white rounded-[24px] flex items-center px-[24px] w-[max-content]">22.10.24</div>
                            </div>
                            <h4 className="text-[#212121] font-inter font-[600] text-[28px] leading-[30px] mt-[30px] mb-[16px]">Однодневный поход в Кара-кой</h4>
                            <div className="flex flex-wrap gap-[7px] mb-[30px]">
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Кыргызстан</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Однодневный</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">В палатке</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Выезд утром</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Без палатки</button>
                            </div>
                            <div className="flex justify-between gap-[8px]">
                                <div className="flex">
                                    <p className="text-[#212121] font-inter font-[700] text-[24px] leading-[26px] h-[54px] w-[75px] flex justify-center items-center">15$</p>
                                    <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px] opacity-[70%]">157$</p>
                                </div>
                                <div className="bg-white border border-solid border-[#1083E6] rounded-[32px] flex items-center w-[max-content] h-[54px] px-[20px] gap-[4px] ml-auto">
                                    <button className="w-[20px] h-[20px] flex items-center justify-center">
                                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 11L1 6L6 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <p className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px]">34</p>
                                    <button className="w-[20px] h-[20px] flex items-center justify-center">
                                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 11L6 6L1 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#1083E6] h-[54px] px-[32px] rounded-[32px]">Купить</button>
                            </div>
                        </div>
                        <div className="max-w-[420px] w-[100%] py-[32px] px-[24px] border-r border-b border-r-solid border-b-solid border-r-[#21212180] border-b-[#21212180]">
                            <div className="bg-[url(/assets/img/cart_image.jpg)] bg-cover bg-center h-[300px] rounded-[32px] p-[16px] flex flex-col justify-between">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-[4px] h-[42px] bg-white px-[12px] rounded-[24px]">
                                        <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">Рейтинг</p>
                                        <div className="flex items-center">
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25577 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7525 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84227 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7525 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25577 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <button className="w-[40px] h-[40px] rounded-[50%] bg-white flex items-center justify-center">
                                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.7404 1C13.0886 1 14.6663 3.235 14.6663 5.32C14.6663 9.5425 8.11819 13 7.99967 13C7.88116 13 1.33301 9.5425 1.33301 5.32C1.33301 3.235 2.91079 1 5.25893 1C6.60708 1 7.48856 1.6825 7.99967 2.2825C8.51079 1.6825 9.39227 1 10.7404 1Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-[#212121] font-inter font-[400] text-[14px] leading-[16px] h-[42px] bg-white rounded-[24px] flex items-center px-[24px] w-[max-content]">22.10.24</div>
                            </div>
                            <h4 className="text-[#212121] font-inter font-[600] text-[28px] leading-[30px] mt-[30px] mb-[16px]">Однодневный поход в Кара-кой</h4>
                            <div className="flex flex-wrap gap-[7px] mb-[30px]">
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Кыргызстан</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Однодневный</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">В палатке</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Выезд утром</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Без палатки</button>
                            </div>
                            <div className="flex justify-between gap-[8px]">
                                <div className="flex">
                                    <p className="text-[#212121] font-inter font-[700] text-[24px] leading-[26px] h-[54px] w-[75px] flex justify-center items-center">15$</p>
                                    <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px] opacity-[70%]">157$</p>
                                </div>
                                <div className="bg-white border border-solid border-[#1083E6] rounded-[32px] flex items-center w-[max-content] h-[54px] px-[20px] gap-[4px] ml-auto">
                                    <button className="w-[20px] h-[20px] flex items-center justify-center">
                                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 11L1 6L6 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <p className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px]">34</p>
                                    <button className="w-[20px] h-[20px] flex items-center justify-center">
                                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 11L6 6L1 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#1083E6] h-[54px] px-[32px] rounded-[32px]">Купить</button>
                            </div>
                        </div>
                        <div className="max-w-[420px] w-[100%] py-[32px] px-[24px] border-r border-b border-r-solid border-b-solid border-r-[#21212180] border-b-[#21212180]">
                            <div className="bg-[url(/assets/img/cart_image.jpg)] bg-cover bg-center h-[300px] rounded-[32px] p-[16px] flex flex-col justify-between">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-[4px] h-[42px] bg-white px-[12px] rounded-[24px]">
                                        <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">Рейтинг</p>
                                        <div className="flex items-center">
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25577 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7525 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84227 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7525 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25577 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <button className="w-[40px] h-[40px] rounded-[50%] bg-white flex items-center justify-center">
                                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.7404 1C13.0886 1 14.6663 3.235 14.6663 5.32C14.6663 9.5425 8.11819 13 7.99967 13C7.88116 13 1.33301 9.5425 1.33301 5.32C1.33301 3.235 2.91079 1 5.25893 1C6.60708 1 7.48856 1.6825 7.99967 2.2825C8.51079 1.6825 9.39227 1 10.7404 1Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-[#212121] font-inter font-[400] text-[14px] leading-[16px] h-[42px] bg-white rounded-[24px] flex items-center px-[24px] w-[max-content]">22.10.24</div>
                            </div>
                            <h4 className="text-[#212121] font-inter font-[600] text-[28px] leading-[30px] mt-[30px] mb-[16px]">Однодневный поход в Кара-кой</h4>
                            <div className="flex flex-wrap gap-[7px] mb-[30px]">
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Кыргызстан</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Однодневный</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">В палатке</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Выезд утром</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Без палатки</button>
                            </div>
                            <div className="flex justify-between gap-[8px]">
                                <div className="flex">
                                    <p className="text-[#212121] font-inter font-[700] text-[24px] leading-[26px] h-[54px] w-[75px] flex justify-center items-center">15$</p>
                                    <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px] opacity-[70%]">157$</p>
                                </div>
                                <div className="bg-white border border-solid border-[#1083E6] rounded-[32px] flex items-center w-[max-content] h-[54px] px-[20px] gap-[4px] ml-auto">
                                    <button className="w-[20px] h-[20px] flex items-center justify-center">
                                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 11L1 6L6 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <p className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px]">34</p>
                                    <button className="w-[20px] h-[20px] flex items-center justify-center">
                                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 11L6 6L1 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#1083E6] h-[54px] px-[32px] rounded-[32px]">Купить</button>
                            </div>
                        </div>
                        <div className="max-w-[420px] w-[100%] py-[32px] px-[24px] border-r border-b border-r-solid border-b-solid border-r-[#21212180] border-b-[#21212180]">
                            <div className="bg-[url(/assets/img/cart_image.jpg)] bg-cover bg-center h-[300px] rounded-[32px] p-[16px] flex flex-col justify-between">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-[4px] h-[42px] bg-white px-[12px] rounded-[24px]">
                                        <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">Рейтинг</p>
                                        <div className="flex items-center">
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25577 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7525 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84227 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7525 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25577 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <button className="w-[40px] h-[40px] rounded-[50%] bg-white flex items-center justify-center">
                                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.7404 1C13.0886 1 14.6663 3.235 14.6663 5.32C14.6663 9.5425 8.11819 13 7.99967 13C7.88116 13 1.33301 9.5425 1.33301 5.32C1.33301 3.235 2.91079 1 5.25893 1C6.60708 1 7.48856 1.6825 7.99967 2.2825C8.51079 1.6825 9.39227 1 10.7404 1Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-[#212121] font-inter font-[400] text-[14px] leading-[16px] h-[42px] bg-white rounded-[24px] flex items-center px-[24px] w-[max-content]">22.10.24</div>
                            </div>
                            <h4 className="text-[#212121] font-inter font-[600] text-[28px] leading-[30px] mt-[30px] mb-[16px]">Однодневный поход в Кара-кой</h4>
                            <div className="flex flex-wrap gap-[7px] mb-[30px]">
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Кыргызстан</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Однодневный</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">В палатке</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Выезд утром</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Без палатки</button>
                            </div>
                            <div className="flex justify-between gap-[8px]">
                                <div className="flex">
                                    <p className="text-[#212121] font-inter font-[700] text-[24px] leading-[26px] h-[54px] w-[75px] flex justify-center items-center">15$</p>
                                    <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px] opacity-[70%]">157$</p>
                                </div>
                                <div className="bg-white border border-solid border-[#1083E6] rounded-[32px] flex items-center w-[max-content] h-[54px] px-[20px] gap-[4px] ml-auto">
                                    <button className="w-[20px] h-[20px] flex items-center justify-center">
                                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 11L1 6L6 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <p className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px]">34</p>
                                    <button className="w-[20px] h-[20px] flex items-center justify-center">
                                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 11L6 6L1 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#1083E6] h-[54px] px-[32px] rounded-[32px]">Купить</button>
                            </div>
                        </div>
                        <div className="max-w-[420px] w-[100%] py-[32px] px-[24px] border-r border-b border-r-solid border-b-solid border-r-[#21212180] border-b-[#21212180]">
                            <div className="bg-[url(/assets/img/cart_image.jpg)] bg-cover bg-center h-[300px] rounded-[32px] p-[16px] flex flex-col justify-between">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-[4px] h-[42px] bg-white px-[12px] rounded-[24px]">
                                        <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">Рейтинг</p>
                                        <div className="flex items-center">
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25577 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7525 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84227 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7525 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25577 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <button className="w-[40px] h-[40px] rounded-[50%] bg-white flex items-center justify-center">
                                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.7404 1C13.0886 1 14.6663 3.235 14.6663 5.32C14.6663 9.5425 8.11819 13 7.99967 13C7.88116 13 1.33301 9.5425 1.33301 5.32C1.33301 3.235 2.91079 1 5.25893 1C6.60708 1 7.48856 1.6825 7.99967 2.2825C8.51079 1.6825 9.39227 1 10.7404 1Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-[#212121] font-inter font-[400] text-[14px] leading-[16px] h-[42px] bg-white rounded-[24px] flex items-center px-[24px] w-[max-content]">22.10.24</div>
                            </div>
                            <h4 className="text-[#212121] font-inter font-[600] text-[28px] leading-[30px] mt-[30px] mb-[16px]">Однодневный поход в Кара-кой</h4>
                            <div className="flex flex-wrap gap-[7px] mb-[30px]">
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Кыргызстан</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Однодневный</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">В палатке</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Выезд утром</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Без палатки</button>
                            </div>
                            <div className="flex justify-between gap-[8px]">
                                <div className="flex">
                                    <p className="text-[#212121] font-inter font-[700] text-[24px] leading-[26px] h-[54px] w-[75px] flex justify-center items-center">15$</p>
                                    <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px] opacity-[70%]">157$</p>
                                </div>
                                <div className="bg-white border border-solid border-[#1083E6] rounded-[32px] flex items-center w-[max-content] h-[54px] px-[20px] gap-[4px] ml-auto">
                                    <button className="w-[20px] h-[20px] flex items-center justify-center">
                                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 11L1 6L6 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <p className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px]">34</p>
                                    <button className="w-[20px] h-[20px] flex items-center justify-center">
                                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 11L6 6L1 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#1083E6] h-[54px] px-[32px] rounded-[32px]">Купить</button>
                            </div>
                        </div>
                        <div className="max-w-[420px] w-[100%] py-[32px] px-[24px] border-r border-b border-r-solid border-b-solid border-r-[#21212180] border-b-[#21212180]">
                            <div className="bg-[url(/assets/img/cart_image.jpg)] bg-cover bg-center h-[300px] rounded-[32px] p-[16px] flex flex-col justify-between">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-[4px] h-[42px] bg-white px-[12px] rounded-[24px]">
                                        <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">Рейтинг</p>
                                        <div className="flex items-center">
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25577 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7525 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84227 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7525 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25577 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <button className="w-[40px] h-[40px] rounded-[50%] bg-white flex items-center justify-center">
                                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.7404 1C13.0886 1 14.6663 3.235 14.6663 5.32C14.6663 9.5425 8.11819 13 7.99967 13C7.88116 13 1.33301 9.5425 1.33301 5.32C1.33301 3.235 2.91079 1 5.25893 1C6.60708 1 7.48856 1.6825 7.99967 2.2825C8.51079 1.6825 9.39227 1 10.7404 1Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-[#212121] font-inter font-[400] text-[14px] leading-[16px] h-[42px] bg-white rounded-[24px] flex items-center px-[24px] w-[max-content]">22.10.24</div>
                            </div>
                            <h4 className="text-[#212121] font-inter font-[600] text-[28px] leading-[30px] mt-[30px] mb-[16px]">Однодневный поход в Кара-кой</h4>
                            <div className="flex flex-wrap gap-[7px] mb-[30px]">
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Кыргызстан</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Однодневный</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">В палатке</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Выезд утром</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Без палатки</button>
                            </div>
                            <div className="flex justify-between gap-[8px]">
                                <div className="flex">
                                    <p className="text-[#212121] font-inter font-[700] text-[24px] leading-[26px] h-[54px] w-[75px] flex justify-center items-center">15$</p>
                                    <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px] opacity-[70%]">157$</p>
                                </div>
                                <div className="bg-white border border-solid border-[#1083E6] rounded-[32px] flex items-center w-[max-content] h-[54px] px-[20px] gap-[4px] ml-auto">
                                    <button className="w-[20px] h-[20px] flex items-center justify-center">
                                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 11L1 6L6 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <p className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px]">34</p>
                                    <button className="w-[20px] h-[20px] flex items-center justify-center">
                                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 11L6 6L1 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#1083E6] h-[54px] px-[32px] rounded-[32px]">Купить</button>
                            </div>
                        </div>
                        <div className="max-w-[420px] w-[100%] py-[32px] px-[24px] border-r border-b border-r-solid border-b-solid border-r-[#21212180] border-b-[#21212180]">
                            <div className="bg-[url(/assets/img/cart_image.jpg)] bg-cover bg-center h-[300px] rounded-[32px] p-[16px] flex flex-col justify-between">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-[4px] h-[42px] bg-white px-[12px] rounded-[24px]">
                                        <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">Рейтинг</p>
                                        <div className="flex items-center">
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                            </svg>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25577 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7525 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84227 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7525 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25577 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <button className="w-[40px] h-[40px] rounded-[50%] bg-white flex items-center justify-center">
                                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.7404 1C13.0886 1 14.6663 3.235 14.6663 5.32C14.6663 9.5425 8.11819 13 7.99967 13C7.88116 13 1.33301 9.5425 1.33301 5.32C1.33301 3.235 2.91079 1 5.25893 1C6.60708 1 7.48856 1.6825 7.99967 2.2825C8.51079 1.6825 9.39227 1 10.7404 1Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-[#212121] font-inter font-[400] text-[14px] leading-[16px] h-[42px] bg-white rounded-[24px] flex items-center px-[24px] w-[max-content]">22.10.24</div>
                            </div>
                            <h4 className="text-[#212121] font-inter font-[600] text-[28px] leading-[30px] mt-[30px] mb-[16px]">Однодневный поход в Кара-кой</h4>
                            <div className="flex flex-wrap gap-[7px] mb-[30px]">
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Кыргызстан</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Однодневный</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">В палатке</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Выезд утром</button>
                                <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Без палатки</button>
                            </div>
                            <div className="flex justify-between gap-[8px]">
                                <div className="flex">
                                    <p className="text-[#212121] font-inter font-[700] text-[24px] leading-[26px] h-[54px] w-[75px] flex justify-center items-center">15$</p>
                                    <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px] opacity-[70%]">157$</p>
                                </div>
                                <div className="bg-white border border-solid border-[#1083E6] rounded-[32px] flex items-center w-[max-content] h-[54px] px-[20px] gap-[4px] ml-auto">
                                    <button className="w-[20px] h-[20px] flex items-center justify-center">
                                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 11L1 6L6 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <p className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px]">34</p>
                                    <button className="w-[20px] h-[20px] flex items-center justify-center">
                                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 11L6 6L1 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#1083E6] h-[54px] px-[32px] rounded-[32px]">Купить</button>
                            </div>
                        </div> */}
                    </div>
                    <div className="flex items-center justify-between mt-[43px]">
                        <button className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[24px] border-[1px] border-solid border-[#1083E6] h-[54px] px-[32px] rounded-[32px]">Все туры</button>
                        <div className="flex items-center gap-[8px]">
                            <button className="text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[48px] h-[48px] rounded-[50%] bg-[#2121210A] flex items-center justify-center duration-200 hover:bg-[#1083E6] hover:text-white">1</button>
                            <button className="text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[48px] h-[48px] rounded-[50%] bg-[#2121210A] flex items-center justify-center duration-200 hover:bg-[#1083E6] hover:text-white text-white !bg-[#1083E6]">2</button>
                            <button className="text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[48px] h-[48px] rounded-[50%] bg-[#2121210A] flex items-center justify-center duration-200 hover:bg-[#1083E6] hover:text-white">3</button>
                            <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[19px] w-[22px] h-[48px] flex items-center justify-center">...</p>
                            <button className="text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[48px] h-[48px] rounded-[50%] bg-[#2121210A] flex items-center justify-center duration-200 hover:bg-[#1083E6] hover:text-white">21</button>
                            <button className="text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[48px] h-[48px] rounded-[50%] bg-[#2121210A] flex items-center justify-center duration-200 hover:bg-[#1083E6] hover:text-white">22</button>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[#212121] leading-[70px] text-[64px] font-[700] font-inter">Турагенции</h2>
                        <div className="flex items-center gap-[10px] bg-white h-[48px] px-[24px] rounded-[24px] cursor-pointer ml-[12px]">
                            <p className="text-[#212121CC,_#212121CC] font-inter font-[400] text-[18px] leading-[22px]">Акции и скидки</p>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.8">
                                    <path d="M4 6L8 10L12 6" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className="mt-[40px] mb-[40px] grid grid-cols-4">
                        <div className="max-w-[420px] w-[100%] py-[32px] px-[24px] border-r border-solid border-r-[#21212180]">
                            <div className="flex items-center justify-between mb-[12px]">
                                <div className="flex items-center gap-[4px] h-[42px] bg-white px-[12px] rounded-[24px]">
                                    <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">Рейтинг</p>
                                    <div className="flex items-center">
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                        </svg>
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                        </svg>
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                        </svg>
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                        </svg>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25577 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7525 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84227 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7525 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25577 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">( 27 туров)</div>
                            </div>
                            <img src="/assets/img/block_1.png" className="w-[100%] h-[270px] object-cover" />
                            <h6 className="text-[#212121] font-inter font-[600] text-[28px] leading-[30px] mx-auto text-center mt-[20px] mb-[30px] max-w-[50%]">Турагенция Anex tour</h6>
                            <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#1083E6] h-[54px] px-[32px] rounded-[32px] mx-auto flex items-center">Смотреть туры</button>
                        </div>
                        <div className="max-w-[420px] w-[100%] py-[32px] px-[24px] border-r border-solid border-r-[#21212180]">
                            <div className="flex items-center justify-between mb-[12px]">
                                <div className="flex items-center gap-[4px] h-[42px] bg-white px-[12px] rounded-[24px]">
                                    <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">Рейтинг</p>
                                    <div className="flex items-center">
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                        </svg>
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                        </svg>
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                        </svg>
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                        </svg>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25577 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7525 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84227 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7525 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25577 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">( 27 туров)</div>
                            </div>
                            <img src="/assets/img/block_1.png" className="w-[100%] h-[270px] object-cover" />
                            <h6 className="text-[#212121] font-inter font-[600] text-[28px] leading-[30px] mx-auto text-center mt-[20px] mb-[30px] max-w-[50%]">Турагенция Anex tour</h6>
                            <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#1083E6] h-[54px] px-[32px] rounded-[32px] mx-auto flex items-center">Смотреть туры</button>
                        </div>
                        <div className="max-w-[420px] w-[100%] py-[32px] px-[24px] border-r border-solid border-r-[#21212180]">
                            <div className="flex items-center justify-between mb-[12px]">
                                <div className="flex items-center gap-[4px] h-[42px] bg-white px-[12px] rounded-[24px]">
                                    <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">Рейтинг</p>
                                    <div className="flex items-center">
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                        </svg>
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                        </svg>
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                        </svg>
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                        </svg>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25577 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7525 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84227 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7525 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25577 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">( 27 туров)</div>
                            </div>
                            <img src="/assets/img/block_1.png" className="w-[100%] h-[270px] object-cover" />
                            <h6 className="text-[#212121] font-inter font-[600] text-[28px] leading-[30px] mx-auto text-center mt-[20px] mb-[30px] max-w-[50%]">Турагенция Anex tour</h6>
                            <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#1083E6] h-[54px] px-[32px] rounded-[32px] mx-auto flex items-center">Смотреть туры</button>
                        </div>
                        <div className="max-w-[420px] w-[100%] py-[32px] px-[24px] border-r border-solid border-r-[#21212180]">
                            <div className="flex items-center justify-between mb-[12px]">
                                <div className="flex items-center gap-[4px] h-[42px] bg-white px-[12px] rounded-[24px]">
                                    <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">Рейтинг</p>
                                    <div className="flex items-center">
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                        </svg>
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                        </svg>
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                        </svg>
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                        </svg>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25577 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7525 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84227 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7525 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25577 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">( 27 туров)</div>
                            </div>
                            <img src="/assets/img/block_1.png" className="w-[100%] h-[270px] object-cover" />
                            <h6 className="text-[#212121] font-inter font-[600] text-[28px] leading-[30px] mx-auto text-center mt-[20px] mb-[30px] max-w-[50%]">Турагенция Anex tour</h6>
                            <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#1083E6] h-[54px] px-[32px] rounded-[32px] mx-auto flex items-center">Смотреть туры</button>
                        </div>
                    </div>
                    <button className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[24px] border-[1px] border-solid border-[#1083E6] h-[54px] px-[32px] rounded-[32px] text-center mx-auto flex items-center">Все турагенты</button>
                </div>
                <div className="container !mt-[100px] !mb-[100px]">
                    <div className="bg-[#1083E6] rounded-[64px] p-[80px]">
                        <svg width="58" height="26" viewBox="0 0 58 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.6069 9.14844C17.4396 8.57082 17.2045 8.06047 16.9018 7.61736C16.599 7.16635 16.2285 6.78655 15.7903 6.47796C15.3601 6.16146 14.8661 5.92013 14.3084 5.75397C13.7587 5.58781 13.1492 5.50472 12.4799 5.50472C11.2291 5.50472 10.1296 5.81331 9.18146 6.43049C8.24132 7.04766 7.50833 7.94573 6.98249 9.1247C6.45665 10.2958 6.19373 11.7279 6.19373 13.4212C6.19373 15.1145 6.45266 16.5546 6.97054 17.7414C7.48841 18.9283 8.2214 19.8343 9.16951 20.4594C10.1176 21.0766 11.237 21.3851 12.5277 21.3851C13.6989 21.3851 14.6988 21.1794 15.5274 20.768C16.364 20.3486 17.0014 19.7591 17.4396 18.9995C17.8857 18.2399 18.1088 17.3418 18.1088 16.3053L19.1605 16.4596H12.8504V12.5904H23.0924V15.6525C23.0924 17.7889 22.6382 19.6246 21.7299 21.1596C20.8217 22.6867 19.5708 23.8657 17.9774 24.6965C16.3839 25.5194 14.5594 25.9309 12.5038 25.9309C10.2092 25.9309 8.19352 25.4284 6.45665 24.4235C4.71978 23.4107 3.36534 21.9746 2.39333 20.1152C1.42929 18.2478 0.947266 16.0323 0.947266 13.4687C0.947266 11.4985 1.23409 9.74187 1.80773 8.19893C2.38935 6.64808 3.20201 5.33461 4.24572 4.2585C5.28944 3.1824 6.50445 2.36346 7.89076 1.80167C9.27707 1.23988 10.7789 0.958984 12.3963 0.958984C13.7826 0.958984 15.0733 1.16075 16.2684 1.56429C17.4635 1.95992 18.5231 2.52171 19.4473 3.24966C20.3795 3.97761 21.1404 4.84403 21.7299 5.84892C22.3195 6.84589 22.698 7.94573 22.8653 9.14844H17.6069Z" fill="white" />
                            <path d="M32.1542 1.29131V25.5986H26.9794V1.29131H32.1542Z" fill="white" />
                            <path d="M45.0881 25.5986H36.4117V1.29131H45.1598C47.6217 1.29131 49.741 1.77793 51.5177 2.75117C53.2944 3.7165 54.6608 5.10514 55.6168 6.91711C56.5809 8.72907 57.0629 10.8971 57.0629 13.4212C57.0629 15.9532 56.5809 18.1291 55.6168 19.949C54.6608 21.7689 53.2864 23.1655 51.4938 24.1387C49.7091 25.1119 47.5739 25.5986 45.0881 25.5986ZM41.5864 21.1952H44.8729C46.4027 21.1952 47.6894 20.9262 48.7331 20.3882C49.7848 19.8422 50.5735 18.9995 51.0994 17.8601C51.6332 16.7128 51.9001 15.2332 51.9001 13.4212C51.9001 11.6251 51.6332 10.1573 51.0994 9.01788C50.5735 7.87848 49.7888 7.03975 48.745 6.5017C47.7013 5.96365 46.4146 5.69462 44.8849 5.69462H41.5864V21.1952Z" fill="white" />
                        </svg>
                        <div className="mt-[40px] flex gap-[40px]">
                            <div>
                                <div className="flex items-start justify-between gap-[7px] bg-[url(/assets/img/block_2.jpg)] bg-center bg-cover w-[900px] rounded-[32px] p-[16px] h-[336px]">
                                    <div className="text-[#212121] font-inter font-[400] text-[14px] leading-[18px] bg-white h-[42px] px-[24px] flex items-center w-[max-content] rounded-[24px]">22.10.24</div>
                                    <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[18px] bg-white h-[33px] px-[16px] flex items-center w-[max-content] rounded-[24px] ml-auto">Кыргызстан</button>
                                    <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[18px] bg-white h-[33px] px-[16px] flex items-center w-[max-content] rounded-[24px]">Однодневный</button>
                                    <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[18px] bg-white h-[33px] px-[16px] flex items-center w-[max-content] rounded-[24px]">В палатке</button>
                                    <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[18px] bg-white h-[33px] px-[16px] flex items-center w-[max-content] rounded-[24px]">Выезд утром</button>
                                    <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[18px] bg-white h-[33px] px-[16px] flex items-center w-[max-content] rounded-[24px]">Без палатки</button>
                                </div>
                                <p className="text-white font-inter font-[400] text-[20px] leading-[26px] mt-[24px]">Бронируйте свой тур прямо сейчас!</p>
                            </div>
                            <div>
                                <h5 className="text-white font-inter font-[700] text-[40px] leading-[44px] mb-[28px]">Туры по горним ущельям с 20% скидкой только на этих выходных</h5>
                                <p className="text-white font-inter font-[400] text-[20px] leading-[26px] opacity-[60%] mb-[28px]">Не упустите возможность окунуться в атмосферу приключений по самым выгодным ценам! Бронируйте свой тур прямо сейчас!</p>
                                <div className="flex justify-between">
                                    <button className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px] h-[54px] rounded-[32px] bg-white px-[32px]">Купить</button>
                                    <div className="flex items-center gap-[5px]">
                                        <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#FFFFFF] hover:bg-white duration-200 bg-white"></button>
                                        <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#FFFFFF] hover:bg-white duration-200"></button>
                                        <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#FFFFFF] hover:bg-white duration-200"></button>
                                        <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#FFFFFF] hover:bg-white duration-200"></button>
                                        <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#FFFFFF] hover:bg-white duration-200"></button>
                                        <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#FFFFFF] hover:bg-white duration-200"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="border-t border-solid border-t-[#21212180]">
                    <div className="container">
                        <div className="flex items-center justify-between py-[80px]">
                            <div>
                                <svg width="58" height="26" viewBox="0 0 58 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.6069 9.14844C17.4396 8.57082 17.2045 8.06047 16.9018 7.61736C16.599 7.16635 16.2285 6.78655 15.7903 6.47796C15.3601 6.16146 14.8661 5.92013 14.3084 5.75397C13.7587 5.58781 13.1492 5.50472 12.4799 5.50472C11.2291 5.50472 10.1296 5.81331 9.18146 6.43049C8.24132 7.04766 7.50833 7.94573 6.98249 9.1247C6.45665 10.2958 6.19373 11.7279 6.19373 13.4212C6.19373 15.1145 6.45266 16.5546 6.97054 17.7414C7.48841 18.9283 8.2214 19.8343 9.16951 20.4594C10.1176 21.0766 11.237 21.3851 12.5277 21.3851C13.6989 21.3851 14.6988 21.1794 15.5274 20.768C16.364 20.3486 17.0014 19.7591 17.4396 18.9995C17.8857 18.2399 18.1088 17.3418 18.1088 16.3053L19.1605 16.4596H12.8504V12.5904H23.0924V15.6525C23.0924 17.7889 22.6382 19.6246 21.7299 21.1596C20.8217 22.6867 19.5708 23.8657 17.9774 24.6965C16.3839 25.5194 14.5594 25.9309 12.5038 25.9309C10.2092 25.9309 8.19352 25.4284 6.45665 24.4235C4.71978 23.4107 3.36534 21.9746 2.39333 20.1152C1.42929 18.2478 0.947266 16.0323 0.947266 13.4687C0.947266 11.4985 1.23409 9.74187 1.80773 8.19893C2.38935 6.64808 3.20201 5.33461 4.24572 4.2585C5.28944 3.1824 6.50445 2.36346 7.89076 1.80167C9.27707 1.23988 10.7789 0.958984 12.3963 0.958984C13.7826 0.958984 15.0733 1.16075 16.2684 1.56429C17.4635 1.95992 18.5231 2.52171 19.4473 3.24966C20.3795 3.97761 21.1404 4.84403 21.7299 5.84892C22.3195 6.84589 22.698 7.94573 22.8653 9.14844H17.6069Z" fill="#212121" />
                                    <path d="M32.1542 1.29131V25.5986H26.9794V1.29131H32.1542Z" fill="#212121" />
                                    <path d="M45.0881 25.5986H36.4117V1.29131H45.1598C47.6217 1.29131 49.741 1.77793 51.5177 2.75117C53.2944 3.7165 54.6608 5.10514 55.6168 6.91711C56.5809 8.72907 57.0629 10.8971 57.0629 13.4212C57.0629 15.9532 56.5809 18.1291 55.6168 19.949C54.6608 21.7689 53.2864 23.1655 51.4938 24.1387C49.7091 25.1119 47.5739 25.5986 45.0881 25.5986ZM41.5864 21.1952H44.8729C46.4027 21.1952 47.6894 20.9262 48.7331 20.3882C49.7848 19.8422 50.5735 18.9995 51.0994 17.8601C51.6332 16.7128 51.9001 15.2332 51.9001 13.4212C51.9001 11.6251 51.6332 10.1573 51.0994 9.01788C50.5735 7.87848 49.7888 7.03975 48.745 6.5017C47.7013 5.96365 46.4146 5.69462 44.8849 5.69462H41.5864V21.1952Z" fill="#212121" />
                                </svg>
                                <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[19px] opacity-[60%] mt-[38px]">Подпишись на всегда  свежие новости</p>
                                <div className="flex gap-[8px] mt-[12px]">
                                    <label className="flex items-center gap-[10px] bg-white h-[48px] pl-[24px] pr-[15px] rounded-[24px] cursor-pointer">
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13 12.5L10.1 9.6M6.33333 2.5C8.17428 2.5 9.66667 3.99238 9.66667 5.83333M11.6667 5.83333C11.6667 8.77885 9.27885 11.1667 6.33333 11.1667C3.38781 11.1667 1 8.77885 1 5.83333C1 2.88781 3.38781 0.5 6.33333 0.5C9.27885 0.5 11.6667 2.88781 11.6667 5.83333Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <input type="text" placeholder="Email" className="text-[#212121] placeholder:opacity-[80%] bg-transparent font-inter font-[300] text-[16px] leading-[19px] placeholder:text-[#212121] outline-none underline" />
                                    </label>
                                    <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#1083E6] h-[54px] px-[32px] rounded-[32px]">Отправить</button>
                                </div>
                            </div>
                            <nav className="flex items-center gap-[40px] self-start">
                                <Link to="#" className="leading-[19px] text-[16px] font-[400] font-inter text-[#212121] opacity-[60%] opacity-[100%]">Главная</Link>
                                <Link to="#" className="leading-[19px] text-[16px] font-[400] font-inter text-[#212121] opacity-[60%]">Туры</Link>
                                <Link to="#" className="leading-[19px] text-[16px] font-[400] font-inter text-[#212121] opacity-[60%]">Огранизации</Link>
                            </nav>
                            <div className="max-w-[400px] w-[100%] self-start text-end text-[#212121] font-inter font-[400] text-[16px] leading-[20px] opacity-[40%]">Не упустите возможность окунуться в атмосферу приключений по самым выгодным ценам! Бронируйте свой тур прямо сейчас!</div>
                        </div>
                        <div className="flex flex-col items-center mb-[16px]">
                            <div className="flex items-center gap-[8px]">
                                <Link to="#" className="bg-[#1083E6] rounded-[50%] w-[48px] h-[48px] flex items-center justify-center">
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.0021 5.53105C7.97517 5.53105 5.53368 7.97309 5.53368 11.0007C5.53368 14.0282 7.97517 16.4702 11.0021 16.4702C14.0289 16.4702 16.4704 14.0282 16.4704 11.0007C16.4704 7.97309 14.0289 5.53105 11.0021 5.53105ZM11.0021 14.5566C9.046 14.5566 7.4469 12.9619 7.4469 11.0007C7.4469 9.0394 9.04124 7.4447 11.0021 7.4447C12.9629 7.4447 14.5572 9.0394 14.5572 11.0007C14.5572 12.9619 12.9581 14.5566 11.0021 14.5566ZM17.9696 5.30732C17.9696 6.01661 17.3985 6.58308 16.6941 6.58308C15.985 6.58308 15.4186 6.01185 15.4186 5.30732C15.4186 4.60279 15.9897 4.03156 16.6941 4.03156C17.3985 4.03156 17.9696 4.60279 17.9696 5.30732ZM21.5914 6.60212C21.5105 4.89317 21.1202 3.37939 19.8685 2.13219C18.6216 0.88499 17.1082 0.494645 15.3996 0.408959C13.6387 0.308993 8.36067 0.308993 6.59975 0.408959C4.89594 0.489885 3.3825 0.88023 2.13081 2.12743C0.879132 3.37463 0.493632 4.88841 0.407966 6.59736C0.308022 8.35868 0.308022 13.6379 0.407966 15.3992C0.488873 17.1081 0.879132 18.6219 2.13081 19.8691C3.3825 21.1163 4.89118 21.5067 6.59975 21.5923C8.36067 21.6923 13.6387 21.6923 15.3996 21.5923C17.1082 21.5114 18.6216 21.1211 19.8685 19.8691C21.1155 18.6219 21.5057 17.1081 21.5914 15.3992C21.6913 13.6379 21.6913 8.36344 21.5914 6.60212ZM19.3165 17.289C18.9452 18.222 18.2266 18.9409 17.289 19.3169C15.885 19.8739 12.5536 19.7453 11.0021 19.7453C9.45054 19.7453 6.11431 19.8691 4.71509 19.3169C3.78227 18.9456 3.06363 18.2268 2.68765 17.289C2.13081 15.8847 2.25931 12.5525 2.25931 11.0007C2.25931 9.44879 2.13557 6.11181 2.68765 4.71228C3.05887 3.77926 3.77751 3.06045 4.71509 2.68439C6.11906 2.12743 9.45054 2.25596 11.0021 2.25596C12.5536 2.25596 15.8898 2.13219 17.289 2.68439C18.2218 3.05569 18.9405 3.7745 19.3165 4.71228C19.8733 6.11657 19.7448 9.44879 19.7448 11.0007C19.7448 12.5525 19.8733 15.8895 19.3165 17.289Z" fill="white" />
                                    </svg>
                                </Link>
                                <Link to="#" className="bg-[#1083E6] rounded-[50%] w-[48px] h-[48px] flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.69452 6.937V8.314H7.68652V9.997H8.69452V15H10.7665V9.997H12.1565C12.1565 9.997 12.2875 9.19 12.3505 8.307H10.7745V7.157C10.7745 6.984 11.0005 6.753 11.2245 6.753H12.3525V5H10.8175C8.64352 5 8.69452 6.685 8.69452 6.937Z" fill="white" />
                                        <path d="M4 2C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V16C2 16.5304 2.21071 17.0391 2.58579 17.4142C2.96086 17.7893 3.46957 18 4 18H16C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16V4C18 3.46957 17.7893 2.96086 17.4142 2.58579C17.0391 2.21071 16.5304 2 16 2H4ZM4 0H16C17.0609 0 18.0783 0.421427 18.8284 1.17157C19.5786 1.92172 20 2.93913 20 4V16C20 17.0609 19.5786 18.0783 18.8284 18.8284C18.0783 19.5786 17.0609 20 16 20H4C2.93913 20 1.92172 19.5786 1.17157 18.8284C0.421427 18.0783 0 17.0609 0 16V4C0 2.93913 0.421427 1.92172 1.17157 1.17157C1.92172 0.421427 2.93913 0 4 0Z" fill="white" />
                                    </svg>
                                </Link>
                                <Link to="#" className="bg-[#1083E6] rounded-[50%] w-[48px] h-[48px] flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M19.5859 19.375L12.0885 8.44715L12.1013 8.45739L18.8613 0.625H16.6023L11.0954 7L6.72227 0.625H0.797664L7.79723 10.8276L7.79638 10.8267L0.414062 19.375H2.67309L8.79548 12.2824L13.6613 19.375H19.5859ZM5.82719 2.32954L16.3466 17.6705H14.5564L4.02852 2.32954H5.82719Z" fill="white" />
                                    </svg>
                                </Link>
                                <Link to="#" className="bg-[#1083E6] rounded-[50%] w-[48px] h-[48px] flex items-center justify-center">
                                    <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.78831 11.02C4.83128 11.0343 4.87546 11.0447 4.92031 11.051C5.20324 11.7176 5.48457 12.385 5.76431 13.053C6.26731 14.255 6.77431 15.493 6.88531 15.849C7.02431 16.287 7.17031 16.585 7.33031 16.789C7.41331 16.893 7.50831 16.985 7.62031 17.055C7.67866 17.0915 7.74109 17.121 7.80631 17.143C8.12631 17.263 8.41831 17.213 8.60131 17.152C8.7087 17.1153 8.81089 17.0649 8.90531 17.002L8.91031 17L11.7363 15.238L15.0013 17.74C15.0493 17.777 15.1013 17.808 15.1573 17.833C15.5493 18.003 15.9293 18.063 16.2873 18.015C16.6433 17.965 16.9263 17.816 17.1373 17.647C17.3796 17.4517 17.5728 17.2024 17.7013 16.919L17.7103 16.897L17.7133 16.889L17.7153 16.885V16.883L17.7163 16.882C17.7337 16.839 17.7471 16.7945 17.7563 16.749L20.7363 1.72399C20.7457 1.67589 20.7504 1.62699 20.7503 1.57799C20.7503 1.13799 20.5843 0.718986 20.1953 0.465986C19.8613 0.248986 19.4903 0.238986 19.2553 0.256986C19.0033 0.276986 18.7693 0.338986 18.6123 0.388986C18.5244 0.416841 18.4377 0.448199 18.3523 0.482986L18.3413 0.487986L1.62731 7.04399L1.62531 7.04499C1.56876 7.06579 1.51305 7.0888 1.45831 7.11399C1.32578 7.17357 1.19864 7.2445 1.07831 7.32599C0.851314 7.48099 0.328314 7.90699 0.417314 8.61099C0.487314 9.17099 0.871314 9.51599 1.10631 9.68199C1.23431 9.77299 1.35631 9.83799 1.44631 9.88099C1.48631 9.90099 1.57231 9.93499 1.60931 9.95099L1.61931 9.95399L4.78831 11.02ZM18.9263 1.86799H18.9243C18.9157 1.87181 18.907 1.87548 18.8983 1.87899L2.16431 8.44399C2.15571 8.44747 2.14704 8.4508 2.13831 8.45399L2.12831 8.45699C2.09775 8.469 2.06772 8.48235 2.03831 8.49699C2.06615 8.51293 2.09486 8.52728 2.12431 8.53999L5.26631 9.59799C5.32246 9.61691 5.37617 9.64242 5.42631 9.67399L15.8033 3.59899L15.8133 3.59399C15.8536 3.56949 15.895 3.5468 15.9373 3.52599C16.0093 3.48899 16.1243 3.43499 16.2543 3.39499C16.3443 3.36699 16.6113 3.28799 16.8993 3.38099C17.0521 3.42914 17.1882 3.51927 17.2922 3.64111C17.3962 3.76294 17.4638 3.91156 17.4873 4.06999C17.5246 4.20874 17.5256 4.35472 17.4903 4.49399C17.4203 4.76899 17.2283 4.98299 17.0533 5.14699C16.9033 5.28699 14.9573 7.16299 13.0383 9.01499L10.4253 11.535L9.96031 11.985L15.8323 16.487C15.9116 16.5203 15.9977 16.534 16.0833 16.527C16.1265 16.5211 16.1671 16.5031 16.2003 16.475C16.2409 16.4408 16.2756 16.4002 16.3033 16.355L16.3053 16.354L19.1953 1.78099C19.1043 1.80288 19.015 1.83163 18.9283 1.86699L18.9263 1.86799ZM10.4653 14.262L9.29331 13.364L9.00931 15.169L10.4653 14.262ZM8.21831 11.582L9.38332 10.457L11.9963 7.93499L12.9693 6.99699L6.44931 10.814L6.48431 10.896C6.89552 11.8674 7.30219 12.8408 7.70431 13.816L7.98731 12.016C8.01292 11.849 8.09435 11.6967 8.21831 11.582Z" fill="white" />
                                    </svg>
                                </Link>
                                <Link to="#" className="bg-[#1083E6] rounded-[50%] w-[48px] h-[48px] flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.0498 2.91006C16.133 1.98399 15.041 1.24973 13.8374 0.750111C12.6339 0.250494 11.3429 -0.00448012 10.0398 5.95696e-05C4.5798 5.95696e-05 0.129805 4.45006 0.129805 9.91006C0.129805 11.6601 0.589805 13.3601 1.4498 14.8601L0.0498047 20.0001L5.2998 18.6201C6.7498 19.4101 8.3798 19.8301 10.0398 19.8301C15.4998 19.8301 19.9498 15.3801 19.9498 9.92006C19.9498 7.27006 18.9198 4.78006 17.0498 2.91006ZM10.0398 18.1501C8.5598 18.1501 7.1098 17.7501 5.8398 17.0001L5.5398 16.8201L2.4198 17.6401L3.2498 14.6001L3.0498 14.2901C2.22755 12.977 1.79094 11.4593 1.7898 9.91006C1.7898 5.37006 5.4898 1.67006 10.0298 1.67006C12.2298 1.67006 14.2998 2.53006 15.8498 4.09006C16.6173 4.85402 17.2255 5.76272 17.6392 6.76348C18.0529 7.76425 18.2638 8.83717 18.2598 9.92006C18.2798 14.4601 14.5798 18.1501 10.0398 18.1501ZM14.5598 11.9901C14.3098 11.8701 13.0898 11.2701 12.8698 11.1801C12.6398 11.1001 12.4798 11.0601 12.3098 11.3001C12.1398 11.5501 11.6698 12.1101 11.5298 12.2701C11.3898 12.4401 11.2398 12.4601 10.9898 12.3301C10.7398 12.2101 9.9398 11.9401 8.9998 11.1001C8.2598 10.4401 7.7698 9.63006 7.6198 9.38006C7.4798 9.13006 7.5998 9.00006 7.7298 8.87006C7.8398 8.76006 7.9798 8.58006 8.0998 8.44006C8.2198 8.30006 8.2698 8.19006 8.3498 8.03006C8.4298 7.86006 8.3898 7.72006 8.3298 7.60006C8.2698 7.48006 7.7698 6.26006 7.5698 5.76006C7.3698 5.28006 7.1598 5.34006 7.0098 5.33006H6.5298C6.3598 5.33006 6.0998 5.39006 5.8698 5.64006C5.6498 5.89006 5.0098 6.49006 5.0098 7.71006C5.0098 8.93006 5.89981 10.1101 6.0198 10.2701C6.1398 10.4401 7.7698 12.9401 10.2498 14.0101C10.8398 14.2701 11.2998 14.4201 11.6598 14.5301C12.2498 14.7201 12.7898 14.6901 13.2198 14.6301C13.6998 14.5601 14.6898 14.0301 14.8898 13.4501C15.0998 12.8701 15.0998 12.3801 15.0298 12.2701C14.9598 12.1601 14.8098 12.1101 14.5598 11.9901Z" fill="white" />
                                    </svg>
                                </Link>
                            </div>
                            <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[19px] opacity-[60%] mt-[55px]">© 2024 Все права защищены. Компания 'PROlab'.</p>
                        </div>
                    </div>
                </footer>
            </div >
        </>
    )
}


















function Outentication({ close }: { close: React.Dispatch<React.SetStateAction<boolean>> }) {
    // const error = "Неправильно введен логин или пароль"
    const error = ""
    const [state, setState] = useState(0)

    return (
        <div className="w-[100%] h-[100%] bg-[#2121214D] fixed z-10 flex items-center justify-center"
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                let Event = event.target as HTMLButtonElement
                if (!Event.closest(`#registrationLoginModalWindowContent`)) {
                    close((prev: any) => !prev)
                }
            }}>
            <div className="w-[80%] h-[90%] bg-white rounded-[64px] p-[80px] flex items-center gap-[40px] relative" id="registrationLoginModalWindowContent">
                {
                    state == 1
                        ?
                        <ChooseRegion Change={setState} />
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
                                        state == 0
                                            ?
                                            <SignInModal error={error} Change={setState} close={close} />
                                            :
                                            state == 2
                                                ?
                                                <ChooseRole Change={setState} />
                                                :
                                                state == 3
                                                    ?
                                                    <RegistrationModal Change={setState} close={close} />
                                                    :
                                                    state == 4
                                                        ?
                                                        <ComplateTheFormData Change={setState} />
                                                        :
                                                        state == 5
                                                            ?
                                                            <LastComplationOfData Change={setState} close={close} />
                                                            :
                                                            state == 6
                                                                ?
                                                                <ForgitPassword error={error} Change={setState} />
                                                                :
                                                                state == 7
                                                                    ?
                                                                    <GetCode Change={setState} error={error} />
                                                                    :
                                                                    state == 8
                                                                        ?
                                                                        <NewPasswordSet Change={setState} close={close} />
                                                                        :
                                                                        ""
                                    }
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

function SignInModal({ error, Change, close }: { error: string, Change: any, close: any }) {
    const [hidshow, setHidSho] = useState(false)
    return (
        <form onSubmit={(e: any) => {
            e.preventDefault()

            let a = new FormData(e.target)
            let b = Object.fromEntries(a.entries())

            API.post("api/v1/accounts/login/", b)
                .then((res: any) => {
                    localStorage.setItem("token", res.data.token)
                    close((prev: any) => !prev)
                })
        }} className="flex flex-col items-center">
            <h3 className="mt-[44px] text-[#212121] font-inter font-[700] text-[36px] leading-[39px] mb-[16px]">Добро пожаловать</h3>
            <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[20px] opacity-[60%] max-w-[70%] text-center mb-[28px]">Продолжить с Google или введите данные для входа</p>
            <div className="w-[100%]">
                <div className="h-[54px] rounded-[32px] border border-solid border-[#1083E666] px-[32px] mb-[8px] flex items-center gap-[15px]">
                    <input type="email" required placeholder="Email" className="text-[#212121] placeholder:opacity-[40%] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none" name="login" />
                </div>
                <div className={`h-[54px] rounded-[32px] border border-solid border-[#1083E666] px-[32px] mb-[8px] flex items-center gap-[15px] ${!!error ? "!border-[#EB5757]" : ""}`}>
                    <input type={!!hidshow ? "text" : "password"} required placeholder="****************" className={`text-[#212121] placeholder:opacity-[40%] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none ${!!error ? "!text-[#EB5757]" : ""}`} name="password" />
                    <button type="button" onClick={() => setHidSho(prev => !prev)}>
                        {
                            !!hidshow
                                ?
                                <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.61342 5.97513C1.52262 5.83137 1.47723 5.75949 1.45182 5.64862C1.43273 5.56534 1.43273 5.43401 1.45182 5.35073C1.47723 5.23986 1.52262 5.16798 1.61341 5.02422C2.36369 3.83624 4.59693 0.833008 8.00027 0.833008C11.4036 0.833008 13.6369 3.83623 14.3871 5.02422C14.4779 5.16798 14.5233 5.23986 14.5487 5.35073C14.5678 5.43401 14.5678 5.56534 14.5487 5.64862C14.5233 5.75949 14.4779 5.83137 14.3871 5.97513C13.6369 7.16311 11.4036 10.1663 8.00027 10.1663C4.59693 10.1663 2.36369 7.16311 1.61342 5.97513Z" stroke={!!error ? "#EB5757" : "#1083E6"} strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8.00027 7.49967C9.10484 7.49967 10.0003 6.60424 10.0003 5.49967C10.0003 4.39511 9.10484 3.49967 8.00027 3.49967C6.8957 3.49967 6.00027 4.39511 6.00027 5.49967C6.00027 6.60424 6.8957 7.49967 8.00027 7.49967Z" stroke={!!error ? "#EB5757" : "#1083E6"} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                :
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.16196 2.39488C7.4329 2.35482 7.7124 2.33333 8.00028 2.33333C11.4036 2.33333 13.6369 5.33656 14.3871 6.52455C14.4779 6.66833 14.5233 6.74023 14.5488 6.85112C14.5678 6.93439 14.5678 7.06578 14.5487 7.14905C14.5233 7.25993 14.4776 7.3323 14.3861 7.47705C14.1862 7.79343 13.8814 8.23807 13.4777 8.7203M4.48288 3.47669C3.0415 4.45447 2.06297 5.81292 1.61407 6.52352C1.52286 6.66791 1.47725 6.74011 1.45183 6.85099C1.43273 6.93426 1.43272 7.06563 1.45181 7.14891C1.47722 7.25979 1.52262 7.33168 1.61342 7.47545C2.36369 8.66344 4.59694 11.6667 8.00028 11.6667C9.37255 11.6667 10.5546 11.1784 11.5259 10.5177M2.00028 1L14.0003 13M6.58606 5.58579C6.22413 5.94772 6.00028 6.44772 6.00028 7C6.00028 8.10457 6.89571 9 8.00028 9C8.55256 9 9.05256 8.77614 9.41449 8.41421" stroke={!!error ? "#EB5757" : "#1083E6"} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                        }
                    </button>
                </div>
                <div className="flex items-center justify-between mt-[12px]">
                    <p className="text-[#EB5757] font-inter font-[400] text-[14px] leading-[19px]">{error}</p>
                    <button className="text-[#1083E6] underline ml-auto flex" onClick={() => Change(6)}>Забыли пароль</button>
                </div>
            </div>
            <div className="w-[100%] mt-[28px]">
                <button type="submit" className={`text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px] opacity-[40%] duration-200 hover:opacity-[100%] w-[100%] bg-[var(--blue-10,_#1083E61A)] h-[54px] rounded-[32px] ${!!error ? "!bg-[#EB5757] !opacity-[100%] !text-white" : ""}`}>Войти</button>
                <div className="flex items-center justify-between mt-[12px] mb-[28px]">
                    <p className="text-[#212121] font-inter font-[400] text-[14px] leading-[18px]">Вы еще не зарегистрировались?</p>
                    <button className="text-[#1083E6] underline ml-auto flex" onClick={() => Change(1)}>Создать аккаунт</button>
                </div>
            </div>
            <div className="flex items-center gap-[20px] w-[100%] mb-[20px]">
                <span className="flex border-t border-solid border-t-[#21212133] w-[100%]"></span>
                <p className="text-[#212121] font-inter font-[400] text-[14px] leading-[18px] opacity-[60%]">или</p>
                <span className="flex border-t border-solid border-t-[#21212133] w-[100%]"></span>
            </div>
            <div className="w-[100%] flex gap-[8px]">
                <button className="w-[100%] text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] flex items-center gap-[10px] justify-center border border-solid border-[#1083E6] bg-[var(--blue-20,_#1083E633)] rounded-[32px] h-[54px]">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_2054_30528)">
                            <path d="M20 10.5026C20 9.7008 20.1474 9.44271 20 8.83594H10V12.1693H15.8333C15.7199 13.0686 14.6949 14.5925 13.3333 15.5026L16.6667 18.0026C18.5955 16.3014 20 13.4715 20 10.5026Z" fill="#4285F4" />
                            <path d="M9.9987 20.4974C12.7469 20.4974 14.9802 19.5901 16.6654 17.9974L13.332 15.4974C12.4725 16.1091 11.5141 16.3307 9.9987 16.3307C7.30705 16.3307 4.97973 14.6687 4.16536 12.1641L0.832031 14.6641C2.50582 18.0574 6.01771 20.4974 9.9987 20.4974Z" fill="#34A853" />
                            <path d="M4.16667 13.0026C3.96263 12.3707 4.16667 12.0355 4.16667 11.3359C4.16667 10.6363 3.97337 9.46782 4.16667 8.83594L0.833333 6.33594C0.178287 7.71257 0 9.6998 0 11.3359C0 12.9721 0.178287 14.126 0.833333 15.5026L4.16667 13.0026Z" fill="#FBBC05" />
                            <path d="M9.9987 4.66667C11.9018 4.66667 13.4334 5.62922 14.1654 6.33333L16.6654 3C14.9087 1.32641 12.7351 0.5 9.9987 0.5C6.0347 0.5 2.49868 2.94 0.832031 6.33333L4.16536 8.83333C4.98751 6.32872 7.31853 4.66667 9.9987 4.66667Z" fill="#EB4335" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2054_30528">
                                <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                            </clipPath>
                        </defs>
                    </svg>
                    Google
                </button>
                <button className="w-[100%] text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] flex items-center gap-[10px] justify-center border border-solid border-[#1083E6] rounded-[32px] h-[54px]">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.41227 7.94815V9.09565H8.57227V10.4982H9.41227V14.6673H11.1389V10.4982H12.2973C12.2973 10.4982 12.4064 9.82565 12.4589 9.08982H11.1456V8.13148C11.1456 7.98732 11.3339 7.79482 11.5206 7.79482H12.4606V6.33398H11.1814C9.36977 6.33398 9.41227 7.73815 9.41227 7.94815Z" fill="#1083E6" />
                        <path d="M5.50033 3.83366C5.0583 3.83366 4.63437 4.00925 4.32181 4.32181C4.00925 4.63437 3.83366 5.0583 3.83366 5.50033V15.5003C3.83366 15.9424 4.00925 16.3663 4.32181 16.6788C4.63437 16.9914 5.0583 17.167 5.50033 17.167H15.5003C15.9424 17.167 16.3663 16.9914 16.6788 16.6788C16.9914 16.3663 17.167 15.9424 17.167 15.5003V5.50033C17.167 5.0583 16.9914 4.63437 16.6788 4.32181C16.3663 4.00925 15.9424 3.83366 15.5003 3.83366H5.50033ZM5.50033 2.16699H15.5003C16.3844 2.16699 17.2322 2.51818 17.8573 3.1433C18.4825 3.76842 18.8337 4.61627 18.8337 5.50033V15.5003C18.8337 16.3844 18.4825 17.2322 17.8573 17.8573C17.2322 18.4825 16.3844 18.8337 15.5003 18.8337H5.50033C4.61627 18.8337 3.76842 18.4825 3.1433 17.8573C2.51818 17.2322 2.16699 16.3844 2.16699 15.5003V5.50033C2.16699 4.61627 2.51818 3.76842 3.1433 3.1433C3.76842 2.51818 4.61627 2.16699 5.50033 2.16699Z" fill="#1083E6" />
                    </svg>
                    Facebook
                </button>
            </div>
        </form>
    )
}

function ChooseRole({ Change }: { Change: any }) {
    return (
        <div className="flex flex-col items-center">
            <h3 className="mt-[44px] text-[#212121] font-inter font-[700] text-[36px] leading-[39px] mb-[16px]">Добро пожаловать</h3>
            <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[20px] opacity-[60%] max-w-[70%] text-center mb-[28px]">Продолжить с Google или введите данные для входа</p>
            <div className="w-[100%] flex justify-between gap-[8px]">
                <div className="bg-[url(/assets/img/clim_to_mountain.jpg)] relative bg-cover bg-center flex items-center group justify-center w-[50%] h-[200px] rounded-[32px] before:content-[''] before:w-[100%] before:h-[100%] before:absolute before:top-0 before:left-0 hover:before:bg-[#1083E6CC] before:bg-[transparent] before:duration-200 duration-200 cursor-pointer overflow-hidden" onClick={() => {
                    Change(3)
                }}>
                    <p className="text-white font-inter font-[400] text-[16px] leading-[22px] relative z-[9] opacity-[0%] group-hover:opacity-[100%] duration-200">Пользователь</p>
                </div>
                <div className="bg-[url(/assets/img/block_4.jpg)] relative bg-cover bg-center flex items-center group justify-center w-[50%] h-[200px] rounded-[32px] before:content-[''] before:w-[100%] before:h-[100%] before:absolute before:top-0 before:left-0 hover:before:bg-[#1083E6CC] before:bg-[transparent] before:duration-200 duration-200 cursor-pointer overflow-hidden" onClick={() => {
                    Change(4)
                }}>
                    <p className="text-white font-inter font-[400] text-[16px] leading-[22px] relative z-[9] opacity-[0%] group-hover:opacity-[100%] duration-200">Компания</p>
                </div>
            </div>
            <div className="w-[100%] mt-[28px] mb-[28px]">
                <button type="submit" className={`text-white font-inter font-[400] text-[16px] leading-[22px] w-[100%] bg-[#1083E6] h-[54px] rounded-[32px]`}>Войти</button>
            </div>
            <div className="flex items-center gap-[20px] w-[100%] mb-[20px]">
                <span className="flex border-t border-solid border-t-[#21212133] w-[100%]"></span>
                <p className="text-[#212121] font-inter font-[400] text-[14px] leading-[18px] opacity-[60%]">или</p>
                <span className="flex border-t border-solid border-t-[#21212133] w-[100%]"></span>
            </div>
            <div className="w-[100%] flex gap-[8px]">
                <button className="w-[100%] text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] flex items-center gap-[10px] justify-center border border-solid border-[#1083E6] bg-[var(--blue-20,_#1083E633)] rounded-[32px] h-[54px]">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_2054_30528)">
                            <path d="M20 10.5026C20 9.7008 20.1474 9.44271 20 8.83594H10V12.1693H15.8333C15.7199 13.0686 14.6949 14.5925 13.3333 15.5026L16.6667 18.0026C18.5955 16.3014 20 13.4715 20 10.5026Z" fill="#4285F4" />
                            <path d="M9.9987 20.4974C12.7469 20.4974 14.9802 19.5901 16.6654 17.9974L13.332 15.4974C12.4725 16.1091 11.5141 16.3307 9.9987 16.3307C7.30705 16.3307 4.97973 14.6687 4.16536 12.1641L0.832031 14.6641C2.50582 18.0574 6.01771 20.4974 9.9987 20.4974Z" fill="#34A853" />
                            <path d="M4.16667 13.0026C3.96263 12.3707 4.16667 12.0355 4.16667 11.3359C4.16667 10.6363 3.97337 9.46782 4.16667 8.83594L0.833333 6.33594C0.178287 7.71257 0 9.6998 0 11.3359C0 12.9721 0.178287 14.126 0.833333 15.5026L4.16667 13.0026Z" fill="#FBBC05" />
                            <path d="M9.9987 4.66667C11.9018 4.66667 13.4334 5.62922 14.1654 6.33333L16.6654 3C14.9087 1.32641 12.7351 0.5 9.9987 0.5C6.0347 0.5 2.49868 2.94 0.832031 6.33333L4.16536 8.83333C4.98751 6.32872 7.31853 4.66667 9.9987 4.66667Z" fill="#EB4335" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2054_30528">
                                <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                            </clipPath>
                        </defs>
                    </svg>
                    Google
                </button>
                <button className="w-[100%] text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] flex items-center gap-[10px] justify-center border border-solid border-[#1083E6] rounded-[32px] h-[54px]">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.41227 7.94815V9.09565H8.57227V10.4982H9.41227V14.6673H11.1389V10.4982H12.2973C12.2973 10.4982 12.4064 9.82565 12.4589 9.08982H11.1456V8.13148C11.1456 7.98732 11.3339 7.79482 11.5206 7.79482H12.4606V6.33398H11.1814C9.36977 6.33398 9.41227 7.73815 9.41227 7.94815Z" fill="#1083E6" />
                        <path d="M5.50033 3.83366C5.0583 3.83366 4.63437 4.00925 4.32181 4.32181C4.00925 4.63437 3.83366 5.0583 3.83366 5.50033V15.5003C3.83366 15.9424 4.00925 16.3663 4.32181 16.6788C4.63437 16.9914 5.0583 17.167 5.50033 17.167H15.5003C15.9424 17.167 16.3663 16.9914 16.6788 16.6788C16.9914 16.3663 17.167 15.9424 17.167 15.5003V5.50033C17.167 5.0583 16.9914 4.63437 16.6788 4.32181C16.3663 4.00925 15.9424 3.83366 15.5003 3.83366H5.50033ZM5.50033 2.16699H15.5003C16.3844 2.16699 17.2322 2.51818 17.8573 3.1433C18.4825 3.76842 18.8337 4.61627 18.8337 5.50033V15.5003C18.8337 16.3844 18.4825 17.2322 17.8573 17.8573C17.2322 18.4825 16.3844 18.8337 15.5003 18.8337H5.50033C4.61627 18.8337 3.76842 18.4825 3.1433 17.8573C2.51818 17.2322 2.16699 16.3844 2.16699 15.5003V5.50033C2.16699 4.61627 2.51818 3.76842 3.1433 3.1433C3.76842 2.51818 4.61627 2.16699 5.50033 2.16699Z" fill="#1083E6" />
                    </svg>
                    Facebook
                </button>
            </div>
        </div>
    )
}

function RegistrationModal({ Change, close }: { Change: any, close: any }) {
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
            localStorage.setItem("email", JSON.stringify(data.email))
            dispatch(FetchRegistration({ ...data, country: c }) as any)
        } else {
            setConfPass("Подтверждение пороля не совпала")
        }
    }

    useEffect(() => {
        if (!fuck.error) {
            localStorage.removeItem("country")
            close((prev: any) => !prev)
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
                    <div className={`flex flex-col ${fuck?.error?.full_name ? "mb-[8px]" : ""}`}>
                        <div className={`h-[54px] rounded-[32px] border border-solid border-[#1083E666] text-[#212121] px-[32px] flex items-center gap-[15px] ${fuck?.error?.full_name ? "border-[#EB5757] text-[#EB5757]" : ""}`}>
                            <input type="text" required placeholder="ФИО*" className="placeholder:opacity-[40%] text-inherit h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none" name="full_name" />
                        </div>
                        <p className="px-[32px] text-[#EB5757] font-inter font-[400] text-[14px] leading-[18px] mt-[8px]">{fuck?.error?.full_name}</p>
                    </div>
                    <div className={`flex flex-col ${fuck?.error?.email ? "mb-[8px]" : ""}`}>
                        <div className={`h-[54px] rounded-[32px] border border-solid border-[#1083E666] px-[32px] mb-[8px] flex items-center gap-[15px] ${fuck?.error?.email ? "border-[#EB5757] text-[#EB5757]" : ""}`}>
                            <input type="email" required placeholder="Почта*" className="text-[#212121] placeholder:opacity-[40%] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none" name="email" />
                        </div>
                        <p className="px-[32px] text-[#EB5757] font-inter font-[400] text-[14px] leading-[18px] mt-[8px]">{fuck?.error?.email}</p>
                    </div>
                    <div className={`flex flex-col ${fuck?.error?.city ? "mb-[8px]" : ""}`}>
                        <div className={`h-[54px] rounded-[32px] border border-solid border-[#1083E666] px-[32px] mb-[8px] flex items-center gap-[15px] ${fuck?.error?.city ? "border-[#EB5757] text-[#EB5757]" : ""}`}>
                            <input type="text" required placeholder="Город" className="text-[#212121] placeholder:opacity-[40%] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none" name="city" />
                        </div>
                        <p className="px-[32px] text-[#EB5757] font-inter font-[400] text-[14px] leading-[18px] mt-[8px]">{fuck?.error?.city}</p>
                    </div>
                    <div className={`flex flex-col ${fuck?.error?.password ? "mb-[8px]" : ""}`}>
                        <div className={`h-[54px] rounded-[32px] border border-solid border-[#1083E666] px-[32px] mb-[8px] flex items-center gap-[15px] ${fuck?.error?.password ? "border-[#EB5757] text-[#EB5757]" : ""}`}>
                            <input type="password" required placeholder="Пароль*" className="text-[#212121] placeholder:opacity-[40%] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none" name="password" />
                        </div>
                        <p className="px-[32px] text-[#EB5757] font-inter font-[400] text-[14px] leading-[18px] mt-[8px]">{fuck?.error?.password}</p>
                    </div>

                    <div className={`flex flex-col ${!!confPass ? "mb-[8px]" : ""}`}>
                        <div className={`h-[54px] rounded-[32px] border border-solid border-[#1083E666] px-[32px] mb-[8px] flex items-center gap-[15px] ${!!confPass ? "border-[#EB5757] text-[#EB5757]" : ""}`}>
                            <input type="password" required placeholder="Повторите пароль" className="text-[#212121] placeholder:opacity-[40%] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none" name="confPassword" onChange={() => setConfPass("")} />
                        </div>
                        <p className="px-[32px] text-[#EB5757] font-inter font-[400] text-[14px] leading-[18px] mt-[8px]">{confPass}</p>
                    </div>
                </div>
                <div className="w-[100%] mt-[28px]">
                    <button type="submit" className={`text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px] opacity-[40%] duration-200 hover:opacity-[100%] w-[100%] bg-[var(--blue-10,_#1083E61A)] h-[54px] rounded-[32px]`}>Войти</button>
                </div>
            </form>
        </>
    )
}

function ForgitPassword({ Change, error }: { Change: any, error: any }) {
    const [state, setState] = useState(error)
    const dispatch = useDispatch()
    const fuck = useSelector((state: any) => state.registration)

    return (
        <form onSubmit={(e: any) => {
            e.preventDefault()

            let a = new FormData(e.target)
            let b = Object.fromEntries(a.entries())

            dispatch(FetchForgotPassword({ code: b.getCode, Change }) as any)
        }} className="flex flex-col items-center w-[100%]">
            <h3 className="mt-[44px] text-[#212121] font-inter font-[700] text-[36px] leading-[39px] mb-[16px]">Забыли пароль?</h3>
            <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[20px] opacity-[60%] max-w-[70%] text-center mb-[28px]">Войдите с помощью кода подтверждения </p>
            <div className="w-[100%]">
                <div className={`h-[54px] rounded-[32px] border border-solid border-[#1083E666] px-[32px] mb-[8px] flex items-center gap-[15px]`}>
                    <input type="email" placeholder="email" required className={`text-[#212121] h-[100%] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none`} name="getCode" />
                </div>
            </div>
            <div className="w-[100%] mt-[28px]">
                <button type="submit" className={`text-white border border-solid border-[#1083E6] font-inter font-[400] text-[16px] leading-[22px] duration-200 w-[100%] bg-[#1083E6] h-[54px] rounded-[32px] mb-[8px]`}>Получить код</button>
                <button type="button" className={`text-[#1083E6] border border-solid border-[#1083E6] font-inter font-[400] text-[16px] leading-[22px] duration-200 w-[100%] h-[54px] rounded-[32px]`} onClick={() => Change(0)}>Назад к регистрации</button>
            </div>
        </form>
    )
}

function GetCode({ Change, error }: { error: string, Change: any }) {
    const [state, setState] = useState(error)
    const dispatch = useDispatch()
    const fuck = useSelector((state: any) => state.registration)

    return (
        <form className="flex flex-col items-center w-[100%]" onSubmit={(e: any) => {
            e.preventDefault()

            let a = new FormData(e.target)
            let b: any = Object.fromEntries(a.entries())

            let count = b.a + b.b + b.c + b.d

            dispatch(FetchCheckPassword({ code: count, Change }) as any)

        }}>
            <h3 className="mt-[44px] text-[#212121] font-inter font-[700] text-[36px] leading-[39px] mb-[16px]">Введите код</h3>
            <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[20px] opacity-[60%] max-w-[98%] text-center mb-[28px]">Мы только что отправили код подтверждения на адрес PROlab@gmail.com</p>
            <div className="w-[100%] flex items-center justify-center gap-[8px]">
                <input type="text" name="a" maxLength={1} className={`w-[54px] text-[#212121] font-inter font-[400] text-[16px] leading-[24px] h-[54px] text-center rounded-[50%] outline-none border border-solid border-[#1083E6] ${false ? "!border-[#EB5757]" : ""}`} placeholder="_" />
                <input type="text" name="b" maxLength={1} className={`w-[54px] text-[#212121] font-inter font-[400] text-[16px] leading-[24px] h-[54px] text-center rounded-[50%] outline-none border border-solid border-[#1083E6] ${false ? "!border-[#EB5757]" : ""}`} placeholder="_" />
                <input type="text" name="c" maxLength={1} className={`w-[54px] text-[#212121] font-inter font-[400] text-[16px] leading-[24px] h-[54px] text-center rounded-[50%] outline-none border border-solid border-[#1083E6] ${false ? "!border-[#EB5757]" : ""}`} placeholder="_" />
                <input type="text" name="d" maxLength={1} className={`w-[54px] text-[#212121] font-inter font-[400] text-[16px] leading-[24px] h-[54px] text-center rounded-[50%] outline-none border border-solid border-[#1083E6] ${false ? "!border-[#EB5757]" : ""}`} placeholder="_" />
            </div>
            <div className="w-[100%] mt-[28px]">
                <button type="submit" className={`text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px] w-[100%] bg-[var(--blue-10,_#1083E61A)] h-[54px] rounded-[32px] mb-[8px] border border-solid border-[transparent] ${!!error ? "!bg-[#EB5757] !text-white" : ""}`}>Подтвердить </button>
                <button type="button" onClick={() => Change(0)} className={`text-[#1083E6] border border-solid border-[#1083E6] font-inter font-[400] text-[16px] leading-[22px] duration-200 w-[100%] h-[54px] rounded-[32px]`}>Назад к регистрации</button>
            </div>
        </form>
    )
}

function NewPasswordSet({ Change, close }: { Change: any, close: any }) {
    return (
        <form className="flex flex-col items-center w-[100%]" onSubmit={(e: any) => {
            e.preventDefault()

            let a = new FormData(e.target)
            let b: any = Object.fromEntries(a.entries())

            let count = JSON.parse(localStorage.getItem("code") as any)

            API.post(`api/v1/accounts/reset-password/send-code/${count}`, b)
                .then(() => {
                    close((prev: any) => !prev)
                })
        }}>
            <h3 className="mt-[44px] text-[#212121] font-inter font-[700] text-[36px] leading-[39px] mb-[16px]">Новый пароль</h3>
            <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[20px] opacity-[60%] max-w-[70%] text-center mb-[28px]">Теперь напишите свой новый пароль</p>
            <div className="w-[100%]">
                <div className="h-[54px] rounded-[32px] border border-solid border-[#1083E6] px-[32px] mb-[8px] flex items-center gap-[15px]">
                    <input type="password" name="password" required placeholder="Password" className="text-[#212121] placeholder:opacity-[40%] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none" />
                </div>
                <div className="h-[54px] rounded-[32px] border border-solid border-[#1083E6] px-[32px] mb-[8px] flex items-center gap-[15px]">
                    <input type="password" name="password_confirm" required placeholder="Confirm Password" className="text-[#212121] placeholder:opacity-[40%] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none" />
                </div>
            </div>
            <div className="w-[100%] mt-[28px]">
                <button type="submit" className={`text-white font-inter font-[400] text-[16px] leading-[22px] w-[100%] bg-[#1083E6] h-[54px] rounded-[32px]`}>Войти</button>
            </div>
        </form>
    )
}

function ComplateTheFormData({ Change }: { Change: any }) {
    const dispatch = useDispatch()
    const fuck = useSelector((state: any) => state.registration)
    const [wq, setWq] = useState(JSON.parse(sessionStorage.getItem("fuck_2") as any) || {
        email: "",
        full_name: "",
        phone: "",
        title: ""
    })

    const handle_Submit = (e: any) => {
        e.preventDefault()

        Change(5)
    }

    return (
        <form onSubmit={handle_Submit} className="flex flex-col items-center" onChange={(e: any) => {
            dispatch(clearRegistrationError() as any)

            let a = new FormData(e.currentTarget)
            let b = Object.fromEntries(a.entries())

            sessionStorage.setItem("fuck_2", JSON.stringify(b))
        }}>
            <h3 className="mt-[44px] text-[#212121] font-inter font-[700] text-[36px] leading-[39px] mb-[16px]">Добро пожаловать</h3>
            <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[20px] opacity-[60%] max-w-[70%] text-center mb-[28px]">Давайте заполним немножко форм и пойдем искать туры для себя</p>
            <div className="flex items-center w-[100%] mb-[28px] gap-[12px]">
                <button type="button" className="w-[54px] min-w-[54px] max-w-[54px] h-[54px] rounded-[50%] border border-solid border-[#1083E6] flex items-center justify-center bg-[#1083E6]" onClick={() => Change(4)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 15.1667C2.44649 13.1021 5.08918 11.8333 8 11.8333C10.9108 11.8333 13.5535 13.1021 15.5 15.1667M11.75 4.75C11.75 6.82107 10.0711 8.5 8 8.5C5.92893 8.5 4.25 6.82107 4.25 4.75C4.25 2.67893 5.92893 1 8 1C10.0711 1 11.75 2.67893 11.75 4.75Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div className="w-[100%] h-[1px] border-t border-solid border-t-[#21212133]"></div>
                <button type="submit" className="w-[54px] min-w-[54px] max-w-[54px] h-[54px] rounded-[50%] border border-solid border-[#1083E6] flex items-center justify-center">
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.00033 17.8337C13.6027 17.8337 17.3337 14.1027 17.3337 9.50033C17.3337 4.89795 13.6027 1.16699 9.00033 1.16699C4.39795 1.16699 0.666992 4.89795 0.666992 9.50033C0.666992 14.1027 4.39795 17.8337 9.00033 17.8337Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.2687 6.38863C11.6759 6.25292 11.8794 6.18507 12.0148 6.23334C12.1326 6.27535 12.2253 6.36805 12.2673 6.48585C12.3156 6.62122 12.2477 6.82478 12.112 7.2319L10.8724 10.9508C10.8338 11.0667 10.8144 11.1247 10.7815 11.1728C10.7523 11.2155 10.7155 11.2523 10.6728 11.2815C10.6247 11.3144 10.5667 11.3338 10.4508 11.3724L6.7319 12.612C6.32478 12.7477 6.12122 12.8156 5.98585 12.7673C5.86805 12.7253 5.77535 12.6326 5.73334 12.5148C5.68507 12.3794 5.75292 12.1759 5.88863 11.7687L7.12825 8.04989C7.1669 7.93394 7.18622 7.87596 7.21916 7.82782C7.24833 7.78517 7.28517 7.74833 7.32782 7.71916C7.37596 7.68622 7.43394 7.6669 7.54989 7.62825L11.2687 6.38863Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
            <div className="w-[100%]">
                <div className={`flex flex-col ${fuck?.error?.title}`}>
                    <div className={`h-[54px] rounded-[32px] border border-solid border-[#1083E666] px-[32px] mb-[8px] flex items-center gap-[15px] ${fuck?.error?.title ? "border-[#EB5757]" : ""}`}>
                        <input type="text" required placeholder="Название*" value={wq.title} onChange={(e: any) => setWq((prev: any) => { return { ...prev, title: e.target.value } })} className={`text-[#212121] placeholder:opacity-[40%] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none ${fuck?.error?.title ? "text-[#EB5757]" : ""}`} name="title" />
                    </div>
                    <p className="px-[32px] text-[#EB5757] font-inter font-[400] text-[14px] leading-[18px] mt-[8px]">{fuck?.error?.title}</p>
                </div>
                <div className={`flex flex-col ${fuck?.error?.full_name ? "mb-[8px]" : ""}`}>
                    <div className={`h-[54px] rounded-[32px] border border-solid border-[#1083E666] px-[32px] mb-[8px] flex items-center gap-[15px] ${fuck?.error?.full_name ? "border-[#EB5757]" : ""}`}>
                        <input type="text" required placeholder="ФИО*" value={wq.full_name} onChange={(e: any) => setWq((prev: any) => { return { ...prev, full_name: e.target.value } })} className={`text-[#212121] placeholder:opacity-[40%] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none ${fuck?.error?.full_name ? "text-[#EB5757]" : ""}`} name="full_name" />
                    </div>
                    <p className="px-[32px] text-[#EB5757] font-inter font-[400] text-[14px] leading-[18px] mt-[8px]">{fuck?.error?.full_name}</p>
                </div>
                <div className={`flex flex-col ${fuck?.error?.email ? "mb-[8px]" : ""}`}>
                    <div className={`h-[54px] rounded-[32px] border border-solid border-[#1083E666] px-[32px] mb-[8px] flex items-center gap-[15px] ${fuck?.error?.email ? "border-[#EB5757]" : ""}`}>
                        <input type="text" required placeholder="Почта*" value={wq.email} onChange={(e: any) => setWq((prev: any) => { return { ...prev, email: e.target.value } })} className={`text-[#212121] placeholder:opacity-[40%] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none ${fuck?.error?.email ? "text-[#EB5757]" : ""}`} name="email" />
                    </div>
                    <p className="px-[32px] text-[#EB5757] font-inter font-[400] text-[14px] leading-[18px] mt-[8px]">{fuck?.error?.email}</p>
                </div>
                <div className={`flex flex-col ${fuck?.error?.phone ? "mb-[8px]" : ""}`}>
                    <div className={`h-[54px] rounded-[32px] border border-solid border-[#1083E666] px-[32px] mb-[8px] flex items-center gap-[15px] ${fuck?.error?.phone ? "border-[#EB5757]" : ""}`}>
                        <input type="tel" required placeholder="Номер телефона*" value={wq.phone} onChange={(e: any) => setWq((prev: any) => { return { ...prev, phone: e.target.value } })} className={`text-[#212121] placeholder:opacity-[40%] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none ${fuck?.error.phone ? "text-[#EB5757]" : ""}`} name="phone" />
                    </div>
                    <p className="px-[32px] text-[#EB5757] font-inter font-[400] text-[14px] leading-[18px] mt-[8px]">{fuck?.error?.phone}</p>
                </div>
            </div>
            <div className="w-[100%] mt-[28px]">
                <button type="submit" className={`text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px] w-[100%] bg-[var(--blue-10,_#1083E61A)] h-[54px] rounded-[32px]`}>Войти</button>
            </div>
        </form>
    )
}

function LastComplationOfData({ Change, close }: { Change: any, close: any }) {
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
            let a = JSON.parse(sessionStorage.getItem("fuck_2") as any)

            localStorage.setItem("email", JSON.stringify(a.email))
            sessionStorage.clear()
            localStorage.removeItem("country")
            close((prev: any) => !prev)
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
                    <button type="button" className={`w-[54px] min-w-[54px] max-w-[54px] h-[54px] rounded-[50%] border border-solid border-[#27AE60] flex items-center justify-center bg-[#27AE60] ${!!(fuck?.error?.email || fuck?.error?.title || fuck?.error?.phone || fuck?.error?.full_name) ? "!bg-[#EB5757] !border-[#EB5757]" : ""}`} onClick={() => Change(4)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 15.1667C2.44649 13.1021 5.08918 11.8333 8 11.8333C10.9108 11.8333 13.5535 13.1021 15.5 15.1667M11.75 4.75C11.75 6.82107 10.0711 8.5 8 8.5C5.92893 8.5 4.25 6.82107 4.25 4.75C4.25 2.67893 5.92893 1 8 1C10.0711 1 11.75 2.67893 11.75 4.75Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div className="w-[100%] h-[1px] border-t border-solid border-t-[#21212133]"></div>
                    <button type="button" className="w-[54px] min-w-[54px] max-w-[54px] h-[54px] rounded-[50%] border border-solid border-[#1083E6] flex items-center justify-center bg-[#1083E6]" onClick={() => Change(5)}>
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.00033 17.8337C13.6027 17.8337 17.3337 14.1027 17.3337 9.50033C17.3337 4.89795 13.6027 1.16699 9.00033 1.16699C4.39795 1.16699 0.666992 4.89795 0.666992 9.50033C0.666992 14.1027 4.39795 17.8337 9.00033 17.8337Z" stroke="#FFFF" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11.2687 6.38863C11.6759 6.25292 11.8794 6.18507 12.0148 6.23334C12.1326 6.27535 12.2253 6.36805 12.2673 6.48585C12.3156 6.62122 12.2477 6.82478 12.112 7.2319L10.8724 10.9508C10.8338 11.0667 10.8144 11.1247 10.7815 11.1728C10.7523 11.2155 10.7155 11.2523 10.6728 11.2815C10.6247 11.3144 10.5667 11.3338 10.4508 11.3724L6.7319 12.612C6.32478 12.7477 6.12122 12.8156 5.98585 12.7673C5.86805 12.7253 5.77535 12.6326 5.73334 12.5148C5.68507 12.3794 5.75292 12.1759 5.88863 11.7687L7.12825 8.04989C7.1669 7.93394 7.18622 7.87596 7.21916 7.82782C7.24833 7.78517 7.28517 7.74833 7.32782 7.71916C7.37596 7.68622 7.43394 7.6669 7.54989 7.62825L11.2687 6.38863Z" stroke="#FFFF" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="w-[100%]">
                    <div className={`flex flex-col ${fuck?.error?.city ? "mb-[8px]" : ""}`}>
                        <div className="h-[54px] rounded-[32px] border border-solid border-[#1083E666] px-[32px] mb-[8px] flex items-center gap-[15px]">
                            <input type="text" required placeholder="Город" value={wq.city} onChange={(e: any) => setWq((prev: any) => { return { ...prev, city: e.target.value } })} className={`text-[#212121] placeholder:opacity-[40%] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none ${fuck?.error?.city}`} name="city" />
                        </div>
                        <p className="px-[32px] text-[#EB5757] font-inter font-[400] text-[14px] leading-[18px] mt-[8px]">{fuck?.error?.city}</p>
                    </div>
                    <div className={`flex flex-col ${fuck?.error?.address ? "mb-[8px]" : ""}`}>
                        <div className={`h-[54px] rounded-[32px] border border-solid border-[#1083E666] px-[32px] mb-[8px] flex items-center gap-[15px] ${fuck?.error?.address ? "border-[#EB5757]" : ""}`}>
                            <input type="text" required placeholder="Местоположение( Адрес)*" value={wq.address} onChange={(e: any) => setWq((prev: any) => { return { ...prev, address: e.target.value } })} className={`text-[#212121] placeholder:opacity-[40%] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none ${fuck?.error?.address ? "text-[#EB5757]" : ""}`} name="address" />
                        </div>
                        <p className="px-[32px] text-[#EB5757] font-inter font-[400] text-[14px] leading-[18px] mt-[8px]">{fuck?.error?.address}</p>
                    </div>
                    <div className={`flex flex-col ${fuck?.error?.password ? "mb-[8px]" : ""}`}>
                        <div className={`h-[54px] rounded-[32px] border border-solid border-[#1083E666] px-[32px] flex items-center gap-[15px] ${fuck?.error?.password ? "border-[#EB5757]" : ""}`}>
                            <input type="password" required placeholder="Пароль*" value={wq.password} onChange={(e: any) => setWq((prev: any) => { return { ...prev, password: e.target.value } })} className={`text-[#212121] placeholder:opacity-[40%] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none ${fuck?.error?.password ? "text-[#EB5757]" : ""}`} name="password" />
                        </div>
                        <p className="px-[32px] text-[#EB5757] font-inter font-[400] text-[14px] leading-[18px] mt-[8px]">{fuck?.error?.password}</p>
                    </div>
                    <div className={`flex flex-col ${confPass ? "mb-[8px]" : ""}`}>
                        <div className={`h-[54px] rounded-[32px] border border-solid border-[#1083E666] px-[32px] flex items-center gap-[15px] ${confPass ? "border-[#EB5757]" : ""}`}>
                            <input type="password" required placeholder="Повторите пароль*" value={wq.confPassword} className={`text-[#212121] placeholder:opacity-[40%] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none ${confPass ? "text-[#EB5757]" : ""}`} name="confPassword" onChange={(e: any) => {
                                setWq((prev: any) => { return { ...prev, confPassword: e.target.value } })
                                setConfPass("")
                            }} />
                        </div>
                        <p className="px-[32px] text-[#EB5757] font-inter font-[400] text-[14px] leading-[18px] mt-[8px]">{confPass}</p>
                    </div>
                </div>
                <div className="w-[100%] mt-[28px]">
                    <button type="submit" className={`text-white font-inter font-[400] text-[16px] leading-[22px] w-[100%] bg-[#1083E6] h-[54px] rounded-[32px]`}>Отправить на проверку</button>
                </div>
            </form>
        </>
    )
}

function ChooseRegion({ Change }: { Change: any }) {
    return (
        <div className="flex flex-col items-center w-[100%]">
            <svg width="58" height="26" viewBox="0 0 58 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.6069 9.14893C17.4396 8.57131 17.2045 8.06095 16.9018 7.61785C16.599 7.16684 16.2285 6.78704 15.7903 6.47845C15.3601 6.16195 14.8661 5.92062 14.3084 5.75446C13.7587 5.58829 13.1492 5.50521 12.4799 5.50521C11.2291 5.50521 10.1296 5.8138 9.18146 6.43098C8.24132 7.04815 7.50833 7.94622 6.98249 9.12519C6.45665 10.2962 6.19373 11.7284 6.19373 13.4217C6.19373 15.115 6.45266 16.555 6.97054 17.7419C7.48841 18.9288 8.2214 19.8348 9.16951 20.4599C10.1176 21.077 11.237 21.3856 12.5277 21.3856C13.6989 21.3856 14.6988 21.1799 15.5274 20.7685C16.364 20.3491 17.0014 19.7596 17.4396 19C17.8857 18.2404 18.1088 17.3423 18.1088 16.3058L19.1605 16.4601H12.8504V12.5909H23.0924V15.653C23.0924 17.7894 22.6382 19.6251 21.7299 21.1601C20.8217 22.6872 19.5708 23.8662 17.9774 24.697C16.3839 25.5199 14.5594 25.9314 12.5038 25.9314C10.2092 25.9314 8.19352 25.4289 6.45665 24.424C4.71978 23.4112 3.36534 21.9751 2.39333 20.1157C1.42929 18.2483 0.947266 16.0328 0.947266 13.4692C0.947266 11.4989 1.23409 9.74236 1.80773 8.19942C2.38935 6.64857 3.20201 5.33509 4.24572 4.25899C5.28944 3.18289 6.50445 2.36394 7.89076 1.80216C9.27707 1.24037 10.7789 0.959473 12.3963 0.959473C13.7826 0.959473 15.0733 1.16124 16.2684 1.56478C17.4635 1.96041 18.5231 2.52219 19.4473 3.25015C20.3795 3.9781 21.1404 4.84452 21.7299 5.84941C22.3195 6.84638 22.698 7.94622 22.8653 9.14893H17.6069Z" fill="#212121" />
                <path d="M32.1542 1.2918V25.599H26.9794V1.2918H32.1542Z" fill="#212121" />
                <path d="M45.0881 25.599H36.4117V1.2918H45.1598C47.6217 1.2918 49.741 1.77842 51.5177 2.75166C53.2944 3.71698 54.6608 5.10563 55.6168 6.9176C56.5809 8.72956 57.0629 10.8976 57.0629 13.4217C57.0629 15.9537 56.5809 18.1296 55.6168 19.9495C54.6608 21.7694 53.2864 23.1659 51.4938 24.1392C49.7091 25.1124 47.5739 25.599 45.0881 25.599ZM41.5864 21.1957H44.8729C46.4027 21.1957 47.6894 20.9267 48.7331 20.3887C49.7848 19.8427 50.5735 19 51.0994 17.8606C51.6332 16.7133 51.9001 15.2336 51.9001 13.4217C51.9001 11.6255 51.6332 10.1578 51.0994 9.01837C50.5735 7.87897 49.7888 7.04024 48.745 6.50219C47.7013 5.96414 46.4146 5.69511 44.8849 5.69511H41.5864V21.1957Z" fill="#212121" />
            </svg>
            <h6 className="text-[#212121] font-inter font-[700] text-[40px] leading-[44px] mt-[40px] mb-[28px]">Добро пожаловать</h6>
            <p className="text-[#212121] font-inter font-[400] text-[20px] leading-[26px] opacity-[60%]">Выберите свой регион</p>
            <div className="w-[100%] flex gap-[40px] mt-[40px]">
                <div className="bg-[url(/assets/img/tashkent.jpg)] relative bg-cover bg-center flex items-center group justify-center w-[50%] h-[300px] rounded-[32px] before:content-[''] before:w-[100%] before:h-[100%] before:absolute before:top-0 before:left-0 hover:before:bg-[#1083E666] before:bg-[transparent] before:duration-200 duration-200 cursor-pointer overflow-hidden" onClick={() => {
                    localStorage.setItem("country", "Узбекистан")
                    Change(2)
                }}>
                    <button className="text-white font-inter font-[400] text-[16px] leading-[22px] relative z-[9] opacity-[0%] group-hover:opacity-[100%] duration-200 bg-[#1083E6] h-[48px] px-[24px] rounded-[24px]">Узбекистан</button>
                </div>
                <div className="bg-[url(/assets/img/bishkek.jpg)] relative bg-cover bg-center flex items-center group justify-center w-[50%] h-[300px] rounded-[32px] before:content-[''] before:w-[100%] before:h-[100%] before:absolute before:top-0 before:left-0 hover:before:bg-[#1083E666] before:bg-[transparent] before:duration-200 duration-200 cursor-pointer overflow-hidden" onClick={() => {
                    localStorage.setItem("country", "Кыргызстан")
                    Change(2)
                }}>
                    <button className="text-white font-inter font-[400] text-[16px] leading-[22px] relative z-[9] opacity-[0%] group-hover:opacity-[100%] duration-200 bg-[#1083E6] h-[48px] px-[24px] rounded-[24px]">Кыргызстан</button>
                </div>
            </div>
        </div>
    )
}




























function SettingsContent({ close }: { close: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [state, setState] = useState(false)
    return (
        <>
            {
                state
                &&
                <div className="fixed z-[9] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] h-[100%] flex items-center justify-center bg-[#2121214D]" onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    let Event = e.target as HTMLButtonElement
                    if (!Event.closest("#deleteacountmodalid")) {
                        setState(false)
                    }
                }}>
                    <div className="bg-white rounded-[64px] py-[48px] px-[80px] max-w-[839px] w-[100%]" id="deleteacountmodalid">
                        <h6 className="text-[#212121] font-inter font-[700] text-[36px] leading-[36px] text-center mb-[16px]">Вы точно хотите выйти с акаунта</h6>
                        <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[19px] opacity-[40%] text-center max-w-[64%] mx-auto mb-[44px]">Надеимся вы запомнили свой пароль. Мы будем скучать по вам.</p>
                        <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#EB5757] h-[54px] rounded-[32px] px-[167px] mx-auto flex items-center">Выйти</button>
                    </div>
                </div>
            }
            <div className="w-[100%] h-[100%] bg-[#2121214D] fixed z-[8] flex items-center justify-center"
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                    let Event = event.target as HTMLButtonElement
                    if (!Event.closest(`#registrationLoginModalWindowContent`)) {
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
                        <button className="border border-solid border-[#1083E6] rounded-[24px] w-[200px] h-[48px] text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] bg-[#1083E6] text-white">Личный кабинет</button>
                        <button className="border border-solid border-[#1083E6] rounded-[24px] w-[200px] h-[48px] text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px]">Избранное</button>
                        <button className="border border-solid border-[#1083E6] rounded-[24px] w-[200px] h-[48px] text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px]">Мои коментарии</button>
                        <button className="border border-solid border-[#1083E6] rounded-[24px] w-[200px] h-[48px] text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px]">Настройки</button>
                        <button className="border border-solid border-[#1083E6] rounded-[24px] w-[200px] h-[48px] text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] border-[#EB5757] text-[#EB5757]" onClick={() => setState(prev => !prev)}>Выйти</button>
                    </div>
                    {/* <OwnRoom /> */}
                    {/* <FavoriteRoom /> */}
                    {/* <MyReviews /> */}
                    <ChangePassword />
                </div>
            </div>
        </>
    )
}

function OwnRoom() {
    return (
        <div className="border border-solid border-[#1083E6] rounded-[64px] p-[40px] w-[100%] h-[100%] flex gap-[20px]">
            <div className=" bg-[url(/assets/img/gril.jpg)] bg-cover bg-center w-[200px] max-w-[200px] min-w-[200px] rounded-[40px] border border-solid border-[#1083E666] p-[16px] flex items-end justify-end">
                <button className="bg-white border border-slid border-[#1083E6] w-[48px] h-[48px] flex items-center justify-center rounded-[50%]">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3.00023L5.8 3.00023C4.11984 3.00023 3.27976 3.00023 2.63803 3.32721C2.07354 3.61483 1.6146 4.07377 1.32698 4.63826C1 5.27999 1 6.12007 1 7.80023L1 16.2002C1 17.8804 1 18.7205 1.32698 19.3622C1.6146 19.9267 2.07354 20.3856 2.63803 20.6732C3.27976 21.0002 4.11984 21.0002 5.8 21.0002L14.2 21.0002C15.8802 21.0002 16.7202 21.0002 17.362 20.6732C17.9265 20.3856 18.3854 19.9267 18.673 19.3622C19 18.7205 19 17.8804 19 16.2002V12.0002M6.99997 15.0002H8.67452C9.1637 15.0002 9.40829 15.0002 9.63846 14.945C9.84254 14.896 10.0376 14.8152 10.2166 14.7055C10.4184 14.5818 10.5914 14.4089 10.9373 14.063L20.5 4.50023C21.3284 3.6718 21.3284 2.32865 20.5 1.50023C19.6716 0.6718 18.3284 0.671799 17.5 1.50022L7.93723 11.063C7.59133 11.4089 7.41838 11.5818 7.29469 11.7837C7.18504 11.9626 7.10423 12.1577 7.05523 12.3618C6.99997 12.5919 6.99997 12.8365 6.99997 13.3257L6.99997 15.0002Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
            <div className="w-[100%] flex flex-col justify-between">
                <div className="w-[100%] grid grid-cols-2 grid-rows-[54px,_54px,_54px] gap-[8px] h-[100%] place-content-center">
                    <div className="h-[54px] w-[100%] rounded-[32px] border border-solid border-[#1083E6] px-[32px] mb-[8px] flex items-center gap-[15px]">
                        <input type="text" required placeholder="Название*" className="text-[#212121] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none" />
                    </div>
                    <div className="h-[54px] w-[100%] rounded-[32px] border border-solid border-[#1083E6] px-[32px] mb-[8px] flex items-center gap-[15px]">
                        <input type="text" required placeholder="Возраст" className="text-[#212121] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none" />
                    </div>
                    <div className="h-[54px] w-[100%] rounded-[32px] border border-solid border-[#1083E6] px-[32px] mb-[8px] flex items-center gap-[15px]">
                        <input type="text" required placeholder="Почта" className="text-[#212121] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none" />
                    </div>
                    <div className="h-[54px] w-[100%] rounded-[32px] border border-solid border-[#1083E6] px-[32px] mb-[8px] flex items-center gap-[15px]">
                        <input type="text" required placeholder="Номер телефона" className="text-[#212121] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none" />
                    </div>
                    <div className="h-[54px] w-[100%] rounded-[32px] border border-solid border-[#1083E6] px-[32px] mb-[8px] flex items-center gap-[15px]">
                        <input type="text" required placeholder="Симейное положение" className="text-[#212121] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none" />
                    </div>
                    <div className="h-[54px] w-[100%] rounded-[32px] border border-solid border-[#1083E6] px-[32px] mb-[8px] flex items-center gap-[15px]">
                        <input type="text" required placeholder="Город проживания" className="text-[#212121] h-[100%] placeholder:text-[#212121] font-inter font-[400] text-[16px] leading-[22px] w-[100%] outline-none" />
                    </div>
                </div>
                <button className="text-white font-inter font-[400] text-[16px] leading-[24px] h-[62px] px-[64px] bg-[#1083E6] rounded-[40px] w-[max-content] ml-auto">Применить</button>
            </div>
        </div>
    )
}

function FavoriteRoom() {
    return (
        <div className="flex flex-col items-center justify-between h-[100%]">
            <div className="grid grid-cols-3">
                <div className="max-w-[100%] w-[100%] px-[24px] border-r border-solid border-r-[#21212180]">
                    <div className="bg-[url(/assets/img/cart_image.jpg)] bg-cover bg-center h-[220px] rounded-[32px] p-[16px] flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-[4px] h-[42px] bg-white px-[12px] rounded-[24px]">
                                <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">Рейтинг</p>
                                <div className="flex items-center">
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                    </svg>
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                    </svg>
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                    </svg>
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                    </svg>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25577 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7525 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84227 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7525 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25577 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <button className="w-[40px] h-[40px] rounded-[50%] bg-white flex items-center justify-center">
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.7404 1C13.0886 1 14.6663 3.235 14.6663 5.32C14.6663 9.5425 8.11819 13 7.99967 13C7.88116 13 1.33301 9.5425 1.33301 5.32C1.33301 3.235 2.91079 1 5.25893 1C6.60708 1 7.48856 1.6825 7.99967 2.2825C8.51079 1.6825 9.39227 1 10.7404 1Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-[#212121] font-inter font-[400] text-[14px] leading-[16px] h-[42px] bg-white rounded-[24px] flex items-center px-[24px] w-[max-content]">22.10.24</div>
                    </div>
                    <h4 className="text-[#212121] font-inter font-[600] text-[28px] leading-[30px] mt-[30px] mb-[16px]">Однодневный поход в Кара-кой</h4>
                    <div className="flex flex-wrap gap-[7px] mb-[30px]">
                        <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Кыргызстан</button>
                        <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Однодневный</button>
                        <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">В палатке</button>
                        <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Выезд утром</button>
                        <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Без палатки</button>
                    </div>
                    <div className="flex justify-between gap-[8px]">
                        <div className="flex">
                            <p className="text-[#212121] font-inter font-[700] text-[24px] leading-[26px] h-[54px] w-[65px] flex justify-center items-center">15$</p>
                            <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px] opacity-[70%]">157$</p>
                        </div>
                        <div className="bg-white border border-solid border-[#1083E6] rounded-[32px] flex items-center w-[max-content] h-[54px] px-[20px] gap-[4px] ml-auto">
                            <button className="w-[20px] h-[20px] flex items-center justify-center">
                                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 11L1 6L6 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <p className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px]">34</p>
                            <button className="w-[20px] h-[20px] flex items-center justify-center">
                                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 11L6 6L1 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#1083E6] h-[54px] px-[22px] rounded-[32px]">Купить</button>
                    </div>
                </div>
                <div className="max-w-[100%] w-[100%] px-[24px] border-r border-solid border-r-[#21212180]">
                    <div className="bg-[url(/assets/img/cart_image.jpg)] bg-cover bg-center h-[220px] rounded-[32px] p-[16px] flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-[4px] h-[42px] bg-white px-[12px] rounded-[24px]">
                                <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">Рейтинг</p>
                                <div className="flex items-center">
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                    </svg>
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                    </svg>
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                    </svg>
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                    </svg>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25577 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7525 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84227 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7525 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25577 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <button className="w-[40px] h-[40px] rounded-[50%] bg-white flex items-center justify-center">
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.7404 1C13.0886 1 14.6663 3.235 14.6663 5.32C14.6663 9.5425 8.11819 13 7.99967 13C7.88116 13 1.33301 9.5425 1.33301 5.32C1.33301 3.235 2.91079 1 5.25893 1C6.60708 1 7.48856 1.6825 7.99967 2.2825C8.51079 1.6825 9.39227 1 10.7404 1Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-[#212121] font-inter font-[400] text-[14px] leading-[16px] h-[42px] bg-white rounded-[24px] flex items-center px-[24px] w-[max-content]">22.10.24</div>
                    </div>
                    <h4 className="text-[#212121] font-inter font-[600] text-[28px] leading-[30px] mt-[30px] mb-[16px]">Однодневный поход в Кара-кой</h4>
                    <div className="flex flex-wrap gap-[7px] mb-[30px]">
                        <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Кыргызстан</button>
                        <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Однодневный</button>
                        <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">В палатке</button>
                        <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Выезд утром</button>
                        <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Без палатки</button>
                    </div>
                    <div className="flex justify-between gap-[8px]">
                        <div className="flex">
                            <p className="text-[#212121] font-inter font-[700] text-[24px] leading-[26px] h-[54px] w-[75px] flex justify-center items-center">15$</p>
                            <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px] opacity-[70%]">157$</p>
                        </div>
                        <div className="bg-white border border-solid border-[#1083E6] rounded-[32px] flex items-center w-[max-content] h-[54px] px-[20px] gap-[4px] ml-auto">
                            <button className="w-[20px] h-[20px] flex items-center justify-center">
                                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 11L1 6L6 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <p className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px]">34</p>
                            <button className="w-[20px] h-[20px] flex items-center justify-center">
                                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 11L6 6L1 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#1083E6] h-[54px] px-[32px] rounded-[32px]">Купить</button>
                    </div>
                </div>
                <div className="max-w-[100%] w-[100%] px-[24px] border-r border-solid border-r-[#21212180]">
                    <div className="bg-[url(/assets/img/cart_image.jpg)] bg-cover bg-center h-[220px] rounded-[32px] p-[16px] flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-[4px] h-[42px] bg-white px-[12px] rounded-[24px]">
                                <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px]">Рейтинг</p>
                                <div className="flex items-center">
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                    </svg>
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                    </svg>
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                    </svg>
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25576 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7526 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84228 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7526 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25576 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" fill="#FBAD38" />
                                    </svg>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.52144 1.30205C6.6751 0.990755 6.75193 0.835109 6.85623 0.78538C6.94697 0.742113 7.0524 0.742113 7.14314 0.78538C7.24744 0.835109 7.32427 0.990755 7.47793 1.30205L8.93571 4.25536C8.98108 4.34726 9.00376 4.39321 9.03691 4.42889C9.06626 4.46048 9.10145 4.48607 9.14055 4.50425C9.18471 4.52479 9.23541 4.5322 9.33682 4.54702L12.5977 5.02364C12.9411 5.07383 13.1127 5.09893 13.1922 5.1828C13.2613 5.25577 13.2938 5.35603 13.2807 5.45569C13.2656 5.57022 13.1413 5.69129 12.8927 5.93342L10.534 8.23078C10.4604 8.3024 10.4237 8.33821 10.4 8.38081C10.379 8.41854 10.3655 8.45998 10.3603 8.50284C10.3544 8.55125 10.3631 8.60183 10.3804 8.703L10.937 11.9479C10.9957 12.2902 11.025 12.4613 10.9699 12.5628C10.9219 12.6512 10.8366 12.7132 10.7377 12.7315C10.6241 12.7525 10.4704 12.6717 10.1631 12.5101L7.24793 10.9771C7.1571 10.9293 7.11168 10.9054 7.06384 10.896C7.02147 10.8877 6.9779 10.8877 6.93554 10.896C6.88769 10.9054 6.84227 10.9293 6.75145 10.9771L3.83629 12.5101C3.52895 12.6717 3.37528 12.7525 3.26166 12.7315C3.1628 12.7132 3.07749 12.6512 3.0295 12.5628C2.97434 12.4613 3.00369 12.2902 3.06239 11.9479L3.61893 8.703C3.63628 8.60183 3.64496 8.55125 3.63909 8.50284C3.63389 8.45998 3.62042 8.41854 3.59941 8.38081C3.57569 8.33821 3.53893 8.3024 3.4654 8.23078L1.10671 5.93342C0.858116 5.69129 0.733818 5.57022 0.718692 5.45569C0.705532 5.35603 0.738043 5.25577 0.807175 5.1828C0.886631 5.09893 1.05832 5.07383 1.4017 5.02364L4.66255 4.54702C4.76396 4.5322 4.81466 4.52479 4.85882 4.50425C4.89792 4.48607 4.93312 4.46048 4.96246 4.42889C4.99561 4.39321 5.01829 4.34726 5.06366 4.25536L6.52144 1.30205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <button className="w-[40px] h-[40px] rounded-[50%] bg-white flex items-center justify-center">
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.7404 1C13.0886 1 14.6663 3.235 14.6663 5.32C14.6663 9.5425 8.11819 13 7.99967 13C7.88116 13 1.33301 9.5425 1.33301 5.32C1.33301 3.235 2.91079 1 5.25893 1C6.60708 1 7.48856 1.6825 7.99967 2.2825C8.51079 1.6825 9.39227 1 10.7404 1Z" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-[#212121] font-inter font-[400] text-[14px] leading-[16px] h-[42px] bg-white rounded-[24px] flex items-center px-[24px] w-[max-content]">22.10.24</div>
                    </div>
                    <h4 className="text-[#212121] font-inter font-[600] text-[28px] leading-[30px] mt-[30px] mb-[16px]">Однодневный поход в Кара-кой</h4>
                    <div className="flex flex-wrap gap-[7px] mb-[30px]">
                        <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Кыргызстан</button>
                        <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Однодневный</button>
                        <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">В палатке</button>
                        <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Выезд утром</button>
                        <button className="text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px] px-[16px] h-[33px] bg-[var(--blue-10,_#1083E61A)] rounded-[24px]">Без палатки</button>
                    </div>
                    <div className="flex justify-between gap-[8px]">
                        <div className="flex">
                            <p className="text-[#212121] font-inter font-[700] text-[24px] leading-[26px] h-[54px] w-[75px] flex justify-center items-center">15$</p>
                            <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[17px] opacity-[70%]">157$</p>
                        </div>
                        <div className="bg-white border border-solid border-[#1083E6] rounded-[32px] flex items-center w-[max-content] h-[54px] px-[20px] gap-[4px] ml-auto">
                            <button className="w-[20px] h-[20px] flex items-center justify-center">
                                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 11L1 6L6 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <p className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[22px]">34</p>
                            <button className="w-[20px] h-[20px] flex items-center justify-center">
                                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 11L6 6L1 1" stroke="#1083E6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#1083E6] h-[54px] px-[32px] rounded-[32px]">Купить</button>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-[5px]">
                <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#1083E6] hover:bg-[#1083E6] duration-200 bg-[#1083E6]"></button>
                <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#1083E6] hover:bg-[#1083E6] duration-200"></button>
                <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#1083E6] hover:bg-[#1083E6] duration-200"></button>
                <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#1083E6] hover:bg-[#1083E6] duration-200"></button>
                <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#1083E6] hover:bg-[#1083E6] duration-200"></button>
                <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#1083E6] hover:bg-[#1083E6] duration-200"></button>
            </div>
        </div>
    )
}

function MyReviews() {
    return (
        <div className="flex flex-col items-center justify-between h-[100%] w-[100%] overflow-hidden py-[100px]">
            <div className="flex gap-[12px] overflow-x-auto w-[100%] noscroller">
                <div className="bg-[var(--blue-10,_#1083E61A)] rounded-[56px] p-[32px] max-w-[480px] w-[100%] h-[max-content] min-w-[480px]">
                    <div className="flex gap-[8px] mb-[20px]">
                        <div className="bg-white px-[24px] h-[42px] w-[max-content] rounded-[24px] flex items-center text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px]">22.10.24</div>
                        <div className="bg-white px-[24px] h-[42px] w-[100%] rounded-[24px] flex items-center justify-center gap-[2px]">
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.52242 0.802048C6.67608 0.490755 6.7529 0.335109 6.8572 0.28538C6.94795 0.242113 7.05338 0.242113 7.14412 0.28538C7.24842 0.335109 7.32525 0.490755 7.47891 0.802048L8.93669 3.75536C8.98205 3.84726 9.00474 3.89321 9.03788 3.92889C9.06723 3.96048 9.10243 3.98607 9.14153 4.00425C9.18569 4.02479 9.23639 4.0322 9.3378 4.04702L12.5986 4.52364C12.942 4.57383 13.1137 4.59893 13.1932 4.6828C13.2623 4.75576 13.2948 4.85603 13.2817 4.95569C13.2665 5.07022 13.1422 5.19129 12.8936 5.43342L10.535 7.73078C10.4614 7.8024 10.4247 7.83821 10.4009 7.88081C10.3799 7.91854 10.3665 7.95998 10.3613 8.00284C10.3554 8.05125 10.3641 8.10183 10.3814 8.203L10.938 11.4479C10.9967 11.7902 11.026 11.9613 10.9708 12.0628C10.9229 12.1512 10.8376 12.2132 10.7387 12.2315C10.6251 12.2526 10.4714 12.1717 10.1641 12.0101L7.2489 10.4771C7.15807 10.4293 7.11266 10.4054 7.06481 10.396C7.02245 10.3877 6.97888 10.3877 6.93651 10.396C6.88867 10.4054 6.84325 10.4293 6.75242 10.4771L3.83727 12.0101C3.52993 12.1717 3.37626 12.2526 3.26263 12.2315C3.16377 12.2132 3.07847 12.1512 3.03048 12.0628C2.97532 11.9613 3.00467 11.7902 3.06337 11.4479L3.61991 8.203C3.63726 8.10183 3.64593 8.05125 3.64006 8.00284C3.63487 7.95998 3.62139 7.91854 3.60039 7.88081C3.57667 7.83821 3.5399 7.8024 3.46637 7.73078L1.10769 5.43342C0.859093 5.19129 0.734794 5.07022 0.719669 4.95569C0.706508 4.85603 0.73902 4.75576 0.808151 4.6828C0.887608 4.59893 1.0593 4.57383 1.40268 4.52364L4.66353 4.04702C4.76493 4.0322 4.81564 4.02479 4.8598 4.00425C4.89889 3.98607 4.93409 3.96048 4.96344 3.92889C4.99659 3.89321 5.01927 3.84726 5.06463 3.75536L6.52242 0.802048Z" fill="#FBAD38" />
                            </svg>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.52242 0.802048C6.67608 0.490755 6.7529 0.335109 6.8572 0.28538C6.94795 0.242113 7.05338 0.242113 7.14412 0.28538C7.24842 0.335109 7.32525 0.490755 7.47891 0.802048L8.93669 3.75536C8.98205 3.84726 9.00474 3.89321 9.03788 3.92889C9.06723 3.96048 9.10243 3.98607 9.14153 4.00425C9.18569 4.02479 9.23639 4.0322 9.3378 4.04702L12.5986 4.52364C12.942 4.57383 13.1137 4.59893 13.1932 4.6828C13.2623 4.75576 13.2948 4.85603 13.2817 4.95569C13.2665 5.07022 13.1422 5.19129 12.8936 5.43342L10.535 7.73078C10.4614 7.8024 10.4247 7.83821 10.4009 7.88081C10.3799 7.91854 10.3665 7.95998 10.3613 8.00284C10.3554 8.05125 10.3641 8.10183 10.3814 8.203L10.938 11.4479C10.9967 11.7902 11.026 11.9613 10.9708 12.0628C10.9229 12.1512 10.8376 12.2132 10.7387 12.2315C10.6251 12.2526 10.4714 12.1717 10.1641 12.0101L7.2489 10.4771C7.15807 10.4293 7.11266 10.4054 7.06481 10.396C7.02245 10.3877 6.97888 10.3877 6.93651 10.396C6.88867 10.4054 6.84325 10.4293 6.75242 10.4771L3.83727 12.0101C3.52993 12.1717 3.37626 12.2526 3.26263 12.2315C3.16377 12.2132 3.07847 12.1512 3.03048 12.0628C2.97532 11.9613 3.00467 11.7902 3.06337 11.4479L3.61991 8.203C3.63726 8.10183 3.64593 8.05125 3.64006 8.00284C3.63487 7.95998 3.62139 7.91854 3.60039 7.88081C3.57667 7.83821 3.5399 7.8024 3.46637 7.73078L1.10769 5.43342C0.859093 5.19129 0.734794 5.07022 0.719669 4.95569C0.706508 4.85603 0.73902 4.75576 0.808151 4.6828C0.887608 4.59893 1.0593 4.57383 1.40268 4.52364L4.66353 4.04702C4.76493 4.0322 4.81564 4.02479 4.8598 4.00425C4.89889 3.98607 4.93409 3.96048 4.96344 3.92889C4.99659 3.89321 5.01927 3.84726 5.06463 3.75536L6.52242 0.802048Z" fill="#FBAD38" />
                            </svg>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.52242 0.802048C6.67608 0.490755 6.7529 0.335109 6.8572 0.28538C6.94795 0.242113 7.05338 0.242113 7.14412 0.28538C7.24842 0.335109 7.32525 0.490755 7.47891 0.802048L8.93669 3.75536C8.98205 3.84726 9.00474 3.89321 9.03788 3.92889C9.06723 3.96048 9.10243 3.98607 9.14153 4.00425C9.18569 4.02479 9.23639 4.0322 9.3378 4.04702L12.5986 4.52364C12.942 4.57383 13.1137 4.59893 13.1932 4.6828C13.2623 4.75576 13.2948 4.85603 13.2817 4.95569C13.2665 5.07022 13.1422 5.19129 12.8936 5.43342L10.535 7.73078C10.4614 7.8024 10.4247 7.83821 10.4009 7.88081C10.3799 7.91854 10.3665 7.95998 10.3613 8.00284C10.3554 8.05125 10.3641 8.10183 10.3814 8.203L10.938 11.4479C10.9967 11.7902 11.026 11.9613 10.9708 12.0628C10.9229 12.1512 10.8376 12.2132 10.7387 12.2315C10.6251 12.2526 10.4714 12.1717 10.1641 12.0101L7.2489 10.4771C7.15807 10.4293 7.11266 10.4054 7.06481 10.396C7.02245 10.3877 6.97888 10.3877 6.93651 10.396C6.88867 10.4054 6.84325 10.4293 6.75242 10.4771L3.83727 12.0101C3.52993 12.1717 3.37626 12.2526 3.26263 12.2315C3.16377 12.2132 3.07847 12.1512 3.03048 12.0628C2.97532 11.9613 3.00467 11.7902 3.06337 11.4479L3.61991 8.203C3.63726 8.10183 3.64593 8.05125 3.64006 8.00284C3.63487 7.95998 3.62139 7.91854 3.60039 7.88081C3.57667 7.83821 3.5399 7.8024 3.46637 7.73078L1.10769 5.43342C0.859093 5.19129 0.734794 5.07022 0.719669 4.95569C0.706508 4.85603 0.73902 4.75576 0.808151 4.6828C0.887608 4.59893 1.0593 4.57383 1.40268 4.52364L4.66353 4.04702C4.76493 4.0322 4.81564 4.02479 4.8598 4.00425C4.89889 3.98607 4.93409 3.96048 4.96344 3.92889C4.99659 3.89321 5.01927 3.84726 5.06463 3.75536L6.52242 0.802048Z" fill="#FBAD38" />
                            </svg>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.52242 0.802048C6.67608 0.490755 6.7529 0.335109 6.8572 0.28538C6.94795 0.242113 7.05338 0.242113 7.14412 0.28538C7.24842 0.335109 7.32525 0.490755 7.47891 0.802048L8.93669 3.75536C8.98205 3.84726 9.00474 3.89321 9.03788 3.92889C9.06723 3.96048 9.10243 3.98607 9.14153 4.00425C9.18569 4.02479 9.23639 4.0322 9.3378 4.04702L12.5986 4.52364C12.942 4.57383 13.1137 4.59893 13.1932 4.6828C13.2623 4.75576 13.2948 4.85603 13.2817 4.95569C13.2665 5.07022 13.1422 5.19129 12.8936 5.43342L10.535 7.73078C10.4614 7.8024 10.4247 7.83821 10.4009 7.88081C10.3799 7.91854 10.3665 7.95998 10.3613 8.00284C10.3554 8.05125 10.3641 8.10183 10.3814 8.203L10.938 11.4479C10.9967 11.7902 11.026 11.9613 10.9708 12.0628C10.9229 12.1512 10.8376 12.2132 10.7387 12.2315C10.6251 12.2526 10.4714 12.1717 10.1641 12.0101L7.2489 10.4771C7.15807 10.4293 7.11266 10.4054 7.06481 10.396C7.02245 10.3877 6.97888 10.3877 6.93651 10.396C6.88867 10.4054 6.84325 10.4293 6.75242 10.4771L3.83727 12.0101C3.52993 12.1717 3.37626 12.2526 3.26263 12.2315C3.16377 12.2132 3.07847 12.1512 3.03048 12.0628C2.97532 11.9613 3.00467 11.7902 3.06337 11.4479L3.61991 8.203C3.63726 8.10183 3.64593 8.05125 3.64006 8.00284C3.63487 7.95998 3.62139 7.91854 3.60039 7.88081C3.57667 7.83821 3.5399 7.8024 3.46637 7.73078L1.10769 5.43342C0.859093 5.19129 0.734794 5.07022 0.719669 4.95569C0.706508 4.85603 0.73902 4.75576 0.808151 4.6828C0.887608 4.59893 1.0593 4.57383 1.40268 4.52364L4.66353 4.04702C4.76493 4.0322 4.81564 4.02479 4.8598 4.00425C4.89889 3.98607 4.93409 3.96048 4.96344 3.92889C4.99659 3.89321 5.01927 3.84726 5.06463 3.75536L6.52242 0.802048Z" fill="#FBAD38" />
                            </svg>
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.52242 2.80205C7.67608 2.49076 7.7529 2.33511 7.8572 2.28538C7.94795 2.24211 8.05338 2.24211 8.14412 2.28538C8.24842 2.33511 8.32525 2.49076 8.47891 2.80205L9.93669 5.75536C9.98205 5.84726 10.0047 5.89321 10.0379 5.92889C10.0672 5.96048 10.1024 5.98607 10.1415 6.00425C10.1857 6.02479 10.2364 6.0322 10.3378 6.04702L13.5986 6.52364C13.942 6.57383 14.1137 6.59893 14.1932 6.6828C14.2623 6.75577 14.2948 6.85603 14.2817 6.95569C14.2665 7.07022 14.1422 7.19129 13.8936 7.43342L11.5349 9.73078C11.4614 9.8024 11.4247 9.83821 11.4009 9.88081C11.3799 9.91854 11.3665 9.95998 11.3613 10.0028C11.3554 10.0513 11.3641 10.1018 11.3814 10.203L11.938 13.4479C11.9967 13.7902 12.026 13.9613 11.9708 14.0628C11.9229 14.1512 11.8376 14.2132 11.7387 14.2315C11.6251 14.2525 11.4714 14.1717 11.1641 14.0101L8.2489 12.4771C8.15807 12.4293 8.11266 12.4054 8.06481 12.396C8.02245 12.3877 7.97888 12.3877 7.93651 12.396C7.88867 12.4054 7.84325 12.4293 7.75242 12.4771L4.83727 14.0101C4.52993 14.1717 4.37626 14.2525 4.26263 14.2315C4.16377 14.2132 4.07847 14.1512 4.03048 14.0628C3.97532 13.9613 4.00467 13.7902 4.06337 13.4479L4.61991 10.203C4.63726 10.1018 4.64593 10.0513 4.64006 10.0028C4.63487 9.95998 4.62139 9.91854 4.60039 9.88081C4.57667 9.83821 4.5399 9.8024 4.46637 9.73078L2.10769 7.43342C1.85909 7.19129 1.73479 7.07022 1.71967 6.95569C1.70651 6.85603 1.73902 6.75577 1.80815 6.6828C1.88761 6.59893 2.0593 6.57383 2.40268 6.52364L5.66353 6.04702C5.76493 6.0322 5.81564 6.02479 5.8598 6.00425C5.89889 5.98607 5.93409 5.96048 5.96344 5.92889C5.99659 5.89321 6.01927 5.84726 6.06463 5.75536L7.52242 2.80205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <button className="bg-[#1083E6] w-[42px] max-w-[42px] min-w-[42px] h-[42px] rounded-[50%] flex items-center justify-center">
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0007 5.50016L6.00065 9.50016M6.00065 5.50016L10.0007 9.50016M14.6673 7.50016C14.6673 11.1821 11.6826 14.1668 8.00065 14.1668C4.31875 14.1668 1.33398 11.1821 1.33398 7.50016C1.33398 3.81826 4.31875 0.833496 8.00065 0.833496C11.6826 0.833496 14.6673 3.81826 14.6673 7.50016Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[20px]">
                        Не упустите возможность окунуться в атмосферу приключений по самым выгодным ценам! Бронируйте свой тур прямо сейчас! Не упустите возможность окунуться в атмосферу приключений по самым выгодным ценам! Бронируйте свой тур прямо сейчас! Не упустите возможность
                    </p>
                </div>
                <div className="bg-[var(--blue-10,_#1083E61A)] rounded-[56px] p-[32px] max-w-[480px] w-[100%] h-[max-content] min-w-[480px]">
                    <div className="flex gap-[8px] mb-[20px]">
                        <div className="bg-white px-[24px] h-[42px] w-[max-content] rounded-[24px] flex items-center text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px]">22.10.24</div>
                        <div className="bg-white px-[24px] h-[42px] w-[100%] rounded-[24px] flex items-center justify-center gap-[2px]">
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.52242 0.802048C6.67608 0.490755 6.7529 0.335109 6.8572 0.28538C6.94795 0.242113 7.05338 0.242113 7.14412 0.28538C7.24842 0.335109 7.32525 0.490755 7.47891 0.802048L8.93669 3.75536C8.98205 3.84726 9.00474 3.89321 9.03788 3.92889C9.06723 3.96048 9.10243 3.98607 9.14153 4.00425C9.18569 4.02479 9.23639 4.0322 9.3378 4.04702L12.5986 4.52364C12.942 4.57383 13.1137 4.59893 13.1932 4.6828C13.2623 4.75576 13.2948 4.85603 13.2817 4.95569C13.2665 5.07022 13.1422 5.19129 12.8936 5.43342L10.535 7.73078C10.4614 7.8024 10.4247 7.83821 10.4009 7.88081C10.3799 7.91854 10.3665 7.95998 10.3613 8.00284C10.3554 8.05125 10.3641 8.10183 10.3814 8.203L10.938 11.4479C10.9967 11.7902 11.026 11.9613 10.9708 12.0628C10.9229 12.1512 10.8376 12.2132 10.7387 12.2315C10.6251 12.2526 10.4714 12.1717 10.1641 12.0101L7.2489 10.4771C7.15807 10.4293 7.11266 10.4054 7.06481 10.396C7.02245 10.3877 6.97888 10.3877 6.93651 10.396C6.88867 10.4054 6.84325 10.4293 6.75242 10.4771L3.83727 12.0101C3.52993 12.1717 3.37626 12.2526 3.26263 12.2315C3.16377 12.2132 3.07847 12.1512 3.03048 12.0628C2.97532 11.9613 3.00467 11.7902 3.06337 11.4479L3.61991 8.203C3.63726 8.10183 3.64593 8.05125 3.64006 8.00284C3.63487 7.95998 3.62139 7.91854 3.60039 7.88081C3.57667 7.83821 3.5399 7.8024 3.46637 7.73078L1.10769 5.43342C0.859093 5.19129 0.734794 5.07022 0.719669 4.95569C0.706508 4.85603 0.73902 4.75576 0.808151 4.6828C0.887608 4.59893 1.0593 4.57383 1.40268 4.52364L4.66353 4.04702C4.76493 4.0322 4.81564 4.02479 4.8598 4.00425C4.89889 3.98607 4.93409 3.96048 4.96344 3.92889C4.99659 3.89321 5.01927 3.84726 5.06463 3.75536L6.52242 0.802048Z" fill="#FBAD38" />
                            </svg>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.52242 0.802048C6.67608 0.490755 6.7529 0.335109 6.8572 0.28538C6.94795 0.242113 7.05338 0.242113 7.14412 0.28538C7.24842 0.335109 7.32525 0.490755 7.47891 0.802048L8.93669 3.75536C8.98205 3.84726 9.00474 3.89321 9.03788 3.92889C9.06723 3.96048 9.10243 3.98607 9.14153 4.00425C9.18569 4.02479 9.23639 4.0322 9.3378 4.04702L12.5986 4.52364C12.942 4.57383 13.1137 4.59893 13.1932 4.6828C13.2623 4.75576 13.2948 4.85603 13.2817 4.95569C13.2665 5.07022 13.1422 5.19129 12.8936 5.43342L10.535 7.73078C10.4614 7.8024 10.4247 7.83821 10.4009 7.88081C10.3799 7.91854 10.3665 7.95998 10.3613 8.00284C10.3554 8.05125 10.3641 8.10183 10.3814 8.203L10.938 11.4479C10.9967 11.7902 11.026 11.9613 10.9708 12.0628C10.9229 12.1512 10.8376 12.2132 10.7387 12.2315C10.6251 12.2526 10.4714 12.1717 10.1641 12.0101L7.2489 10.4771C7.15807 10.4293 7.11266 10.4054 7.06481 10.396C7.02245 10.3877 6.97888 10.3877 6.93651 10.396C6.88867 10.4054 6.84325 10.4293 6.75242 10.4771L3.83727 12.0101C3.52993 12.1717 3.37626 12.2526 3.26263 12.2315C3.16377 12.2132 3.07847 12.1512 3.03048 12.0628C2.97532 11.9613 3.00467 11.7902 3.06337 11.4479L3.61991 8.203C3.63726 8.10183 3.64593 8.05125 3.64006 8.00284C3.63487 7.95998 3.62139 7.91854 3.60039 7.88081C3.57667 7.83821 3.5399 7.8024 3.46637 7.73078L1.10769 5.43342C0.859093 5.19129 0.734794 5.07022 0.719669 4.95569C0.706508 4.85603 0.73902 4.75576 0.808151 4.6828C0.887608 4.59893 1.0593 4.57383 1.40268 4.52364L4.66353 4.04702C4.76493 4.0322 4.81564 4.02479 4.8598 4.00425C4.89889 3.98607 4.93409 3.96048 4.96344 3.92889C4.99659 3.89321 5.01927 3.84726 5.06463 3.75536L6.52242 0.802048Z" fill="#FBAD38" />
                            </svg>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.52242 0.802048C6.67608 0.490755 6.7529 0.335109 6.8572 0.28538C6.94795 0.242113 7.05338 0.242113 7.14412 0.28538C7.24842 0.335109 7.32525 0.490755 7.47891 0.802048L8.93669 3.75536C8.98205 3.84726 9.00474 3.89321 9.03788 3.92889C9.06723 3.96048 9.10243 3.98607 9.14153 4.00425C9.18569 4.02479 9.23639 4.0322 9.3378 4.04702L12.5986 4.52364C12.942 4.57383 13.1137 4.59893 13.1932 4.6828C13.2623 4.75576 13.2948 4.85603 13.2817 4.95569C13.2665 5.07022 13.1422 5.19129 12.8936 5.43342L10.535 7.73078C10.4614 7.8024 10.4247 7.83821 10.4009 7.88081C10.3799 7.91854 10.3665 7.95998 10.3613 8.00284C10.3554 8.05125 10.3641 8.10183 10.3814 8.203L10.938 11.4479C10.9967 11.7902 11.026 11.9613 10.9708 12.0628C10.9229 12.1512 10.8376 12.2132 10.7387 12.2315C10.6251 12.2526 10.4714 12.1717 10.1641 12.0101L7.2489 10.4771C7.15807 10.4293 7.11266 10.4054 7.06481 10.396C7.02245 10.3877 6.97888 10.3877 6.93651 10.396C6.88867 10.4054 6.84325 10.4293 6.75242 10.4771L3.83727 12.0101C3.52993 12.1717 3.37626 12.2526 3.26263 12.2315C3.16377 12.2132 3.07847 12.1512 3.03048 12.0628C2.97532 11.9613 3.00467 11.7902 3.06337 11.4479L3.61991 8.203C3.63726 8.10183 3.64593 8.05125 3.64006 8.00284C3.63487 7.95998 3.62139 7.91854 3.60039 7.88081C3.57667 7.83821 3.5399 7.8024 3.46637 7.73078L1.10769 5.43342C0.859093 5.19129 0.734794 5.07022 0.719669 4.95569C0.706508 4.85603 0.73902 4.75576 0.808151 4.6828C0.887608 4.59893 1.0593 4.57383 1.40268 4.52364L4.66353 4.04702C4.76493 4.0322 4.81564 4.02479 4.8598 4.00425C4.89889 3.98607 4.93409 3.96048 4.96344 3.92889C4.99659 3.89321 5.01927 3.84726 5.06463 3.75536L6.52242 0.802048Z" fill="#FBAD38" />
                            </svg>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.52242 0.802048C6.67608 0.490755 6.7529 0.335109 6.8572 0.28538C6.94795 0.242113 7.05338 0.242113 7.14412 0.28538C7.24842 0.335109 7.32525 0.490755 7.47891 0.802048L8.93669 3.75536C8.98205 3.84726 9.00474 3.89321 9.03788 3.92889C9.06723 3.96048 9.10243 3.98607 9.14153 4.00425C9.18569 4.02479 9.23639 4.0322 9.3378 4.04702L12.5986 4.52364C12.942 4.57383 13.1137 4.59893 13.1932 4.6828C13.2623 4.75576 13.2948 4.85603 13.2817 4.95569C13.2665 5.07022 13.1422 5.19129 12.8936 5.43342L10.535 7.73078C10.4614 7.8024 10.4247 7.83821 10.4009 7.88081C10.3799 7.91854 10.3665 7.95998 10.3613 8.00284C10.3554 8.05125 10.3641 8.10183 10.3814 8.203L10.938 11.4479C10.9967 11.7902 11.026 11.9613 10.9708 12.0628C10.9229 12.1512 10.8376 12.2132 10.7387 12.2315C10.6251 12.2526 10.4714 12.1717 10.1641 12.0101L7.2489 10.4771C7.15807 10.4293 7.11266 10.4054 7.06481 10.396C7.02245 10.3877 6.97888 10.3877 6.93651 10.396C6.88867 10.4054 6.84325 10.4293 6.75242 10.4771L3.83727 12.0101C3.52993 12.1717 3.37626 12.2526 3.26263 12.2315C3.16377 12.2132 3.07847 12.1512 3.03048 12.0628C2.97532 11.9613 3.00467 11.7902 3.06337 11.4479L3.61991 8.203C3.63726 8.10183 3.64593 8.05125 3.64006 8.00284C3.63487 7.95998 3.62139 7.91854 3.60039 7.88081C3.57667 7.83821 3.5399 7.8024 3.46637 7.73078L1.10769 5.43342C0.859093 5.19129 0.734794 5.07022 0.719669 4.95569C0.706508 4.85603 0.73902 4.75576 0.808151 4.6828C0.887608 4.59893 1.0593 4.57383 1.40268 4.52364L4.66353 4.04702C4.76493 4.0322 4.81564 4.02479 4.8598 4.00425C4.89889 3.98607 4.93409 3.96048 4.96344 3.92889C4.99659 3.89321 5.01927 3.84726 5.06463 3.75536L6.52242 0.802048Z" fill="#FBAD38" />
                            </svg>
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.52242 2.80205C7.67608 2.49076 7.7529 2.33511 7.8572 2.28538C7.94795 2.24211 8.05338 2.24211 8.14412 2.28538C8.24842 2.33511 8.32525 2.49076 8.47891 2.80205L9.93669 5.75536C9.98205 5.84726 10.0047 5.89321 10.0379 5.92889C10.0672 5.96048 10.1024 5.98607 10.1415 6.00425C10.1857 6.02479 10.2364 6.0322 10.3378 6.04702L13.5986 6.52364C13.942 6.57383 14.1137 6.59893 14.1932 6.6828C14.2623 6.75577 14.2948 6.85603 14.2817 6.95569C14.2665 7.07022 14.1422 7.19129 13.8936 7.43342L11.5349 9.73078C11.4614 9.8024 11.4247 9.83821 11.4009 9.88081C11.3799 9.91854 11.3665 9.95998 11.3613 10.0028C11.3554 10.0513 11.3641 10.1018 11.3814 10.203L11.938 13.4479C11.9967 13.7902 12.026 13.9613 11.9708 14.0628C11.9229 14.1512 11.8376 14.2132 11.7387 14.2315C11.6251 14.2525 11.4714 14.1717 11.1641 14.0101L8.2489 12.4771C8.15807 12.4293 8.11266 12.4054 8.06481 12.396C8.02245 12.3877 7.97888 12.3877 7.93651 12.396C7.88867 12.4054 7.84325 12.4293 7.75242 12.4771L4.83727 14.0101C4.52993 14.1717 4.37626 14.2525 4.26263 14.2315C4.16377 14.2132 4.07847 14.1512 4.03048 14.0628C3.97532 13.9613 4.00467 13.7902 4.06337 13.4479L4.61991 10.203C4.63726 10.1018 4.64593 10.0513 4.64006 10.0028C4.63487 9.95998 4.62139 9.91854 4.60039 9.88081C4.57667 9.83821 4.5399 9.8024 4.46637 9.73078L2.10769 7.43342C1.85909 7.19129 1.73479 7.07022 1.71967 6.95569C1.70651 6.85603 1.73902 6.75577 1.80815 6.6828C1.88761 6.59893 2.0593 6.57383 2.40268 6.52364L5.66353 6.04702C5.76493 6.0322 5.81564 6.02479 5.8598 6.00425C5.89889 5.98607 5.93409 5.96048 5.96344 5.92889C5.99659 5.89321 6.01927 5.84726 6.06463 5.75536L7.52242 2.80205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <button className="bg-[#1083E6] w-[42px] max-w-[42px] min-w-[42px] h-[42px] rounded-[50%] flex items-center justify-center">
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0007 5.50016L6.00065 9.50016M6.00065 5.50016L10.0007 9.50016M14.6673 7.50016C14.6673 11.1821 11.6826 14.1668 8.00065 14.1668C4.31875 14.1668 1.33398 11.1821 1.33398 7.50016C1.33398 3.81826 4.31875 0.833496 8.00065 0.833496C11.6826 0.833496 14.6673 3.81826 14.6673 7.50016Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[20px]">
                        Не упустите возможность окунуться в атмосферу приключений по самым выгодным ценам! Бронируйте свой тур прямо сейчас! Не упустите возможность окунуться в атмосферу приключений по самым выгодным ценам! Бронируйте свой тур прямо сейчас! Не упустите возможность. Бронируйте свой тур прямо сейчас! Не упустите возможность
                    </p>
                </div>
                <div className="bg-[var(--blue-10,_#1083E61A)] rounded-[56px] p-[32px] max-w-[480px] w-[100%] h-[max-content] min-w-[480px]">
                    <div className="flex gap-[8px] mb-[20px]">
                        <div className="bg-white px-[24px] h-[42px] w-[max-content] rounded-[24px] flex items-center text-[#1083E6] font-inter font-[400] text-[14px] leading-[16px]">22.10.24</div>
                        <div className="bg-white px-[24px] h-[42px] w-[100%] rounded-[24px] flex items-center justify-center gap-[2px]">
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.52242 0.802048C6.67608 0.490755 6.7529 0.335109 6.8572 0.28538C6.94795 0.242113 7.05338 0.242113 7.14412 0.28538C7.24842 0.335109 7.32525 0.490755 7.47891 0.802048L8.93669 3.75536C8.98205 3.84726 9.00474 3.89321 9.03788 3.92889C9.06723 3.96048 9.10243 3.98607 9.14153 4.00425C9.18569 4.02479 9.23639 4.0322 9.3378 4.04702L12.5986 4.52364C12.942 4.57383 13.1137 4.59893 13.1932 4.6828C13.2623 4.75576 13.2948 4.85603 13.2817 4.95569C13.2665 5.07022 13.1422 5.19129 12.8936 5.43342L10.535 7.73078C10.4614 7.8024 10.4247 7.83821 10.4009 7.88081C10.3799 7.91854 10.3665 7.95998 10.3613 8.00284C10.3554 8.05125 10.3641 8.10183 10.3814 8.203L10.938 11.4479C10.9967 11.7902 11.026 11.9613 10.9708 12.0628C10.9229 12.1512 10.8376 12.2132 10.7387 12.2315C10.6251 12.2526 10.4714 12.1717 10.1641 12.0101L7.2489 10.4771C7.15807 10.4293 7.11266 10.4054 7.06481 10.396C7.02245 10.3877 6.97888 10.3877 6.93651 10.396C6.88867 10.4054 6.84325 10.4293 6.75242 10.4771L3.83727 12.0101C3.52993 12.1717 3.37626 12.2526 3.26263 12.2315C3.16377 12.2132 3.07847 12.1512 3.03048 12.0628C2.97532 11.9613 3.00467 11.7902 3.06337 11.4479L3.61991 8.203C3.63726 8.10183 3.64593 8.05125 3.64006 8.00284C3.63487 7.95998 3.62139 7.91854 3.60039 7.88081C3.57667 7.83821 3.5399 7.8024 3.46637 7.73078L1.10769 5.43342C0.859093 5.19129 0.734794 5.07022 0.719669 4.95569C0.706508 4.85603 0.73902 4.75576 0.808151 4.6828C0.887608 4.59893 1.0593 4.57383 1.40268 4.52364L4.66353 4.04702C4.76493 4.0322 4.81564 4.02479 4.8598 4.00425C4.89889 3.98607 4.93409 3.96048 4.96344 3.92889C4.99659 3.89321 5.01927 3.84726 5.06463 3.75536L6.52242 0.802048Z" fill="#FBAD38" />
                            </svg>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.52242 0.802048C6.67608 0.490755 6.7529 0.335109 6.8572 0.28538C6.94795 0.242113 7.05338 0.242113 7.14412 0.28538C7.24842 0.335109 7.32525 0.490755 7.47891 0.802048L8.93669 3.75536C8.98205 3.84726 9.00474 3.89321 9.03788 3.92889C9.06723 3.96048 9.10243 3.98607 9.14153 4.00425C9.18569 4.02479 9.23639 4.0322 9.3378 4.04702L12.5986 4.52364C12.942 4.57383 13.1137 4.59893 13.1932 4.6828C13.2623 4.75576 13.2948 4.85603 13.2817 4.95569C13.2665 5.07022 13.1422 5.19129 12.8936 5.43342L10.535 7.73078C10.4614 7.8024 10.4247 7.83821 10.4009 7.88081C10.3799 7.91854 10.3665 7.95998 10.3613 8.00284C10.3554 8.05125 10.3641 8.10183 10.3814 8.203L10.938 11.4479C10.9967 11.7902 11.026 11.9613 10.9708 12.0628C10.9229 12.1512 10.8376 12.2132 10.7387 12.2315C10.6251 12.2526 10.4714 12.1717 10.1641 12.0101L7.2489 10.4771C7.15807 10.4293 7.11266 10.4054 7.06481 10.396C7.02245 10.3877 6.97888 10.3877 6.93651 10.396C6.88867 10.4054 6.84325 10.4293 6.75242 10.4771L3.83727 12.0101C3.52993 12.1717 3.37626 12.2526 3.26263 12.2315C3.16377 12.2132 3.07847 12.1512 3.03048 12.0628C2.97532 11.9613 3.00467 11.7902 3.06337 11.4479L3.61991 8.203C3.63726 8.10183 3.64593 8.05125 3.64006 8.00284C3.63487 7.95998 3.62139 7.91854 3.60039 7.88081C3.57667 7.83821 3.5399 7.8024 3.46637 7.73078L1.10769 5.43342C0.859093 5.19129 0.734794 5.07022 0.719669 4.95569C0.706508 4.85603 0.73902 4.75576 0.808151 4.6828C0.887608 4.59893 1.0593 4.57383 1.40268 4.52364L4.66353 4.04702C4.76493 4.0322 4.81564 4.02479 4.8598 4.00425C4.89889 3.98607 4.93409 3.96048 4.96344 3.92889C4.99659 3.89321 5.01927 3.84726 5.06463 3.75536L6.52242 0.802048Z" fill="#FBAD38" />
                            </svg>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.52242 0.802048C6.67608 0.490755 6.7529 0.335109 6.8572 0.28538C6.94795 0.242113 7.05338 0.242113 7.14412 0.28538C7.24842 0.335109 7.32525 0.490755 7.47891 0.802048L8.93669 3.75536C8.98205 3.84726 9.00474 3.89321 9.03788 3.92889C9.06723 3.96048 9.10243 3.98607 9.14153 4.00425C9.18569 4.02479 9.23639 4.0322 9.3378 4.04702L12.5986 4.52364C12.942 4.57383 13.1137 4.59893 13.1932 4.6828C13.2623 4.75576 13.2948 4.85603 13.2817 4.95569C13.2665 5.07022 13.1422 5.19129 12.8936 5.43342L10.535 7.73078C10.4614 7.8024 10.4247 7.83821 10.4009 7.88081C10.3799 7.91854 10.3665 7.95998 10.3613 8.00284C10.3554 8.05125 10.3641 8.10183 10.3814 8.203L10.938 11.4479C10.9967 11.7902 11.026 11.9613 10.9708 12.0628C10.9229 12.1512 10.8376 12.2132 10.7387 12.2315C10.6251 12.2526 10.4714 12.1717 10.1641 12.0101L7.2489 10.4771C7.15807 10.4293 7.11266 10.4054 7.06481 10.396C7.02245 10.3877 6.97888 10.3877 6.93651 10.396C6.88867 10.4054 6.84325 10.4293 6.75242 10.4771L3.83727 12.0101C3.52993 12.1717 3.37626 12.2526 3.26263 12.2315C3.16377 12.2132 3.07847 12.1512 3.03048 12.0628C2.97532 11.9613 3.00467 11.7902 3.06337 11.4479L3.61991 8.203C3.63726 8.10183 3.64593 8.05125 3.64006 8.00284C3.63487 7.95998 3.62139 7.91854 3.60039 7.88081C3.57667 7.83821 3.5399 7.8024 3.46637 7.73078L1.10769 5.43342C0.859093 5.19129 0.734794 5.07022 0.719669 4.95569C0.706508 4.85603 0.73902 4.75576 0.808151 4.6828C0.887608 4.59893 1.0593 4.57383 1.40268 4.52364L4.66353 4.04702C4.76493 4.0322 4.81564 4.02479 4.8598 4.00425C4.89889 3.98607 4.93409 3.96048 4.96344 3.92889C4.99659 3.89321 5.01927 3.84726 5.06463 3.75536L6.52242 0.802048Z" fill="#FBAD38" />
                            </svg>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.52242 0.802048C6.67608 0.490755 6.7529 0.335109 6.8572 0.28538C6.94795 0.242113 7.05338 0.242113 7.14412 0.28538C7.24842 0.335109 7.32525 0.490755 7.47891 0.802048L8.93669 3.75536C8.98205 3.84726 9.00474 3.89321 9.03788 3.92889C9.06723 3.96048 9.10243 3.98607 9.14153 4.00425C9.18569 4.02479 9.23639 4.0322 9.3378 4.04702L12.5986 4.52364C12.942 4.57383 13.1137 4.59893 13.1932 4.6828C13.2623 4.75576 13.2948 4.85603 13.2817 4.95569C13.2665 5.07022 13.1422 5.19129 12.8936 5.43342L10.535 7.73078C10.4614 7.8024 10.4247 7.83821 10.4009 7.88081C10.3799 7.91854 10.3665 7.95998 10.3613 8.00284C10.3554 8.05125 10.3641 8.10183 10.3814 8.203L10.938 11.4479C10.9967 11.7902 11.026 11.9613 10.9708 12.0628C10.9229 12.1512 10.8376 12.2132 10.7387 12.2315C10.6251 12.2526 10.4714 12.1717 10.1641 12.0101L7.2489 10.4771C7.15807 10.4293 7.11266 10.4054 7.06481 10.396C7.02245 10.3877 6.97888 10.3877 6.93651 10.396C6.88867 10.4054 6.84325 10.4293 6.75242 10.4771L3.83727 12.0101C3.52993 12.1717 3.37626 12.2526 3.26263 12.2315C3.16377 12.2132 3.07847 12.1512 3.03048 12.0628C2.97532 11.9613 3.00467 11.7902 3.06337 11.4479L3.61991 8.203C3.63726 8.10183 3.64593 8.05125 3.64006 8.00284C3.63487 7.95998 3.62139 7.91854 3.60039 7.88081C3.57667 7.83821 3.5399 7.8024 3.46637 7.73078L1.10769 5.43342C0.859093 5.19129 0.734794 5.07022 0.719669 4.95569C0.706508 4.85603 0.73902 4.75576 0.808151 4.6828C0.887608 4.59893 1.0593 4.57383 1.40268 4.52364L4.66353 4.04702C4.76493 4.0322 4.81564 4.02479 4.8598 4.00425C4.89889 3.98607 4.93409 3.96048 4.96344 3.92889C4.99659 3.89321 5.01927 3.84726 5.06463 3.75536L6.52242 0.802048Z" fill="#FBAD38" />
                            </svg>
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.52242 2.80205C7.67608 2.49076 7.7529 2.33511 7.8572 2.28538C7.94795 2.24211 8.05338 2.24211 8.14412 2.28538C8.24842 2.33511 8.32525 2.49076 8.47891 2.80205L9.93669 5.75536C9.98205 5.84726 10.0047 5.89321 10.0379 5.92889C10.0672 5.96048 10.1024 5.98607 10.1415 6.00425C10.1857 6.02479 10.2364 6.0322 10.3378 6.04702L13.5986 6.52364C13.942 6.57383 14.1137 6.59893 14.1932 6.6828C14.2623 6.75577 14.2948 6.85603 14.2817 6.95569C14.2665 7.07022 14.1422 7.19129 13.8936 7.43342L11.5349 9.73078C11.4614 9.8024 11.4247 9.83821 11.4009 9.88081C11.3799 9.91854 11.3665 9.95998 11.3613 10.0028C11.3554 10.0513 11.3641 10.1018 11.3814 10.203L11.938 13.4479C11.9967 13.7902 12.026 13.9613 11.9708 14.0628C11.9229 14.1512 11.8376 14.2132 11.7387 14.2315C11.6251 14.2525 11.4714 14.1717 11.1641 14.0101L8.2489 12.4771C8.15807 12.4293 8.11266 12.4054 8.06481 12.396C8.02245 12.3877 7.97888 12.3877 7.93651 12.396C7.88867 12.4054 7.84325 12.4293 7.75242 12.4771L4.83727 14.0101C4.52993 14.1717 4.37626 14.2525 4.26263 14.2315C4.16377 14.2132 4.07847 14.1512 4.03048 14.0628C3.97532 13.9613 4.00467 13.7902 4.06337 13.4479L4.61991 10.203C4.63726 10.1018 4.64593 10.0513 4.64006 10.0028C4.63487 9.95998 4.62139 9.91854 4.60039 9.88081C4.57667 9.83821 4.5399 9.8024 4.46637 9.73078L2.10769 7.43342C1.85909 7.19129 1.73479 7.07022 1.71967 6.95569C1.70651 6.85603 1.73902 6.75577 1.80815 6.6828C1.88761 6.59893 2.0593 6.57383 2.40268 6.52364L5.66353 6.04702C5.76493 6.0322 5.81564 6.02479 5.8598 6.00425C5.89889 5.98607 5.93409 5.96048 5.96344 5.92889C5.99659 5.89321 6.01927 5.84726 6.06463 5.75536L7.52242 2.80205Z" stroke="#FBAD38" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <button className="bg-[#1083E6] w-[42px] max-w-[42px] min-w-[42px] h-[42px] rounded-[50%] flex items-center justify-center">
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0007 5.50016L6.00065 9.50016M6.00065 5.50016L10.0007 9.50016M14.6673 7.50016C14.6673 11.1821 11.6826 14.1668 8.00065 14.1668C4.31875 14.1668 1.33398 11.1821 1.33398 7.50016C1.33398 3.81826 4.31875 0.833496 8.00065 0.833496C11.6826 0.833496 14.6673 3.81826 14.6673 7.50016Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[20px]">
                        Не упустите возможность окунуться в атмосферу приключений по самым выгодным ценам! Бронируйте свой тур прямо сейчас! Не упустите возможность окунуться в атмосферу приключений по самым выгодным ценам! Бронируйте свой тур прямо сейчас! Не упустите возможность
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-[5px]">
                <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#1083E6] hover:bg-[#1083E6] duration-200 bg-[#1083E6]"></button>
                <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#1083E6] hover:bg-[#1083E6] duration-200"></button>
                <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#1083E6] hover:bg-[#1083E6] duration-200"></button>
                <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#1083E6] hover:bg-[#1083E6] duration-200"></button>
                <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#1083E6] hover:bg-[#1083E6] duration-200"></button>
                <button className="w-[12px] h-[12px] rounded-[50%] border-[1px] border-solid border-[#1083E6] hover:bg-[#1083E6] duration-200"></button>
            </div>
        </div>
    )
}

function ChangePassword() {
    const [state, setState] = useState(false)
    return (
        <>
            {
                state
                &&
                <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] h-[100%] flex items-center justify-center bg-[#2121214D]" onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    let Event = e.target as HTMLButtonElement
                    if (!Event.closest("#deleteacountmodalid")) {
                        setState(false)
                    }
                }}>
                    <div className="bg-white rounded-[64px] py-[48px] px-[80px] max-w-[839px] w-[100%]" id="deleteacountmodalid">
                        <h6 className="text-[#212121] font-inter font-[700] text-[36px] leading-[36px] text-center mb-[16px]">Вы точно хотите удалить свой акаунт</h6>
                        <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[19px] opacity-[40%] text-center max-w-[64%] mx-auto mb-[44px]">Мы будем скучать по вам. Надеемся вы передумаете и обратитесь к нашему менеджеру за востанавлениями данных. </p>
                        <button className="text-white font-inter font-[400] text-[16px] leading-[22px] bg-[#EB5757] h-[54px] rounded-[32px] px-[167px] mx-auto flex items-center">Удалить</button>
                    </div>
                </div>
            }
            <div className="border border-solid border-[#1083E6] w-[100%] h-[100%] rounded-[64px] p-[40px] flex flex-col justify-between">
                <div>
                    <div className="mb-[20px]">
                        <p className="text-[#212121] font-inter font-[500] text-[16px] leading-[17px] mb-[20px]">Поменять пароль</p>
                        <div className="flex gap-[12px]">
                            <input type="text" className="w-[100%] h-[54px] border border-solid border-[#1083E6] rounded-[32px] outline-none px-[32px] text-[#212121] font-inter font-[400] text-[16px] leading-[22px]" />
                            <input type="text" className="w-[100%] h-[54px] border border-solid border-[#1083E6] rounded-[32px] outline-none px-[32px] text-[#212121] font-inter font-[400] text-[16px] leading-[22px]" />
                        </div>
                    </div>
                    <div className="mb-[20px]">
                        <p className="text-[#212121] font-inter font-[500] text-[16px] leading-[17px] mb-[20px]">Связывайте учетные записи</p>
                        <div className="flex gap-[12px]">
                            <div className="w-[100%] h-[54px] border border-solid border-[#1083E6] rounded-[32px] flex items-center justify-center gap-[10px] cursor-pointer bg-[#1083E633]">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_2302_14585)">
                                        <path d="M20 10.0026C20 9.2008 20.1474 8.94271 20 8.33594H10V11.6693H15.8333C15.7199 12.5686 14.6949 14.0925 13.3333 15.0026L16.6667 17.5026C18.5955 15.8014 20 12.9715 20 10.0026Z" fill="#4285F4" />
                                        <path d="M9.9987 19.9974C12.7469 19.9974 14.9802 19.0901 16.6654 17.4974L13.332 14.9974C12.4725 15.6091 11.5141 15.8307 9.9987 15.8307C7.30705 15.8307 4.97973 14.1687 4.16536 11.6641L0.832031 14.1641C2.50582 17.5574 6.01771 19.9974 9.9987 19.9974Z" fill="#34A853" />
                                        <path d="M4.16667 12.5026C3.96263 11.8707 4.16667 11.5355 4.16667 10.8359C4.16667 10.1363 3.97337 8.96782 4.16667 8.33594L0.833333 5.83594C0.178287 7.21257 0 9.1998 0 10.8359C0 12.4721 0.178287 13.626 0.833333 15.0026L4.16667 12.5026Z" fill="#FBBC05" />
                                        <path d="M9.9987 4.16667C11.9018 4.16667 13.4334 5.12922 14.1654 5.83333L16.6654 2.5C14.9087 0.826411 12.7351 0 9.9987 0C6.0347 0 2.49868 2.44 0.832031 5.83333L4.16536 8.33333C4.98751 5.82872 7.31853 4.16667 9.9987 4.16667Z" fill="#EB4335" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2302_14585">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px]">Отменить связь</p>
                            </div>
                            <div className="w-[100%] h-[54px] border border-solid border-[#1083E6] rounded-[32px] flex items-center justify-center gap-[10px] cursor-pointer">
                                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.41227 6.44815V7.59565H6.57227V8.99815H7.41227V13.1673H9.13893V8.99815H10.2973C10.2973 8.99815 10.4064 8.32565 10.4589 7.58982H9.1456V6.63148C9.1456 6.48732 9.33393 6.29482 9.5206 6.29482H10.4606V4.83398H9.18143C7.36977 4.83398 7.41227 6.23815 7.41227 6.44815Z" fill="#1083E6" />
                                    <path d="M3.49935 2.33366C3.05732 2.33366 2.6334 2.50925 2.32084 2.82181C2.00828 3.13437 1.83268 3.5583 1.83268 4.00033V14.0003C1.83268 14.4424 2.00828 14.8663 2.32084 15.1788C2.6334 15.4914 3.05732 15.667 3.49935 15.667H13.4993C13.9414 15.667 14.3653 15.4914 14.6779 15.1788C14.9904 14.8663 15.166 14.4424 15.166 14.0003V4.00033C15.166 3.5583 14.9904 3.13437 14.6779 2.82181C14.3653 2.50925 13.9414 2.33366 13.4993 2.33366H3.49935ZM3.49935 0.666992H13.4993C14.3834 0.666992 15.2312 1.01818 15.8564 1.6433C16.4815 2.26842 16.8327 3.11627 16.8327 4.00033V14.0003C16.8327 14.8844 16.4815 15.7322 15.8564 16.3573C15.2312 16.9825 14.3834 17.3337 13.4993 17.3337H3.49935C2.61529 17.3337 1.76745 16.9825 1.14233 16.3573C0.517205 15.7322 0.166016 14.8844 0.166016 14.0003V4.00033C0.166016 3.11627 0.517205 2.26842 1.14233 1.6433C1.76745 1.01818 2.61529 0.666992 3.49935 0.666992Z" fill="#1083E6" />
                                </svg>
                                <p className="text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px]">Связать с соцсетью</p>
                            </div>
                        </div>
                    </div>
                    <button className="text-[#EB5757] font-inter font-[400] text-[16px] leading-[22px] border border-solid border-[#EB5757] h-[62px] px-[64px] rounded-[40px]" onClick={() => setState(prev => !prev)}>Удалить акаунт</button>
                </div>
                <button className="text-white font-inter font-[400] text-[16px] leading-[22px] h-[62px] rounded-[40px] bg-[#1083E6] px-[64px] w-[max-content] ml-auto">Применить</button>
            </div>
        </>
    )
}

















function Loading({ className }: { className?: string }) {
    return (
        <div className={`fixed top-[20px] left-[50%] animate-loading_open_anim translate-x-[-50%] flex items-center justify-center bg-white max-w-[300px] w-[100%] h-[85px] rounded-[12px] p-[10px] border border-solid border-[gray] ${className}`}>
            <img src="/assets/img/loading.gif" className="h-[100%] brightness-[0.5]" />
            <p className="font-inter font-[400] text-[18px] leading-[22px]">Загрузка</p>
        </div>
    )
}

