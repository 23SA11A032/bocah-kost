"use client";

import { Button, Card, Checkbox, FileInput, Label, Modal, Select, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiMail } from "react-icons/hi";

export default function Pengaturan() {
    const [listProvinsi, setListProvinsi] = useState([]);
    const [listKabupaten, setListKabupaten] = useState([]);
    const [listKecamatan, setListKecamatan] = useState([]);
    const [listKelurahan, setListKelurahan] = useState([]);
    const [provinsi, setProvinsi] = useState("");
    const [kabupaten, setKabupaten] = useState("");
    const [kecamatan, setKecamatan] = useState("");
    const [kelurahan, setKelurahan] = useState("");

    useEffect(() => {
        (async () => {
            var html = await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
            var json = await html.json();
            setListProvinsi(json);
        })();
    }, []);

    useEffect(() => {
        if (Object.entries(provinsi).length == 0) return;
        (async () => {
            var html = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinsi.id}.json`);
            var json = await html.json();
            setListKabupaten(json);
        })();
    }, [provinsi]);

    useEffect(() => {
        if (Object.entries(kabupaten).length == 0) return;
        (async () => {
            var html = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kabupaten.id}.json`);
            var json = await html.json();
            setListKecamatan(json);
        })();
    }, [kabupaten]);

    useEffect(() => {
        if (Object.entries(kecamatan).length == 0) return;
        (async () => {
            var html = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecamatan.id}.json`);
            var json = await html.json();
            setListKelurahan(json);
        })();
    }, [kecamatan]);

    const peraturan = [
        "Maks. 1 orang/kamar",
        "Maks. 2 orang/kamar",
        "Maks. 3 orang/kamar",
        "Maks. 4 orang/kamar",
        "Max. > 5 orang/kamar",
        "Akses 24 Jam",
        "Khusus Mahasiswa",
        "Untuk Umum",
        "Harga termasuk listrik",
        "Denda kerusakan barang kos",
        "Dilarang merokok di kos",
        "Tamu bebas berkunjung",
        "Dilarang menerima tamu",
        "Dilarang mengundang tamu Lawan jenis",
        "Lawan jenis hanya bisa bertamu di teras/ruang tamu",
        "Ada jam malam untuk tamu",
        "Tidak ada jam malam untuk tamu",
        "Para tamu dapat menginap semalam",
        "Tamu dilarang menginap",
        "Tamu menginap dikenakan biaya",
        "Boleh membawa hewan",
        "Dilarang bawa hewan",
    ];

    return (
        <>
            <div className="flex flex-col p-4 m-4 h-full rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-2xl font-bold">Pengaturan Kos</p>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="nama" className="pl-2">
                        Nama Kost
                    </Label>
                    <TextInput id="nama" type="text" className="max-w-lg" placeholder="nama kost" />
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="jenis" className="pl-2">
                        Jenis Kost
                    </Label>
                    <Select id="jenis" required className="max-w-lg">
                        <option disabled selected value={""}>
                            pilih
                        </option>
                        <option value={"putra"}>putra</option>
                        <option value={"putri"}>putri</option>
                    </Select>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="peraturan" className="pl-2">
                        Peraturan
                    </Label>
                    <Card className="bg-gray-50 dark:bg-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                            {peraturan.map((v, i) => (
                                <div key={i} className="flex flex-row items-center gap-2">
                                    <Checkbox className="dark:border-gray-400" id={String(v).replace(/ +/g, "")} />
                                    <Label htmlFor={String(v).replace(/ +/g, "")}>{v}</Label>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label className="pl-2">
                        Alamat
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                        <Select required onChange={e => setProvinsi(JSON.parse(e.target.value))}>
                            <option value={""} disabled selected>provinsi</option>
                            {listProvinsi.map((v, i) => <option key={i} value={JSON.stringify(v)}>{v.name}</option>)}
                        </Select>
                        <Select required onChange={e => setKabupaten(JSON.parse(e.target.value))}>
                            <option value={""} disabled selected>kabupaten</option>
                            {listKabupaten.map((v, i) => <option value={JSON.stringify(v)} key={i}>{v.name}</option>)}
                        </Select>
                        <Select required onChange={e => setKecamatan(JSON.parse(e.target.value))}>
                            <option value={""} disabled selected>kecamatan</option>
                            {listKecamatan.map((v, i) => <option value={JSON.stringify(v)} key={i}>{v.name}</option>)}
                        </Select>
                        <Select required >
                            <option value={""} disabled selected>kelurahan</option>
                            {listKelurahan.map((v, i) => <option value={JSON.stringify(v)} key={i}>{v.name}</option>)}
                        </Select>
                    </div>
                    <Textarea placeholder="alamat" required className="mt-1" />
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="file-upload" className="pl-2">
                        Foto
                    </Label>
                    <div className="grid grid-cols-4 gap-2 nowrap"></div>
                    <div className="flex flex-row gap-2 items-center">
                        <FileInput />
                        <Label className="whitespace-nowrap pr-2 dark:text-gray-400">Foto Rumah</Label>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <FileInput />
                        <Label className="whitespace-nowrap pr-2 dark:text-gray-400">Foto Kamar</Label>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <FileInput />
                        <Label className="whitespace-nowrap pr-2 dark:text-gray-400">Foto Kamar Mandi</Label>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <FileInput />
                        <Label className="whitespace-nowrap pr-2 dark:text-gray-400">Foto Fasilitas</Label>
                    </div>
                </div>
            </div>
        </>
    );
}
