"use client";

import { logout } from "@/lib/utils";
import { Button } from "flowbite-react";

export default function Logout() {
    function handleLogout() {
        logout();
        window.location.reload();
    }
    return <Button onClick={handleLogout}>Logout</Button>;
}
