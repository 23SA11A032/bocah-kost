"use client";

import Header from "@/components/Header";
import Navigate from "@/components/Navigation";
import { checkout, getCheckout, getKost, getUser } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Back from "@/components/Back";
import { Badge, Button, Card } from "flowbite-react";
import db from "@/lib/db";
import { useRouter } from "next/navigation";

export default function Kosts({ params: { id } }) {
    const [kost, setKost] = useState({});
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    useEffect(() => {
        getKost(Number(id)).then((res) => {
            setKost({ ...res });
        });
    }, []);

    return (
        <>
            <div className="flex flex-col min-h-screen container mx-auto w-screen">
                <Header>
                    <Back />
                </Header>
                <div className="flex flex-col md:flex-row h-full w-full pt-3 px-1 md:px-0">
                    <div className="h-full w-full md:w-[60%]">
                        <Swiper
                            style={{
                                "--swiper-navigation-color": "#fff",
                                "--swiper-pagination-color": "#fff",
                            }}
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="h-full w-full aspect-video"
                        >
                            {[...(kost?.fotoRumah || []), ...(kost?.fotoKamar || []), ...(kost?.fotoFasilitas || []), ...(kost?.fotoKamarMandi || [])]
                                ?.filter((v) => v)
                                ?.map((v, i) => {
                                    return (
                                        <SwiperSlide key={i} className="h-full w-full">
                                            <img src={v} className="aspect-video object-cover rounded-lg" />
                                        </SwiperSlide>
                                    );
                                })}
                        </Swiper>

                        <div className="h-full w-full pt-3">
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop={true}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="h-full w-full"
                            >
                                {[...(kost?.fotoRumah || []), ...(kost?.fotoKamar || []), ...(kost?.fotoFasilitas || []), ...(kost?.fotoKamarMandi || [])]
                                    ?.filter((v) => v)
                                    ?.map((v, i) => {
                                        return (
                                            <SwiperSlide key={i} className="h-full w-full">
                                                <img src={v} className="aspect-video object-cover rounded-lg" />
                                            </SwiperSlide>
                                        );
                                    })}
                            </Swiper>
                        </div>
                    </div>
                    {/*  */}
                    <div className="shrink-0 h-full md:w-[40%] hidden md:block pl-3">
                        <InfoKost kost={kost} />
                    </div>
                </div>
                {/* <pre>{JSON.stringify(kost, null, 4)}</pre> */}

                <div className="pt-3 px-1 md:px-0">
                    <p className="dark:text-white text-2xl md:text-3xl font-bold px-4 pb-2 line-clamp-2 md:px-0">{kost?.nama}</p>
                    <p className="italic line-clamp-2 text-sm px-4 pb-2 md:px-0">{kost?.fasilitas?.map((v) => v.name).join(", ")}</p>
                    <p className="text-2xl font-bold px-4 pb-2 md:px-0">{formatRupiah(kost?.harga?.bulan, true)}</p>
                </div>
                {/* desc */}
                <div className="px-1 md:px-0 w-full pt-3">
                    <Card>
                        <div className="flex flex-col gap-2">
                            <p className="text-lg font-bold">DESKRIPSI</p>
                            <p className="">{kost?.deskripsi}</p>
                        </div>
                    </Card>
                </div>
                {/* FASILITAS */}
                <div className="px-1 md:px-0 w-full pt-3">
                    <Card>
                        <div className="flex flex-col gap-2">
                            <p className="text-lg font-bold">FASILITAS</p>
                            <div className="grid grid-flow-row">
                                {kost?.fasilitas?.map((v, i) => {
                                    if (v?.status !== true) return;
                                    return <p key={i}>- {v.name}</p>;
                                })}
                            </div>
                        </div>
                    </Card>
                </div>
                {/* PERATURAN */}
                <div className="px-1 md:px-0 w-full pt-3">
                    <Card>
                        <div className="flex flex-col gap-2">
                            <p className="text-lg font-bold">PERATURAN</p>
                            <div className="grid grid-flow-row">
                                {kost?.peraturan?.map((v, i) => {
                                    if (v?.status !== true) return;
                                    return <p key={i}>- {v.name}</p>;
                                })}
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="h-full md:hidden pt-3">
                    <div className="w-full h-full ">
                        <InfoKost kost={kost} />
                    </div>
                </div>
                <div className="h-[12px]"></div>
                <Navigate />
            </div>
        </>
    );
}

/**
 *
 * @param {import("@prisma/client").Kos} param0
 * @returns
 */
function InfoKost({ kost }) {
    const router = useRouter();
    const [ck, setCk] = useState(false);

    const pesan = async () => {
        try {
            var user = await getUser();
            if (user?.role == "admin" || user?.role == "kost") {
                alert("Role " + user?.role + " tidak boleh mengambil kost");
            }
            await checkout(user.id, kost.id);
            router.push("/kost/my");
        } catch (error) {
            console.log(error.message);
            return error;
        }
    };

    useEffect(() => {
        (async () => {
            var user = await getUser();
            var res = await getCheckout(user.id);
            if (res) {
                setCk(true);
                return;
            }
        })();
    }, []);

    return (
        <div className="w-full h-full px-1 md:px-0 rounded-lg">
            <div className="dark:bg-gray-700 rounded-lg border bg-slate-50 border-slate-50 dark:border-gray-600">
                <div className="p-3 bg-slate-100 dark:bg-gray-600 rounded-t-lg">
                    <p className="font-semibold text-xl dark:text-white">INFO KOST</p>
                </div>
                <div className="p-4 flex flex-col rounded-b-lg">
                    <div className="flex flex-row items-center gap-4">
                        <Badge color="info" size="sm" className="w-fit uppercase">{`${kost?.jenisKost}`}</Badge>
                        <Badge color="info" size="sm" className="w-fit uppercase">{`Kamar tersisa: ${kost?.totalKamar?.tersedia}`}</Badge>
                    </div>
                    <div className="flex flex-col pt-2">
                        <p className="text-lg font-semibold">Alamat</p>
                        <p className="pl-1 dark:text-white text-sm">
                            {kost?.alamat?.kabupaten?.replace("KABUPATEN ", "")}, {kost?.alamat?.kecamatan}, {kost?.alamat?.kelurahan}
                        </p>
                    </div>
                    <div className="flex flex-col pt-2">
                        <p className="text-lg font-semibold">Maps</p>
                        <p className="pl-1 dark:text-white text-sm">
                            <a href={kost?.alamat?.linkGMap} target="_blank" className="text-sky-500 hover:underline">
                                Link Google Maps
                            </a>
                        </p>
                    </div>
                    <div className="h-32"></div>
                    <div className="self-end">
                        {!ck && <Button onClick={pesan}>PESAN SEKARANG</Button>}
                        {ck && <Button onClick={() => router.push("/kost/my")}>MY KOST</Button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

function formatRupiah(angka, prefix) {
    if (!angka) return undefined;
    var number_string = angka.replace(/[^,\d]/g, "").toString(),
        split = number_string.split(","),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // Combine all parts to create the final result
    if (ribuan) {
        var separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
}
