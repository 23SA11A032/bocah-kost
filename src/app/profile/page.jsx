"use client"

import Navigation from "@/components/Navigation";
import { getUser } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState({});

    useEffect(() => {
        var id = localStorage.getItem("user")
        if (!id) return
        id = JSON.parse(id).id
        getUser(id).then((res) => setUser({ ...res }));
    }, []);

    return (
        <div className="min-h-screen flex flex-col container mx-auto items-center py-24">
            <div className="w-28 h-28">
                <img src="https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg" className="rounded-full" alt="" />
            </div>
            <div className="text-lg font-semibold pt-2">
                <p>{user.nama}</p>
            </div>
            <div className="text-xs p-1 border rounded-md">
                <p>{user.role == "kos" ? "Pemilik Kos" : "User Biasa"}</p>
            </div>
            <Navigation />
        </div>
    )
}
