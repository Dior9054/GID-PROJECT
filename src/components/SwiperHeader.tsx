
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react"
import { useIntl } from "react-intl";
import 'swiper/css';
import 'swiper/css/pagination';

export default function SwiperHeader() {
    const $intel: any = useIntl().messages

    return (
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
                    <div className="swiper-pagination flex items-center !w-[max-content] !right-0 !left-auto !top-[50%] !translate-y-[-50%] !h-[100%] [&>.swiper-pagination-bullet]:w-[12px] [&>.swiper-pagination-bullet]:h-[12px] [&>.swiper-pagination-bullet]:rounded-[50%] [&>.swiper-pagination-bullet]:border-[1px] [&>.swiper-pagination-bullet]:border-solid [&>.swiper-pagination-bullet]:border-[#FFFFFF] [&>.swiper-pagination-bullet]:bg-[transparent] [&>.swiper-pagination-bullet]:opacity-[100%] [&>.swiper-pagination-bullet-active]:!bg-[#FFFFFF] [&>.swiper-pagination-bullet]:bg-[red]"></div>
                </div>
            </div>
        </div>
    )
}
