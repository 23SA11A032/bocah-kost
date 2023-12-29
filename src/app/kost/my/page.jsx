"use client";

import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { getCheckout, getKost, getUser } from "@/lib/utils";
import { Button, Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

export default function My() {
    const [kost, setKost] = useState({});
    const [ck, setCk] = useState({});
    const [loading, setLoading] = useState();

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                var user = await getUser();
                var ck = await getCheckout(user?.id);
                setCk({ ...ck });
                var kost = await getKost(ck?.kostId);
                setKost({ ...kost });
                console.log(kost);
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <>
            <div className="flex flex-col w-screen min-h-screen">
                <div className="container mx-auto w-full">
                    <Header />
                </div>
                <p className="text-lg font-bold px-3 pt-2 md:p-1 container mx-auto">Kost List</p>
                {loading ? (
                    <div className="p-2 md:p-0 container mx-auto">
                        <Card>
                            <div className="flex flex-row items-center gap-3 self-center">
                                <Spinner />
                                <p>Mengambil data...</p>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 h-full w-full p-2 gap-2 md:p-0 container mx-auto">
                            <Card className="">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-row items-start gap-4">
                                        <img src={kost?.fotoRumah?.[0]} alt="" className="w-24 h-24 shrink-0 rounded-lg shadow-lg" />
                                        <div className="flex flex-col">
                                            <p className="text-lg font-bold line-clamp-1">{kost?.nama}</p>
                                            <p className="text-sm italic line-clamp-3">{kost?.deskripsi}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center justify-between gap-3">
                                        <p className="italic overflow-auto text-nowrap pr-2">{ck?.isDone ? "Kost sudah dibayar" : "Kost belum dibayar"}</p>
                                        {/* {!ck?.isDone && (
                                            <Button className="shrink-0" size={"sm"}>
                                                Keluar dari kost
                                            </Button>
                                        )} */}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </>
                )}

                <div className="flex-1"></div>
                <Navigation />
            </div>
        </>
    );
}
