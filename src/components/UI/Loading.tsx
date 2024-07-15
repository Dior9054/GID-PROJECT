
export default function Loading({ className }: { className?: string }) {
    return (
        <div className={`fixed top-[20px] left-[50%] animate-loading_open_anim translate-x-[-50%] flex items-center justify-center bg-white max-w-[300px] w-[100%] h-[85px] rounded-[12px] p-[10px] border border-solid border-[gray] ${className}`}>
            <img src="/assets/img/loading.gif" className="h-[100%] brightness-[0.5]" />
            <p className="font-inter font-[400] text-[18px] leading-[22px]">Загрузка</p>
        </div>
    )
}