import Carausel from "@/components/Carousel";
import Header from "@/components/Header";
import { Alert, Button, DarkThemeToggle } from "flowbite-react";

export default function Home() {
    var images = [
        "https://static.mamikos.com/uploads/cache/data/event/2023-10-26/yz5WBfq1-540x720.jpg",
        "https://static.mamikos.com/uploads/cache/data/event/2023-11-14/lpSj9r0O-540x720.jpg",
        "https://static.mamikos.com/uploads/cache/data/event/2023-05-30/vP4HjDLB-540x720.jpg",
        "https://static.mamikos.com/uploads/cache/data/event/2023-07-04/VmQFAmbE-540x720.jpg",
        "https://static.mamikos.com/uploads/cache/data/event/2023-08-02/otjkenCs-540x720.jpg",
        "https://static.mamikos.com/uploads/cache/data/event/2022-03-25/VTcV35Br-540x720.jpg",
        "https://static.mamikos.com/uploads/cache/data/event/2023-05-16/hkqFTkBN-540x720.jpg",
    ]

    return (
        <div className="container mx-auto flex flex-col">
            <Header />
            <div className="px-2 lg:px-0 self-center container overflow-hidden pt-4"><Carausel images={images} /></div>

        </div>
    )
}
