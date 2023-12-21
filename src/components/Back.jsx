"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { Button } from "flowbite-react";

export default function Back() {
    const router = useRouter();

    const back = () => router.back();

    return (
        <>
            <Button onClick={back} className="" pill size={"sm"}>
                <FaArrowLeft size={16} />
            </Button>
        </>
    );
}
