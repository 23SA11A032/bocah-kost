"use client";

import { getAdmin, updateAdmin } from "@/lib/utils";
import axios from "axios";
import { Button, Card, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiXCircle } from "react-icons/hi";

export default function Kos() {
    const [data, setData] = useState({
        banner: [],
        logo: "",
    });

    useEffect(() => {
        getAdmin().then((r) => setData({ ...r }));
    }, []);

    const update = async () => {
        await updateAdmin({ ...data });
    };

    return (
        <>
            <div className="flex flex-col p-4 m-4 h-full rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-2xl font-bold">Pengaturan Panel</p>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="file-upload" className="pl-2">
                        1. Logo
                    </Label>
                    <label htmlFor="poto2" className="w-24 h-24">
                        <input
                            type="file"
                            id="poto2"
                            className="hidden"
                            onChange={async (e) => {
                                var file = e.target.files[0];
                                var res = await imgToUrl(file, (hook) =>
                                    setData((p) => {
                                        p.logo = hook;
                                        return { ...p };
                                    })
                                );
                                setData((p) => {
                                    p.logo = res;
                                    return { ...p };
                                });
                            }}
                        />
                        {!data.logo && (
                            <div className="w-24 h-24 border border-dashed rounded-lg flex justify-center items-center">
                                <p className="font-semibold text-xl">+</p>
                            </div>
                        )}
                        {Number(data.logo) ? (
                            <div className="w-24 h-24 border border-dashed rounded-lg flex justify-center items-center">
                                <p className="font-semibold text-xl">{data.logo} %</p>
                            </div>
                        ) : (
                            <img src={data.logo} className="rounded-lg border" alt="" />
                        )}
                    </label>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="file-upload" className="pl-2">
                        2. Banner
                    </Label>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="flex flex-row flex-wrap gap-3">
                            {data.banner.map((v, i) => {
                                if (Number(v)) return;
                                return (
                                    <div className="relative w-24 h-24" key={i}>
                                        <HiXCircle
                                            className="absolute -top-[5px] -right-[5px] fill-red-500 bg-white rounded-full cursor-pointer"
                                            size={"22px"}
                                            onClick={() =>
                                                setData((d) => {
                                                    d.banner.splice(i, 1);
                                                    return { ...d };
                                                })
                                            }
                                        />
                                        <img src={v} className="border rounded-lg object-cover w-24 h-24" alt="" />
                                    </div>
                                );
                            })}
                            {Number(data.banner[data.banner.length - 1]) ? (
                                <>
                                    <label className="w-24 h-24 border border-dashed rounded-lg flex justify-center items-center">
                                        <p className="font-semibold text-sm">{data.banner[data.banner.length - 1] + " %"}</p>
                                        <input type="file" name="myfile" className="hidden" />
                                    </label>
                                </>
                            ) : (
                                <>
                                    <label className="w-24 h-24 border border-dashed rounded-lg flex justify-center items-center">
                                        <p className="font-semibold text-xl">+</p>
                                        <input
                                            type="file"
                                            name="myfile"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={async (e) => {
                                                let file = e.target.files[0];
                                                let len = data.banner.length;
                                                let res = await imgToUrl(file, (res) => {
                                                    setData((p) => {
                                                        p.banner[len] = res;
                                                        return { ...p };
                                                    });
                                                });
                                                setData((p) => {
                                                    p.banner[len] = res;
                                                    return { ...p };
                                                });
                                            }}
                                        />
                                    </label>
                                </>
                            )}
                        </div>
                    </Card>
                </div>
                <div className="pt-4">
                    <Button onClick={update}>update</Button>
                </div>
            </div>
        </>
    );
}

async function imgToUrl(file, cb) {
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
                cb(percentCompleted);
            },
        });

        return url;
    } catch {
        return null;
    }
}
