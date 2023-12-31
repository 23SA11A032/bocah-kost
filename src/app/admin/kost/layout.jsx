"use client";

import Header from "@/components/Header";
import { Button, Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { BiBuoy } from "react-icons/bi";
import { HiArrowCircleLeft, HiArrowSmRight, HiChartPie, HiCog, HiInbox, HiOutlineShoppingCart, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { getUser } from "@/lib/utils";
import { GrDocumentVerified } from "react-icons/gr";

export default function Kos({ children }) {
    const [open, setOpen] = useState(false);
    const path = usePathname();
    const router = useRouter();

    return (
        <>
            <div className="flex flex-col min-h-screen w-screen">
                <Header>
                    <button className="sm:hidden rounded-lg" onClick={() => setOpen((op) => !op)}>
                        {open ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 duration-500 rotate-90">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 duration-500 rotate-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                                </svg>
                            </>
                        )}
                    </button>
                </Header>
                <div className="flex flex-row flex-1">
                    <div className="relative">
                        <Sidebar
                            className={`absolute ${!open && "-translate-x-full"} sm:translate-x-0 duration-500 overflow-auto sm:static z-10 border-gray-200 dark:border-gray-600 rounded-r-lg border-r`}
                            onClick={() => setOpen(false)}
                        >
                            <Sidebar.Items>
                                <Sidebar.ItemGroup>
                                    <Sidebar.Item className={path == "/admin/kost" && "bg-gray-100 dark:bg-gray-700"} as={Link} href={"/admin/kost"} icon={HiChartPie}>
                                        Dashboard
                                    </Sidebar.Item>
                                    <Sidebar.Item className={path == "/admin/kost/pengaturan" && "bg-gray-100 dark:bg-gray-700"} as={Link} href={"/admin/kost/pengaturan"} icon={HiCog}>
                                        Pengaturan Kost
                                    </Sidebar.Item>
                                    <Sidebar.Item
                                        className={path == "/admin/kost/pengaturan-verifikasi-kost" && "bg-gray-100 dark:bg-gray-700"}
                                        as={Link}
                                        href={"/admin/kost/pengaturan-verifikasi-kost"}
                                        icon={GrDocumentVerified}
                                    >
                                        Verifikasi Kost
                                    </Sidebar.Item>
                                </Sidebar.ItemGroup>
                                <Sidebar.ItemGroup>
                                    <Sidebar.Item icon={HiArrowCircleLeft} as={Link} href={"/"}>
                                        Keluar
                                    </Sidebar.Item>
                                </Sidebar.ItemGroup>
                            </Sidebar.Items>
                        </Sidebar>
                    </div>

                    <div className="flex-1 w-full">{children}</div>
                </div>
            </div>
        </>
    );
}
