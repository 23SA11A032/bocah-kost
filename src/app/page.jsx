"use client";

import Carausel from "@/components/Carousel";
import { getKosts } from "@/lib/utils";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Badge, Rating, RatingStar } from "flowbite-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const { parse } = JSON;

export default function Home() {
    var images = [
        "https://static.mamikos.com/uploads/cache/data/event/2023-10-26/yz5WBfq1-540x720.jpg",
        "https://static.mamikos.com/uploads/cache/data/event/2023-11-14/lpSj9r0O-540x720.jpg",
        "https://static.mamikos.com/uploads/cache/data/event/2023-05-30/vP4HjDLB-540x720.jpg",
        "https://static.mamikos.com/uploads/cache/data/event/2023-07-04/VmQFAmbE-540x720.jpg",
        "https://static.mamikos.com/uploads/cache/data/event/2023-08-02/otjkenCs-540x720.jpg",
        "https://static.mamikos.com/uploads/cache/data/event/2022-03-25/VTcV35Br-540x720.jpg",
        "https://static.mamikos.com/uploads/cache/data/event/2023-05-16/hkqFTkBN-540x720.jpg",
    ];

    return (
        <div className="container mx-auto flex flex-col">
            <Header />
            <Carausel images={images} />
            <Content />
            <Navigation />
        </div>
    );
}

function Content() {
    const [kos, setKos] = useState([]);

    useEffect(() => {
        getKosts().then((res) => setKos([...res]));
    }, []);

    return (
        <div className="px-3 mb-20">
            <p className="text-xl font-semibold mb-4">Putra</p>
            <div className="overflow-auto">
                <div className="grid grid-flow-col gap-4">
                    {kos.map((v, i) => {
                        if (!parse(v.fotoRumah)?.[0]) return;
                        if (v.jenisKost == "putri") return;
                        return (
                            <Link key={i} href={"/kost/" + v.id}>
                                <div className="flex flex-col rounded-lg w-48 border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
                                    <img className="rounded-lg h-[6.75rem] object-cover border border-gray-200 dark:border-gray-700" src={parse(v.fotoRumah)[0]} alt="" />
                                    <div className="flex flex-col p-3">
                                        <div className="flex flex-row pt-1">
                                            <Badge size="xs" color={v.jenisKost == "putra" ? "info" : "indigo"}>
                                                {v.jenisKost}
                                            </Badge>
                                            <Badge size="xs" className="ml-1" color={v.jenisKost == "putra" ? "info" : "indigo"}>
                                                {"Tersedia: " + parse(v.totalKamar).total}
                                            </Badge>
                                        </div>
                                        <p className="text-md line-clamp-2 font-semibold mt-1 truncate">{v.nama}</p>
                                        <p className="text-xs line-clamp-2">
                                            {parse(v.fasilitas)
                                                .filter((v) => v.status == true)
                                                .map((v, i) => v.name)
                                                .join(", ")}
                                        </p>
                                        <div className="mt-1">
                                            <Rating>
                                                <RatingStar />
                                                <RatingStar />
                                                <RatingStar />
                                                <RatingStar />
                                                <RatingStar filled={false} />
                                            </Rating>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <p className="text-xl font-semibold pt-4 mb-4">Putri</p>
            <div className="overflow-auto">
                <div className="flex flex-row gap-3 min-w-max">
                    {kos.map((v, i) => {
                        if (!parse(v.fotoRumah)?.[0]) return;
                        if (v.jenisKost == "putra") return;
                        return (
                            <Link key={i} href={"/kost/" + v.id}>
                                <div className="flex flex-col rounded-lg w-48 border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
                                    <img className="rounded-lg h-[6.75rem] object-cover border border-gray-200 dark:border-gray-700" src={parse(v.fotoRumah)[0]} alt="" />
                                    <div className="flex flex-col p-3">
                                        <div className="flex flex-row pt-1">
                                            <Badge size="xs" color={v.jenisKost == "putra" ? "info" : "indigo"}>
                                                {v.jenisKost}
                                            </Badge>
                                            <Badge size="xs" className="ml-1" color={v.jenisKost == "putra" ? "info" : "indigo"}>
                                                {"Tersedia: " + parse(v.totalKamar).total}
                                            </Badge>
                                        </div>
                                        <p className="text-md line-clamp-1 font-semibold mt-1 truncate">{v.nama}</p>
                                        <p className="text-xs line-clamp-2">
                                            {parse(v.fasilitas)
                                                .filter((v) => v.status == true)
                                                .map((v, i) => v.name)
                                                .join(", ")}
                                        </p>
                                        <div className="mt-1">
                                            <Rating>
                                                <RatingStar />
                                                <RatingStar />
                                                <RatingStar />
                                                <RatingStar />
                                                <RatingStar filled={false} />
                                            </Rating>
                                        </div>
                                        <p className="text-[0.60rem] mt-1 text-right">{parse(v.alamat).kabupaten}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
