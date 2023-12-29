"use client";

import { getCheckout, getCheckouts, getUser, getUsers } from "@/lib/utils";
import { Button, Card, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";

export default function _() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                var users = await getUsers();
                var checkout = await getCheckouts({ where: { id: user?.id } });
                setUser([...users.filter((v) => checkout.map((m) => m.userId).includes(v.id))]);
            } catch (error) {
                console.log(error.message);
            }
        })();
    }, []);

    return (
        <>
            <pre>{JSON.stringify(user, null, 4)}</pre>
            <div className="w-full p-4">
                <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <div className="overflow-auto m-4 rounded-lg w-full">
                        <Table hoverable className="w-full">
                            <Table.Head>
                                <Table.HeadCell>NO</Table.HeadCell>
                                <Table.HeadCell>NAMA</Table.HeadCell>
                                <Table.HeadCell>JENIS KELAMIN</Table.HeadCell>
                                <Table.HeadCell>PEKERJAAN</Table.HeadCell>
                                <Table.HeadCell>STATUS</Table.HeadCell>
                                <Table.HeadCell>ALAMAT</Table.HeadCell>
                                <Table.HeadCell>NO. WHATSAPP</Table.HeadCell>
                                <Table.HeadCell>EMAIL</Table.HeadCell>
                                <Table.HeadCell>AKSI</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {user.map((v, i) => {
                                    return (
                                        <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{i + 1}</Table.Cell>
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{v?.nama}</Table.Cell>
                                            <Table.Cell className="whitespace-nowrap">{v?.jk}</Table.Cell>
                                            <Table.Cell className="whitespace-nowrap">{v?.pekerjaan}</Table.Cell>
                                            <Table.Cell className="whitespace-nowrap">{v?.status}</Table.Cell>
                                            <Table.Cell className="whitespace-nowrap overflow-x-auto max-w-md">{v?.alamat}</Table.Cell>
                                            <Table.Cell className="whitespace-nowrap">{v?.nowa}</Table.Cell>
                                            <Table.Cell className="whitespace-nowrap">{v?.email}</Table.Cell>
                                            <Table.Cell>
                                                <div className="">
                                                    <Button size={"sm"} color="success">
                                                        <BiCheck />
                                                    </Button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}
