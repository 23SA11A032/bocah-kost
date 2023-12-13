
'use client';

import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
            <Button onClick={() => setOpenModal(true)}>Masuk</Button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header className='dark:bg-gray-800 border-t border-x rounded-t-lg relative' />
                <Modal.Body className='dark:bg-gray-800 border-b border-x border-gray-600 rounded-b-lg'>
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Masuk</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Email" />
                            </div>
                            <TextInput
                                id="email"
                                placeholder="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Password" />
                            </div>
                            <TextInput id="password" type="password" placeholder='password' required />
                        </div>

                        <div className="w-full">
                            <Button className='w-full'>Masuk</Button>
                        </div>
                        <div className="flex text-sm font-medium text-gray-500 dark:text-gray-300">
                            Tidak punya akun?&nbsp;
                            <Link href="/daftar" className="text-cyan-700 hover:underline dark:text-cyan-500">
                                Buat akun
                            </Link>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
