"use client";

import { getUsers } from "@/lib/utils";
import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";

export default function VerifyKos() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUsers().then((r) => setUser(r));
    }, []);

    return (
        <div>
            <div className="flex p-4 flex-col h-full rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <div>
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>NO</Table.HeadCell>
                                <Table.HeadCell>NAMA</Table.HeadCell>
                                <Table.HeadCell>NOMOR TELEPON</Table.HeadCell>
                                <Table.HeadCell>PEKERJAAN</Table.HeadCell>
                                <Table.HeadCell>STATUS</Table.HeadCell>
                                <Table.HeadCell>ACTION</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {user.map((v, i) => {
                                    return (
                                        <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="w-fit">{i + 1}</Table.Cell>
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{v.nama}</Table.Cell>
                                            <Table.Cell>{v.nowa}</Table.Cell>
                                            <Table.Cell>{v.pekerjaan}</Table.Cell>
                                            <Table.Cell>{!!v.isVerified ? "Verified" : "Not Verified"}</Table.Cell>
                                            <Table.Cell className="sticky">
                                                <Button>
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
        </div>
    );
}
