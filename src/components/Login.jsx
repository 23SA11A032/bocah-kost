'use client';

import { Alert, Button, Card, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { HiInformationCircle } from 'react-icons/hi';

export default function Login() {
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    function onCloseModal() {
        setOpenModal(false);
    }

    /**
     * 
     * @param {Event} e 
     */
    async function login(e) {
        e.preventDefault();
        setSuccess(""); setError("");
        try {
            var { data } = await axios.post("/api/auth/login", { email, password });

            setSuccess("Selamat Datang " + data.nama);
            await new Promise(r => setTimeout(r, 1700));
            localStorage.setItem("user", JSON.stringify(data));
            window.location.reload();
        } catch (error) {
            console.log(error);
            setError(error.response.data);
        }
    }

    return (
        <>
            <Button onClick={() => { setOpenModal(true); console.log("ehe"); }}>Masuk</Button>

            <div className={`absolute top-0 left-0 z-[19] h-screen flex justify-center items-center bg-gray-900 bg-opacity-50 w-screen ${openModal == false && 'hidden'}`}>

                <motion.div animate={{ width: openModal ? '100%' : '0%', }} transition={{ duration: 2.5 }} className="max-w-sm lg:max-w-lg w-full relative shadow-lg truncate">
                    <Card>
                        <form className="flex flex-col gap-4" onSubmit={login}>
                            <Alert color="failure" className={`mt-6 whitespace-normal ${!error && "hidden"}`} icon={HiInformationCircle}>
                                <span className="font-medium">Info alert!</span> {error}
                            </Alert>
                            <Alert color="success" className={`mt-6 whitespace-normal ${!success && "hidden"}`} icon={HiInformationCircle}>
                                <span className="font-medium">Info alert!</span> {success}
                            </Alert>
                            <div>
                                <div className="mb-1 block">
                                    <Label htmlFor="email1" value="Email Address" />
                                </div>
                                <TextInput id="email1" type="email" placeholder="email" required onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <div className="mb-1 block">
                                    <Label htmlFor="password1" value="Password" />
                                </div>
                                <TextInput id="password1" type="password" required onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                            <Button type="submit">Masuk</Button>
                            <Link href={"/daftar"}><p>Tidak punya akun? <span className='text-cyan-400 hover:underline cursor-pointer'>Buat Akun.</span></p></Link>
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
