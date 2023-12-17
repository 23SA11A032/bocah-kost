'use client';

import { Alert, Button, Card, DarkThemeToggle, Label, Select, Spinner, TextInput } from 'flowbite-react';
import batik_hitam from '@/assets/batik-hitam.svg';
import batik_putih from '@/assets/batik-putih.svg';
import orang from '@/assets/orang.svg';
import rumah from '@/assets/rumah.svg';
import { useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Daftar() {
    const [nama, setNama] = useState("");
    const [jk, setJk] = useState("");
    const [pekerjaan, setPekerjaan] = useState("");
    const [status, setStatus] = useState("");
    const [alamat, setAlamat] = useState("");
    const [nowa, setNowa] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [suces, setSuces] = useState("");

    const router = useRouter();

    async function register(e) {
        e.preventDefault();
        setLoading(true); setError(""); setSuces("");
        try {
            var result = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    nama,
                    jk,
                    pekerjaan,
                    status,
                    alamat,
                    nowa,
                    email,
                    password,
                    role,
                }),
            });
            var json = await result.json();
            if (!result.ok) return setError(json.message);
            setSuces("Akun berhasil di daftarkan.");
            await new Promise(r => setTimeout(r, 1700));
            localStorage.setItem("user", JSON.stringify(json));
            router.push("/");
        } catch (error) {
            console.log(error);
            return setError("Sistem error!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="flex min-h-screen justify-center items-center py-8">
                <Card className='max-w-sm lg:max-w-lg w-full relative shadow-lg overflow-hidden'>
                    {/* BATIK */}
                    <img src={batik_putih.src} alt="" className={`absolute -top-1 -right-1 w-28`} />
                    <img src={batik_hitam.src} alt="" className={`absolute -top-1 -right-1 w-28 dark:hidden`} />

                    <div className={`${role && 'duration-700 hidden'}`}>
                        <h5 className="text-2xl font-bold tracking-tight pl-10 text-gray-900 dark:text-white">
                            Mau Jadi Apa?
                        </h5>

                        <div className='flex flex-col gap-5 mt-6'>
                            <Button className='items-start font-semibold text-xl' size={'xl'} onClick={e => setRole("user")}>
                                <div className='flex flex-row gap-6 items-center'>
                                    <img src={orang.src} alt="" className='w-12' />
                                    Pencari Kost
                                </div>
                            </Button>
                            <Button className='items-start font-semibold text-xl' size={'xl'} onClick={e => setRole("kos")}>
                                <div className='flex flex-row gap-6 items-center'>
                                    <img src={rumah.src} alt="" className='w-12' />
                                    Pemilik Kost
                                </div>
                            </Button>
                        </div>
                        <p className='pt-5 text-sm font-medium text-gray-500 dark:text-gray-300'>Punya akun? <Link className='text-cyan-700 hover:underline dark:text-cyan-500' href={"/"}>Masuk</Link> </p>
                    </div>
                    {/* pembatas */}
                    <div className={`${!role && "hidden -translate-x-[200%]"}`}>
                        <h5 className="flex flex-row gap-3 items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white -translate-x-[0%] duration-700">
                            <Button pill size={'xs'} onClick={() => { setRole(""); setError(""); setSuces(""); }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                                </svg>
                            </Button>
                            <div>Daftar<span className='text-lg bg-gradient-to-r from-teal-700 to-teal-400 bg-clip-text text-transparent pl-4'>{` ${role == 'user' ? 'Pencari Kost' : 'Pemilik Kost'}`}</span></div>
                        </h5>

                        <form className='flex flex-col gap-4 mt-6' onSubmit={register}>

                            <Alert color="success" icon={HiInformationCircle} className={`${suces == "" && 'hidden'}`}>
                                <span className="font-medium">Info alert!</span> {suces}
                            </Alert>

                            <Alert color="failure" icon={HiInformationCircle} className={`${error == "" && 'hidden'}`}>
                                <span className="font-medium">Info alert!</span> {error}
                            </Alert>

                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>

                                <div>
                                    <div className="mb-2">
                                        <Label htmlFor="nama" value="Nama" />
                                    </div>
                                    <TextInput id="nama" type="text" placeholder="nama" required onChange={e => setNama(e.target.value)} />
                                </div>
                                <div>
                                    <div className="mb-2">
                                        <Label htmlFor="jk" value="Jenis Kelamin" />
                                    </div>
                                    <Select defaultValue={""} id="jk" required onChange={e => setJk(e.target.value)}>
                                        <option value="">pilih</option>
                                        <option value={"L"}>laki-laki</option>
                                        <option value={"P"}>perempuan</option>
                                    </Select>
                                </div>
                            </div>

                            <div className={`grid grid-cols-1 ${role == 'kos' ? `lg:grid-cols-1` : `lg:grid-cols-2`} gap-2`}>
                                <div>
                                    <div className="mb-2">
                                        <Label htmlFor="nowa" value="Nomor Whatsapp" />
                                    </div>
                                    <TextInput id="nowa" type="text" placeholder="nomor whatsapp" required onChange={e => setNowa(e.target.value)} />
                                </div>
                                <div className={`${role == 'kos' && 'hidden'}`}>
                                    <div className={`mb-2`}>
                                        <Label htmlFor="pekerjaan" value="Pekerjaan" />
                                    </div>
                                    <TextInput id="pekerjaan" type="text" placeholder="pekerjaan" required={role == 'kos' ? false : true} onChange={e => setPekerjaan(e.target.value)} />
                                </div>
                            </div>

                            <div className={`grid grid-cols-1 ${role == 'kos' ? `lg:grid-cols-1` : `lg:grid-cols-2`} gap-2`}>
                                <div className={`${role == 'kos' && 'hidden'}`}>
                                    <div className="mb-2">
                                        <Label htmlFor="status" value="Status" />
                                    </div>
                                    <Select defaultValue={""} id="status" required={role == 'kos' ? false : true} onChange={e => setStatus(e.target.value)}>
                                        <option value="">pilih</option>
                                        <option value={"Belum Menikah"}>Belum Menikah</option>
                                        <option value={"Sudah Menikah"}>Sudah Menikah</option>
                                    </Select>
                                </div>
                                <div>
                                    <div className="mb-2">
                                        <Label htmlFor="alamat" value="Alamat" />
                                    </div>
                                    <TextInput id="alamat" type="text" placeholder="alamat" required onChange={e => setAlamat(e.target.value)} />
                                </div>
                            </div>

                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                <div>
                                    <div className="mb-2">
                                        <Label htmlFor="email" value="Email" />
                                    </div>
                                    <TextInput id="email" type="email" placeholder="bocah@kost.com" required onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <div className="mb-2">
                                        <Label htmlFor="pass" value="Password" />
                                    </div>
                                    <TextInput id="pass" type="password" placeholder="password" pattern=".{8,}" title="Katasandi harus memiliki setidaknya 8 karakter" required onChange={e => setPassword(e.target.value)} />
                                </div>
                            </div>

                            {loading ? (<>
                                <Button className='mt-2'>
                                    <Spinner aria-label="Spinner button example" size="sm" />
                                    <span className="pl-3">Loading...</span>
                                </Button>
                            </>) : (<>
                                <Button type='submit' className='mt-2'>Daftar</Button>
                            </>)}

                        </form>
                    </div>
                </Card>
            </div>

            <DarkThemeToggle className='fixed top-4 right-4 border dark:border-gray-700 bg-white dark:bg-gray-800' />
        </div>
    );
}


function ErrorIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
    );
}