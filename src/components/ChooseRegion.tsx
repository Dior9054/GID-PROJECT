
export default function ChooseRegion({ changeComp }: { changeComp: any }) {
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
                    changeComp(2)
                }}>
                    <button className="text-white font-inter font-[400] text-[16px] leading-[22px] relative z-[9] opacity-[0%] group-hover:opacity-[100%] duration-200 bg-[#1083E6] h-[48px] px-[24px] rounded-[24px]">Узбекистан</button>
                </div>
                <div className="bg-[url(/assets/img/bishkek.jpg)] relative bg-cover bg-center flex items-center group justify-center w-[50%] h-[300px] rounded-[32px] before:content-[''] before:w-[100%] before:h-[100%] before:absolute before:top-0 before:left-0 hover:before:bg-[#1083E666] before:bg-[transparent] before:duration-200 duration-200 cursor-pointer overflow-hidden" onClick={() => {
                    localStorage.setItem("country", "Кыргызстан")
                    changeComp(2)
                }}>
                    <button className="text-white font-inter font-[400] text-[16px] leading-[22px] relative z-[9] opacity-[0%] group-hover:opacity-[100%] duration-200 bg-[#1083E6] h-[48px] px-[24px] rounded-[24px]">Кыргызстан</button>
                </div>
            </div>
        </div>
    )
}
