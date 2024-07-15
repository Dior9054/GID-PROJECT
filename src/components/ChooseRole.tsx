
export default function ChooseRole({ changeComp }: { changeComp: any }) {
    return (
        <div className="flex flex-col items-center">
            <h3 className="mt-[44px] text-[#212121] font-inter font-[700] text-[36px] leading-[39px] mb-[16px]">Добро пожаловать</h3>
            <p className="text-[#212121] font-inter font-[400] text-[16px] leading-[20px] opacity-[60%] max-w-[70%] text-center mb-[28px]">Продолжить с Google или введите данные для входа</p>
            <div className="w-[100%] flex justify-between gap-[8px]">
                <div className="bg-[url(/assets/img/clim_to_mountain.jpg)] relative bg-cover bg-center flex items-center group justify-center w-[50%] h-[200px] rounded-[32px] before:content-[''] before:w-[100%] before:h-[100%] before:absolute before:top-0 before:left-0 hover:before:bg-[#1083E6CC] before:bg-[transparent] before:duration-200 duration-200 cursor-pointer overflow-hidden" onClick={() => {
                    changeComp(3)
                }}>
                    <p className="text-white font-inter font-[400] text-[16px] leading-[22px] relative z-[9] opacity-[0%] group-hover:opacity-[100%] duration-200">Пользователь</p>
                </div>
                <div className="bg-[url(/assets/img/block_4.jpg)] relative bg-cover bg-center flex items-center group justify-center w-[50%] h-[200px] rounded-[32px] before:content-[''] before:w-[100%] before:h-[100%] before:absolute before:top-0 before:left-0 hover:before:bg-[#1083E6CC] before:bg-[transparent] before:duration-200 duration-200 cursor-pointer overflow-hidden" onClick={() => {
                    changeComp(4)
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
                <button type="button" className="w-[100%] text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] flex items-center gap-[10px] justify-center border border-solid border-[#1083E6] bg-[var(--blue-20,_#1083E633)] rounded-[32px] h-[54px]">
                    <img src="/assets/svg/google.svg" />
                    Google
                </button>
                <button type="button" className="w-[100%] text-[#1083E6] font-inter font-[400] text-[16px] leading-[19px] flex items-center gap-[10px] justify-center border border-solid border-[#1083E6] rounded-[32px] h-[54px]">
                    <img src="/assets/svg/facebook.svg" />
                    Facebook
                </button>
            </div>
        </div>
    )
}
