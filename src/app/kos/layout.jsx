'use client';

import Header from "@/components/Header";
import { Button, Sidebar } from "flowbite-react";
import { useState } from "react";
import { BiBuoy } from 'react-icons/bi';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import {usePathname} from 'next/navigation'

export default function Kos({ children }) {
    const [open, setOpen] = useState(false);
    const path = usePathname()

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header>
                    <button className="lg:hidden rounded-lg" onClick={() => setOpen(op => !op)}>
                        {open ? (<>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 duration-500 rotate-90">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </>) : (<>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 duration-500 rotate-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                            </svg>
                        </>)}
                    </button>
                </Header>
                <div className="flex flex-row flex-1">
                    <div className="relative">
                        <Sidebar className={`absolute ${!open && '-translate-x-full'} lg:translate-x-0 duration-500 overflow-auto sm:static`}>
                            <Sidebar.Items>
                                <Sidebar.ItemGroup>
                                    <Sidebar.Item icon={HiChartPie}>
                                        Dashboard
                                    </Sidebar.Item>
                                    <Sidebar.Item icon={HiViewBoards}>
                                        Kanban
                                    </Sidebar.Item>
                                    <Sidebar.Item icon={HiInbox}>
                                        Inbox
                                    </Sidebar.Item>
                                    <Sidebar.Item icon={HiUser}>
                                        Users
                                    </Sidebar.Item>
                                    <Sidebar.Item icon={HiShoppingBag}>
                                        Products
                                    </Sidebar.Item>
                                    <Sidebar.Item icon={HiArrowSmRight}>
                                        Sign In
                                    </Sidebar.Item>
                                    <Sidebar.Item icon={HiTable}>
                                        Sign Up
                                    </Sidebar.Item>
                                </Sidebar.ItemGroup>
                                <Sidebar.ItemGroup>
                                    <Sidebar.Item icon={HiChartPie}>
                                        Upgrade to Pro
                                    </Sidebar.Item>
                                    <Sidebar.Item icon={HiViewBoards}>
                                        Documentation
                                    </Sidebar.Item>
                                    <Sidebar.Item icon={BiBuoy}>
                                        Help
                                    </Sidebar.Item>
                                </Sidebar.ItemGroup>
                            </Sidebar.Items>
                        </Sidebar>
                    </div>

                    <div className="flex-1">
                        {children}
                    </div>
                </div>

            </div>
        </>
    );
}