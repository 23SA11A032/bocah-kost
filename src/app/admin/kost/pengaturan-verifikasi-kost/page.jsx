"use client";

import { getCheckout, getCheckouts, getUser } from "@/lib/utils";
import { Card, Table } from "flowbite-react";
import { useEffect, useState } from "react";

export default function _() {
    const [ck, setCk] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                var user = await getUser();
                var checkout = await getCheckouts({ where: { id: user?.id } });
            } catch (error) {
                console.log(error.message);
            }
        })();
    }, []);

    return (
        <>
            <div className="w-full p-4">
                <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <div className="overflow-auto m-4 rounded-lg">
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>NAMA</Table.HeadCell>
                                <Table.HeadCell>Color</Table.HeadCell>
                                <Table.HeadCell>Category</Table.HeadCell>
                                <Table.HeadCell>Price</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{'Apple MacBook Pro 17"'}</Table.Cell>
                                    <Table.Cell>Sliver</Table.Cell>
                                    <Table.Cell>Laptop</Table.Cell>
                                    <Table.Cell>$2999</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}
