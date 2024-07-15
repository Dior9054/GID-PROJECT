
import { useState } from "react"

export default function ChangePassword() {
    const [state, setState] = useState(false)

    return (
        <>
            {
                state
                &&
                <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] h-[100%] flex items-center justify-center bg-[#2121214D]"
                    onClick={(e: any) => {
                        if (!e.target.closest("#deleteacountmodalid")) {
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
