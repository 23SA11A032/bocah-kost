"use client";

import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { getKost } from "@/lib/utils";
import { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import Back from "@/components/Back";

export default function Kosts({ params: { id } }) {
    const [kos, setKos] = useState({});

    useEffect(() => {
        getKost(Number(id)).then((res) => {
            res.fotoRumah = JSON.parse(res.fotoRumah);
            res.alamat = JSON.parse(res.alamat);
            setKos(res);
        });
    }, []);

    return (
        <>
            <div className="flex flex-col min-h-screen container mx-auto">
                <Header>
                    <Back />
                </Header>
                <div className="w-full pt-3">
                    <Swiper pagination={true} modules={[Pagination]}>
                        {kos.fotoRumah &&
                            kos.fotoRumah.map((v, i) => {
                                return (
                                    <SwiperSlide key={i}>
                                        <div className="flex justify-center items-center h-56 md:h-60 lg:h-64 xl:h-96">
                                            <img src={v} alt="" className="object-fill rounded-lg" />
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                    </Swiper>
                </div>
                <div className="pt-2">
                    <p className="text-xl font-bold">{kos?.nama}</p>
                </div>
                <pre>{JSON.stringify(kos, null, 4)}</pre>
            </div>
        </>
    );
}
