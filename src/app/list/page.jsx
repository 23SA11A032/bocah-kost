"use client";

import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { getKosts } from "@/lib/utils";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";

export default function List() {
    const [kost, setKost] = useState([]);

    useEffect(() => {
        getKosts().then((r) => {
            setKost([...r]);
        });
    }, []);

    return (
        <>
            <div className="container mx-auto min-h-screen flex flex-col">
                <Header />

                <div className="grid grid-cols-1 md:lg:xl:2xl:grid-cols-2 p-4 gap-4">
                    {kost.map((v, i) => {
                        return (
                            <div key={i} className="flex flex-row items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 h-32">
                                <div className="shrink-0">
                                    <img src={v.fotoRumah[0]} alt="" className="rounded-lg object-cover w-32 h-32" />
                                </div>
                                <div className="flex flex-col self-start py-3">
                                    <p className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{v.nama}</p>
                                    <p className="font-normal text-gray-700 dark:text-gray-400"></p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={`flex-1`}></div>
                <Navigation />
            </div>
        </>
    );
}
