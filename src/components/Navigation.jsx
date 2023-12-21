"use client";

import { ImHome } from "react-icons/im";
import { CgList, CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { FaGear } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navigation() {
    const [isKos, setIsKos] = useState(false);
    const path = usePathname();

    useEffect(() => {
        var user = localStorage.getItem("user");
        if (user) {
            user = JSON.parse(user);
            if (user.role == "kos") {
                setIsKos(true);
            }
        }
    }, []);

    return (
        <>
            <div className="fixed bottom-0 p-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-t container mx-auto border-gray-200 dark:border-gray-700 flex items-center justify-between rounded-lg">
                <div className="flex flex-row justify-between items-center container mx-auto lg:px-28 xl:px-56">
                    <Link href={'/'} className={`${path == "/" && "bg-gray-400/50"} p-3 px-6 rounded-lg`}>
                        <ImHome size={22} />
                    </Link>

                    <Link href={'/list'} className={`${path == "/list" && "bg-gray-400/50"} p-3 px-6 rounded-lg`}>
                        <CgList size={22} />
                    </Link>

                    <Link href={'/kos'} className={`${path.startsWith("/kos") && "bg-gray-400/50"} p-3 px-6 rounded-lg ${!isKos && "hidden"}`}>
                        <FaGear size={22} />
                    </Link>

                    <Link href={'/profile'} className={`${path == "/profile" && "bg-gray-400/50"} p-3 px-6 rounded-lg`}>
                        <CgProfile size={22} />
                    </Link>
                </div>
            </div>
        </>
    );
}
