
'use client';

import { Button, Card, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";

export default function Login() {
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');
    const [user, setUser] = useState({});

    function onCloseModal() {
        setOpenModal(false);
        setEmail('');
    }

    useEffect(() => {
        var user = localStorage.getItem('user');
        user && setUser(JSON.parse(user));
        console.log(JSON.parse(user));
    }, []);

    return (
        <>
            <Button onClick={() => {setOpenModal(true); console.log("ehe")}}>Masuk</Button>

            <div className={`absolute top-0 left-0 z-[1] h-screen flex justify-center items-center bg-gray-900 bg-opacity-50 w-screen ${openModal == false && 'hidden'}`}>

                <motion.div animate={{ width: openModal ? '100%' : '0%', opacity: openModal ? 1 : 0 }} transition={{ duration: 1 }} className="max-w-sm lg:max-w-lg w-full relative shadow-lg ">
                    <Card>
                        <form className="flex flex-col gap-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email1" value="Your email" />
                                </div>
                                <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password1" value="Your password" />
                                </div>
                                <TextInput id="password1" type="password" required />
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                            <Button type="submit">Masuk</Button>
                        </form>
                        <button className='absolute top-4 right-4' onClick={onCloseModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </Card>
                </motion.div>

            </div>
        </>
    );
}
