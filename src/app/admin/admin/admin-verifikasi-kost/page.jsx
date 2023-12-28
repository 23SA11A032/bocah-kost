"use client";

import { getUsers, updateUser } from "@/lib/utils";
import { Button, Card, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineLoading } from "react-icons/ai";
import { SiX } from "react-icons/si";

export default function VerifyKos() {
    const [id, setId] = useState(null);
    const [user, setUser] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        getUsers().then((r) => setUser(r));
    }, []);

    async function update(id) {
        setIsUpdating(true);
        try {
            await updateUser(id, {
                isVerified: !user.filter((v) => v.id == id)[0].isVerified,
            });
            getUsers().then((r) => setUser([...r]));
            setIsOpen(false);
        } catch (error) {
            console.log(error);
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <div className="flex flex-col m-4 gap-4">
            <div className="flex p-4 flex-col rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-2xl font-bold">Belum Di Verifikasi</p>
                <div className="overflow-x-auto pt-4">
                    <div>
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>NO</Table.HeadCell>
                                <Table.HeadCell>NAMA</Table.HeadCell>
                                <Table.HeadCell>EMAIL</Table.HeadCell>
                                <Table.HeadCell>NOMOR TELEPON</Table.HeadCell>
                                <Table.HeadCell>PEKERJAAN</Table.HeadCell>
                                <Table.HeadCell>STATUS</Table.HeadCell>
                                <Table.HeadCell>ACTION</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {user
                                    .filter((v) => !v.isVerified)
                                    .map((v, i) => {
                                        return (
                                            <Table.Row
                                                key={i}
                                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <Table.Cell className="w-fit">
                                                    {i + 1}
                                                </Table.Cell>
                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    {v.nama}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {v.email}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {v.nowa}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {v.pekerjaan}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {!!v.isVerified
                                                        ? "Verified"
                                                        : "Not Verified"}
                                                </Table.Cell>
                                                <Table.Cell className="sticky">
                                                    <Button
                                                        onClick={() => {
                                                            setId(v.id);
                                                            setIsOpen(true);
                                                        }}
                                                    >
                                                        <FaCheck />
                                                    </Button>
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
            <div className="flex p-4 flex-col h-full rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-2xl font-bold">Sudah Di Verifikasi</p>
                <div className="overflow-x-auto pt-4">
                    <div>
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>NO</Table.HeadCell>
                                <Table.HeadCell>NAMA</Table.HeadCell>
                                <Table.HeadCell>EMAIL</Table.HeadCell>
                                <Table.HeadCell>NOMOR TELEPON</Table.HeadCell>
                                <Table.HeadCell>PEKERJAAN</Table.HeadCell>
                                <Table.HeadCell>STATUS</Table.HeadCell>
                                <Table.HeadCell>ACTION</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {user
                                    .filter((v) => !!v.isVerified)
                                    .map((v, i) => {
                                        return (
                                            <Table.Row
                                                key={i}
                                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <Table.Cell className="w-fit">
                                                    {i + 1}
                                                </Table.Cell>
                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    {v.nama}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {v.email}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {v.nowa}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {v.pekerjaan}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {!!v.isVerified
                                                        ? "Verified"
                                                        : "Not Verified"}
                                                </Table.Cell>
                                                <Table.Cell className="sticky">
                                                    <Button
                                                        onClick={() => {
                                                            setId(v.id);
                                                            setIsOpen(true);
                                                        }}
                                                        color="red"
                                                    >
                                                        <SiX />
                                                    </Button>
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="min-h-screen w-full flex justify-center items-center fixed bg-gray-800/50 right-0 top-0 overflow-hidden">
                    <Card className={`max-w-sm md:max-w-md w-full`}>
                        <div className="flex flex-col gap-4">
                            <p className="font-semibold text-3xl">
                                Verifikasikan{" "}
                                {user.filter((v) => v.id == id)[0].nama}?
                            </p>

                            <p className="italic">
                                Kalau sudah di konfirmasi pemilik kos bisa
                                mengelola kos milikya melalui akunnya.
                            </p>

                            <div className="flex flex-row gap-3 self-end">
                                <Button
                                    disabled={isUpdating}
                                    color="warning"
                                    onClick={() => setIsOpen(false)}
                                >
                                    TIDAK
                                </Button>
                                <Button
                                    disabled={isUpdating}
                                    isProcessing={isUpdating}
                                    processingSpinner={
                                        <AiOutlineLoading className="h-6 w-6 animate-spin" />
                                    }
                                    onClick={() => {
                                        update(id);
                                    }}
                                >
                                    YA
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
