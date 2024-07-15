
export default function OwnRoom() {
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
