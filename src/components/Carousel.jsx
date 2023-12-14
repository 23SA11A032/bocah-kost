"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

export default function Carausel({ images }) {
    return (
        <>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                loop={true}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[Autoplay, EffectCoverflow, Pagination]}
                className="w-full my-4"
            >
                {[...images].map((v, i) => {
                    return (
                        <SwiperSlide key={i} className="bg-center bg-cover max-w-sm w-full lg:max-w-lg xl:max-w-xl">
                            <img src={v} className="block w-full rounded-lg" />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}
