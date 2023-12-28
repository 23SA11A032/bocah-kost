"use client";

import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { getUser, updateUser } from "@/lib/utils";
import axios from "axios";
import { ListGroup } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineAdjustments, HiPencil } from "react-icons/hi";
import { TiHomeOutline } from "react-icons/ti";

export default function Profile(req) {
    const [user, setUser] = useState({});
    const [percent, setPercent] = useState(0);
    const router = useRouter();

    useEffect(() => {
        getUser().then((res) => {
            res && setUser(res);
        });
    }, []);

    const handleFile = async (e) => {
        let file = e.target.files[0];
        var res = await imgToUrl(file, setPercent);
        if (res) {
            await updateUser(user.id, { image: res });
            setUser((p) => ({ ...p, image: res }));
        }
        setPercent(0);
    };

    return (
        <div className="container mx-auto min-h-screen flex flex-col">
            <Header />
            {!user?.nama ? (
                <div className="flex justify-center items-center flex-1">
                    <p className="text-2xl font-semibold">Kamu Belum Login!</p>
                </div>
            ) : (
                <div className="flex flex-col items-center py-24">
                    <label className="w-36 h-36 relative border rounded-full flex justify-center items-center" htmlFor="poto">
                        {percent !== 0 && <p className="font-semibold">{percent}%</p>}
                        {percent === 0 && <img src={user?.image || "https://pbs.twimg.com/profile_images/1675221784847687689/le-nIcDw_400x400.jpg"} className="rounded-full object-cover" alt="" />}
                        <input type="file" id="poto" className="absolute hidden" onChange={handleFile} />
                        <HiPencil className="absolute -right-1 -bottom-1" size={24} />
                    </label>
                    <div className="text-lg font-semibold pt-2">
                        <p>{user.nama}</p>
                    </div>
                    <div className="text-xs p-1 border rounded-md mb-7">
                        <p>{user.role == "kos" ? "Pemilik Kos" : user.role == "admin" ? "Admin" : "User Biasa"}</p>
                    </div>
                    <div className="w-full max-w-sm md:max-w-md mx-auto">
                        <ListGroup className="">
                            <ListGroup.Item icon={() => <TiHomeOutline size={32} className="fill-gray-400 dark:fill-gray-400" />} onClick={() => router.push("/kost/my")}>
                                <p className="text-lg p-1 px-2 text-gray-500 dark:text-gray-400">My Kost</p>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>
            )}
            <div className={`flex-1`}></div>
            <Navigation />
        </div>
    );
}

/**
 * @param {import("react").SetStateAction} setHook
 */
async function imgToUrl(file, setHook) {
    if (!file) return;
    let formData = new FormData();
    formData.append("key", "bd3113d71ae0bb1bc328b3a5a0d021fc");
    formData.append("image", file);

    try {
        var {
            data: {
                data: { url },
            },
        } = await axios.post("https://api.imgbb.com/1/upload", formData, {
            onUploadProgress: (progressEvent) => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setHook(percentCompleted);
            },
        });

        return url;
    } catch {
        return null;
    }
}
