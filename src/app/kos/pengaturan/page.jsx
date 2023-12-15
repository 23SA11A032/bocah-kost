"use client";

import { Button, Card, Checkbox, FileInput, Label, Modal, Select, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiMail, HiXCircle } from "react-icons/hi";
import { FaRupiahSign } from "react-icons/fa6";
import { HiMiniTrash } from "react-icons/hi2";

export default function Pengaturan() {
    const [listKabupaten, setListKabupaten] = useState([]);
    const [listKecamatan, setListKecamatan] = useState([]);
    const [listKelurahan, setListKelurahan] = useState([]);
    const [kabupaten, setKabupaten] = useState("");
    const [kecamatan, setKecamatan] = useState("");
    const [kelurahan, setKelurahan] = useState("");

    const [data, setData] = useState({
        nama: "",
        jenisKost: "",
        peraturan: [
            { id: 1, status: true, name: "Maks. 1 orang/kamar" },
            { id: 2, status: true, name: "Maks. 2 orang/kamar" },
            { id: 3, status: true, name: "Maks. 3 orang/kamar" },
            { id: 4, status: true, name: "Maks. 4 orang/kamar" },
            { id: 5, status: true, name: "Max. > 5 orang/kamar" },
            { id: 6, status: true, name: "Akses 24 Jam" },
            { id: 7, status: true, name: "Khusus Mahasiswa" },
            { id: 8, status: true, name: "Untuk Umum" },
            { id: 9, status: true, name: "Harga termasuk listrik" },
            { id: 10, status: true, name: "Denda kerusakan barang kos" },
            { id: 11, status: true, name: "Dilarang merokok di kos" },
            { id: 12, status: true, name: "Tamu bebas berkunjung" },
            { id: 13, status: true, name: "Dilarang menerima tamu" },
            { id: 14, status: true, name: "Dilarang mengundang tamu Lawan jenis" },
            { id: 15, status: true, name: "Lawan jenis hanya bisa bertamu di teras/ruang tamu" },
            { id: 16, status: true, name: "Ada jam malam untuk tamu" },
            { id: 17, status: true, name: "Tidak ada jam malam untuk tamu" },
            { id: 18, status: true, name: "Para tamu dapat menginap semalam" },
            { id: 19, status: true, name: "Tamu dilarang menginap" },
            { id: 20, status: true, name: "Tamu menginap dikenakan biaya" },
            { id: 21, status: true, name: "Boleh membawa hewan" },
            { id: 22, status: true, name: "Dilarang bawa hewan" }
        ],
        alamat: "",
    });

    useEffect(() => {
        (async () => {
            var html = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/33.json`);
            var json = await html.json();
            setListKabupaten(json);
        })();
    }, []);

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

    const [imputFasilitasCustom, setImputFasilitasCustom] = useState("");
    const [fasilitas, setFasilitas] = useState([
        "Fasilitas umum",
        "Fasilitas kamar",
        "Fasilitas kamar mandi",
        "Fasilitas dapur",
        "Tempat parkir",
    ]);
    const [fasilitasCustom, setFasilitasCustom] = useState([]);

    return (
        <>
            <div className="flex flex-col p-4 m-4 h-full rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-2xl font-bold">Pengaturan Kos</p>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="nama" className="pl-2">
                        1. Nama Kost
                    </Label>
                    <TextInput id="nama" type="text" className="max-w-lg" placeholder="nama kost" />
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="jenis" className="pl-2">
                        2. Jenis Kost
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
                        3. Peraturan
                    </Label>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                            {data.peraturan.map((v, i) => (
                                <div key={i} className="flex flex-row items-center gap-2">
                                    <Checkbox className="dark:border-gray-400" id={"peraturan-" + i} />
                                    <Label htmlFor={"peraturan-" + i}>{v.name}</Label>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label className="pl-2">
                        4. Alamat
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                        <Select required onChange={e => setKabupaten(JSON.parse(e.target.value))}>
                            <option value={""} disabled selected>kabupaten</option>
                            {listKabupaten.map((v, i) => <option value={JSON.stringify(v)} key={i}>{v.name}</option>)}
                        </Select>
                        <Select required onChange={e => setKecamatan(JSON.parse(e.target.value))}>
                            <option value={""} disabled selected>kecamatan</option>
                            {listKecamatan.map((v, i) => <option value={JSON.stringify(v)} key={i}>{v.name}</option>)}
                        </Select>
                        <Select required onChange={e => setKelurahan(JSON.parse(e.target.value))}>
                            <option value={""} disabled selected>kelurahan</option>
                            {listKelurahan.map((v, i) => <option value={JSON.stringify(v)} key={i}>{v.name}</option>)}
                        </Select>
                    </div>
                    <Textarea placeholder="alamat" required className="mt-1" />
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="file-upload" className="pl-2">
                        5. Foto Rumah
                    </Label>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="flex flex-row flex-wrap gap-3">
                            {["https://picsum.photos/id/237/200/200"].map((v, i) => {
                                return (
                                    <div className="relative w-24" key={i}>
                                        <HiXCircle className="absolute -top-[5px] -right-[5px] fill-red-500 bg-white rounded-full " size={'22px'} />
                                        <img src={v} className="border rounded-lg object-cover" alt="" />
                                    </div>
                                );
                            })}
                            <label className="w-24 border border-dashed rounded-lg flex justify-center items-center">
                                <p className="font-semibold text-xl">+</p>
                                <input type="file" name="myfile" className="hidden" />
                            </label>
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="file-upload" className="pl-2">
                        6. Foto Kamar Kost
                    </Label>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="flex flex-row flex-wrap gap-3">
                            {["https://picsum.photos/id/237/200/200"].map((v, i) => {
                                return (
                                    <div className="relative w-24" key={i}>
                                        <HiXCircle className="absolute -top-[4px] -right-[4px] fill-red-500 bg-white rounded-full " size={'22px'} />
                                        <img src={v} className="border rounded-lg object-cover" alt="" />
                                    </div>
                                );
                            })}
                            <label className="w-24 border border-dashed rounded-lg flex justify-center items-center">
                                <p className="font-semibold text-xl">+</p>
                                <input type="file" name="myfile" className="hidden" />
                            </label>
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="file-upload" className="pl-2">
                        7. Foto Kamar Mandi
                    </Label>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="flex flex-row flex-wrap gap-3">
                            {["https://picsum.photos/id/237/200/200"].map((v, i) => {
                                return (
                                    <div className="relative w-24" key={i}>
                                        <HiXCircle className="absolute -top-[4px] -right-[4px] fill-red-500 bg-white rounded-full " size={'22px'} />
                                        <img src={v} className="h-24 w-24 border rounded-lg object-cover" alt="" />
                                    </div>
                                );
                            })}
                            <label className="w-24 border border-dashed rounded-lg flex justify-center items-center">
                                <p className="font-semibold text-xl">+</p>
                                <input type="file" name="myfile" className="hidden" />
                            </label>
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="file-upload" className="pl-2">
                        8. Foto Fasilitas Kost
                    </Label>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="flex flex-row flex-wrap gap-3">
                            {["https://picsum.photos/id/237/200/200"].map((v, i) => {
                                return (
                                    <div className="relative w-24" key={i}>
                                        <HiXCircle className="absolute -top-[4px] -right-[4px] fill-red-500 bg-white rounded-full " size={'22px'} />
                                        <img src={v} className="w-24 border rounded-lg object-cover" alt="" />
                                    </div>
                                );
                            })}
                            <label className="w-24 border border-dashed rounded-lg flex justify-center items-center">
                                <p className="font-semibold text-xl">+</p>
                                <input type="file" name="myfile" className="hidden" />
                            </label>
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="file-upload" className="pl-2">
                        9. Fasilitas
                    </Label>
                    <div className="flex flex-row max-w-lg gap-2">
                        <TextInput type="text" sizing="sm" className="flex-1" placeholder="tambah fasilitas" onChange={e => setImputFasilitasCustom(e.target.value)} />
                        <Button size="xs" onClick={() => setFasilitasCustom(s => { s.push(imputFasilitasCustom); return [...s]; })}>Tambah</Button>
                    </div>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 mt-1">
                        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                            {fasilitas.map((v, i) => {
                                return (
                                    <div key={i} className="flex flex-row items-center gap-2">
                                        <Checkbox className="dark:border-gray-400" id={String(v).replace(/ +/g, "")} />
                                        <Label htmlFor={String(v).replace(/ +/g, "")}>{v}</Label>
                                    </div>
                                );
                            })}
                            {fasilitasCustom.map((v, i) => {
                                return (
                                    <div key={i} className="flex flex-row items-center gap-2">
                                        <Checkbox className="dark:border-gray-400" id={String(v).replace(/ +/g, "")} />
                                        <Label htmlFor={String(v).replace(/ +/g, "")} className="truncate flex-1" >{v}</Label>
                                        <Button size={'xs'} color="red" className="p-0" onClick={() => setFasilitasCustom(s => { s.splice(i, 1); return [...s]; })}><HiMiniTrash size={10} /></Button>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="file-upload" className="pl-2">
                        10. Ketersediaan Kamar
                    </Label>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 mt-1 relative">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="file-upload" className="pl-1">
                                    Total kamar :
                                </Label>
                                <Select id="countries" required className="w-[100px]">
                                    {Array.from({ length: 50 }).map((_, i) => {
                                        return <option value={i + 1} key={i}>{i + 1}</option>;
                                    })}
                                </Select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="file-upload" className="pl-1">
                                    Kamar tersedia :
                                </Label>
                                <Select id="countries" required className="w-[100px]">
                                    {Array.from({ length: 50 }).map((_, i) => {
                                        return <option value={i + 1} key={i}>{i + 1}</option>;
                                    })}
                                </Select>
                            </div>
                            <div className="flex flex-col gap-1 col-span-2">
                                <Label htmlFor="file-upload" className="pl-1">
                                    Ukuran Kamar :
                                </Label>
                                <div className="flex flex-row items-center gap-2">
                                    <TextInput rightIcon={MeterIcon} className="w-[100px] m-0" />
                                    <p>X</p>
                                    <TextInput rightIcon={MeterIcon} className="w-[100px]" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="file-upload" className="pl-2">
                        11. Harga
                    </Label>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 mt-1">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1 col-span-2">
                                <Label htmlFor="file-upload" className="pl-1">
                                    Harga/hari :
                                </Label>
                                <TextInput icon={() => <FaRupiahSign size={14} />} className="max-w-lg" />
                            </div>
                            <div className="flex flex-col gap-1 col-span-2">
                                <Label htmlFor="file-upload" className="pl-1">
                                    Harga/minggu :
                                </Label>
                                <TextInput icon={() => <FaRupiahSign size={14} />} className="max-w-lg" />
                            </div>
                            <div className="flex flex-col gap-1 col-span-2">
                                <Label htmlFor="file-upload" className="pl-1">
                                    Harga/bulan :
                                </Label>
                                <TextInput icon={() => <FaRupiahSign size={14} />} className="max-w-lg" />
                            </div>
                            <div className="flex flex-col gap-1 col-span-2">
                                <Label htmlFor="file-upload" className="pl-1">
                                    Harga/6 bulan :
                                </Label>
                                <TextInput icon={() => <FaRupiahSign size={14} />} className="max-w-lg" />
                            </div>
                            <div className="flex flex-col gap-1 col-span-2">
                                <Label htmlFor="file-upload" className="pl-1">
                                    Harga/tahun :
                                </Label>
                                <TextInput icon={() => <FaRupiahSign size={14} />} className="max-w-lg" />
                            </div>
                        </div>
                    </Card>
                </div>
                {/*  */}
            </div>
        </>
    );
}
function MeterIcon() {
    return <span style={{ fontWeight: 'bold', fontSize: '12px' }}>m</span>;
}