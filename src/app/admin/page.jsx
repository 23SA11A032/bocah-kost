"use client";

import { getinfo } from "@/lib/utils";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";

export default function Kos() {
    const [info, setInfo] = useState({});

    useEffect(() => {
        var interval = setInterval(() => {
            getinfo().then((res) => {
                return setInfo({ ...res });
            });
        }, 1_000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="flex flex-col p-4 m-4 h-full rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 gap-2 items-stretch">
                    <Card className="w-full h-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="flex flex-col align-top">
                            <p className="font-semibold text-lg">CPU</p>
                            <p className="text-3xl font-bold">{info?.cpu?.usage} %</p>
                            <p className="truncate">{info?.cpu?.model}</p>
                        </div>
                    </Card>
                    <Card className="w-full h-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="flex flex-col align-top">
                            <p className="font-semibold text-lg">MEMORY USAGE</p>
                            <p className="text-3xl font-bold">
                                {info?.mem?.used?.usedMemMb} MB ({info?.mem?.info?.usedMemPercentage} %)
                            </p>
                            <p>Total memory: {info?.mem?.used?.totalMemMb} MB</p>
                        </div>
                    </Card>
                    <Card className="w-full h-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="flex flex-col align-top">
                            <p className="font-semibold text-lg">FREE MEMORY</p>
                            <p className="text-3xl font-bold">{info?.mem?.free?.freeMemMb} MB</p>
                            <p>Total free memory: {info?.mem?.info?.freeMemPercentage} %</p>
                        </div>
                    </Card>
                    <Card className="w-full h-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="flex flex-col align-top">
                            <p className="font-semibold text-lg">OS</p>
                            <p className="text-3xl font-bold">
                                {info?.os?.type} {info?.os?.arch}
                            </p>
                            <p>{info?.os?.hostname}</p>
                        </div>
                    </Card>
                    <Card className="w-full h-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="flex flex-col align-top">
                            <p className="font-semibold text-lg">UPTIME</p>
                            <p className="text-3xl font-bold">{formatUptime(info?.os?.uptime)}</p>
                            <p>{info?.os?.uptime}</p>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

const formatUptime = (uptimeInSeconds) => {
    const days = Math.floor(uptimeInSeconds / (24 * 3600));
    const hours = Math.floor((uptimeInSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = uptimeInSeconds % 60;

    return `${days} d ${hours} h ${minutes} m ${seconds.toFixed(0)} s`;
};
