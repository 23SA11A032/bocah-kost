"use client";

import { Alert, Button, Card, Checkbox, FileInput, Label, Modal, Select, Spinner, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiInformationCircle, HiMail, HiXCircle } from "react-icons/hi";
import { FaRupiahSign, FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getKost, getUser, updateKost } from "@/lib/utils";

export default function Pengaturan() {
    const router = useRouter();
    const [listKabupaten, setListKabupaten] = useState([]);
    const [listKecamatan, setListKecamatan] = useState([]);
    const [listKelurahan, setListKelurahan] = useState([]);
    const [kabupaten, setKabupaten] = useState("");
    const [kecamatan, setKecamatan] = useState("");
    const [kelurahan, setKelurahan] = useState("");
    const [fasilitasInput, setFasilitasInput] = useState("");

    const [data, setData] = useState({
        nama: "",
        deskripsi: "",
        jenisKost: "",
        peraturan: [
            { id: 1, status: false, name: "Maks. 1 orang/kamar" },
            { id: 2, status: false, name: "Maks. 2 orang/kamar" },
            { id: 3, status: false, name: "Maks. 3 orang/kamar" },
            { id: 4, status: false, name: "Maks. 4 orang/kamar" },
            { id: 5, status: false, name: "Max. > 5 orang/kamar" },
            { id: 6, status: false, name: "Akses 24 Jam" },
            { id: 7, status: false, name: "Khusus Mahasiswa" },
            { id: 8, status: false, name: "Untuk Umum" },
            { id: 9, status: false, name: "Harga termasuk listrik" },
            { id: 10, status: false, name: "Denda kerusakan barang kos" },
            { id: 11, status: false, name: "Dilarang merokok di kos" },
            { id: 12, status: false, name: "Tamu bebas berkunjung" },
            { id: 13, status: false, name: "Dilarang menerima tamu" },
            {
                id: 14,
                status: false,
                name: "Dilarang mengundang tamu Lawan jenis",
            },
            {
                id: 15,
                status: false,
                name: "Lawan jenis hanya bisa bertamu di teras/ruang tamu",
            },
            { id: 16, status: false, name: "Ada jam malam untuk tamu" },
            { id: 17, status: false, name: "Tidak ada jam malam untuk tamu" },
            { id: 18, status: false, name: "Para tamu dapat menginap semalam" },
            { id: 19, status: false, name: "Tamu dilarang menginap" },
            { id: 20, status: false, name: "Tamu menginap dikenakan biaya" },
            { id: 21, status: false, name: "Boleh membawa hewan" },
            { id: 22, status: false, name: "Dilarang bawa hewan" },
        ],
        peraturanLain: "",
        jenisKost: "",
        alamat: {
            kabupaten: "",
            kecamatan: "",
            kelurahan: "",
            alamat: "",
            linkGMap: "",
        },
        fotoRumah: [],
        fotoKamar: [],
        fotoKamarMandi: [],
        fotoFasilitas: [],
        fasilitas: [
            { name: "Fasilitas umum", status: true, default: true },
            { name: "Fasilitas kamar", status: false, default: true },
            { name: "Fasilitas kamar mandi", status: false, default: true },
            { name: "Fasilitas dapur", status: false, default: true },
            { name: "Tempat parkir", status: false, default: true },
        ],
        totalKamar: {
            total: 0,
            tersedia: 0,
            ukuran: {
                w: 0,
                h: 0,
            },
        },
        harga: {
            hari: 0,
            minggu: 0,
            bulan: 0,
            semester: 0,
            tahun: 0,
        },
    });

    // useEffect(() => {
    //     (async () => {
    //         var user = localStorage.getItem("user");
    //         // if (!user) return router.push("/");
    //         user = JSON.parse(user);
    //         var kos = await fetch("/api/kos/" + user.id, {
    //             ...reqHeader(),
    //         });
    //         kos = await kos.json();
    //         Object.entries(kos).forEach((v, i) => {});
    //     })();
    // }, []);

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

    const [isUpdate, setIsUpdate] = useState(false);
    const [updateError, setUpdateError] = useState("");
    const [updateDone, setUpdateDone] = useState("");
    async function updateData() {
        setIsUpdate(true);
        setUpdateDone("");
        setUpdateError("");
        try {
            var user = await getUser();
            var res = await updateKost(user.id, data);
            if (!res) return setUpdateError("Gagal memperbarui data");
            setUpdateDone("Data telah di updateData.");
        } catch (error) {
            setUpdateError("Error sistem");
        } finally {
            setIsUpdate(false);
        }
    }

    async function getUpdate() {
        try {
            var user = await getUser();
            var kost = await getKost(user?.id);
            if (kost) {
                setData({ ...kost });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUpdate();
    }, []);

    return (
        <>
            <div className="flex flex-col p-4 m-4 h-full rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-2xl font-bold">Pengaturan Kos</p>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="nama" className="pl-2">
                        1. Nama Kost
                    </Label>
                    <TextInput
                        id="nama"
                        type="text"
                        className="max-w-lg"
                        placeholder="nama kost"
                        defaultValue={data.nama}
                        onChange={(e) =>
                            setData((v) => {
                                v["nama"] = e.target.value;
                                return { ...v };
                            })
                        }
                    />
                </div>

                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="jenis" className="pl-2">
                        2. Deskripsi
                    </Label>
                    <Textarea
                        id="nama"
                        type="text"
                        className="max-w-lg"
                        placeholder="deskripsi"
                        defaultValue={data.deskripsi}
                        onChange={(e) =>
                            setData((v) => {
                                v["deskripsi"] = e.target.value;
                                return { ...v };
                            })
                        }
                    />
                </div>

                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="jenis" className="pl-2">
                        3. Jenis Kost
                    </Label>
                    <Select
                        value={data.jenisKost}
                        id="jenis"
                        required
                        className="max-w-lg"
                        onChange={(e) =>
                            setData((v) => {
                                v.jenisKost = e.target.value;
                                return { ...v };
                            })
                        }
                    >
                        <option value={""} disabled>
                            pilih
                        </option>
                        <option value={"putra"}>putra</option>
                        <option value={"putri"}>putri</option>
                    </Select>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="peraturan" className="pl-2">
                        4. Peraturan
                    </Label>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                            {data.peraturan.map((v, i) => (
                                <div key={i} className="flex flex-row items-center gap-2">
                                    <Checkbox
                                        className="dark:border-gray-400"
                                        id={"peraturan-" + i}
                                        checked={v.status}
                                        onChange={(e) =>
                                            setData((d) => {
                                                d.peraturan[i].status = !!e.target.checked;
                                                return { ...d };
                                            })
                                        }
                                    />
                                    <Label htmlFor={"peraturan-" + i}>{v.name}</Label>
                                </div>
                            ))}
                        </div>
                        <Label>Peraturan lain :</Label>
                        <Textarea
                            placeholder={"1. ...\n2. ..."}
                            value={data?.peraturanLain || "..."}
                            onChange={(e) =>
                                setData((v) => {
                                    v.peraturanLain = e.target.value;
                                    return { ...v };
                                })
                            }
                        />
                    </Card>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label className="pl-2">5. Alamat</Label>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="grid grid-cols-3 gap-2">
                            <Select
                                required
                                value={data.alamat.kabupaten}
                                onChange={(e) => {
                                    setKabupaten(JSON.parse(e.target.value));
                                    setData((d) => {
                                        d.alamat.kabupaten = JSON.parse(e.target.value).name;
                                        return { ...d };
                                    });
                                }}
                            >
                                <option value={data.alamat.kabupaten} disabled>
                                    {data.alamat.kabupaten ? data.alamat.kabupaten : "kabupaten"}
                                </option>
                                {listKabupaten.map((v, i) => (
                                    <option value={JSON.stringify(v)} key={i}>
                                        {v.name}
                                    </option>
                                ))}
                            </Select>
                            <Select
                                required
                                value={data.alamat.kecamatan}
                                onChange={(e) => {
                                    setKecamatan(JSON.parse(e.target.value));
                                    setData((d) => {
                                        d.alamat.kecamatan = JSON.parse(e.target.value).name;
                                        return { ...d };
                                    });
                                }}
                            >
                                <option value={data.alamat.kecamatan} disabled>
                                    {data.alamat.kecamatan ? data.alamat.kecamatan : "kecamatan"}
                                </option>
                                {listKecamatan.map((v, i) => (
                                    <option value={JSON.stringify(v)} key={i}>
                                        {v.name}
                                    </option>
                                ))}
                            </Select>
                            <Select
                                required
                                value={data.alamat.kelurahan}
                                onChange={(e) => {
                                    setKelurahan(JSON.parse(e.target.value));
                                    setData((d) => {
                                        d.alamat.kelurahan = JSON.parse(e.target.value).name;
                                        return { ...d };
                                    });
                                }}
                            >
                                <option value={data.alamat.kelurahan} disabled>
                                    {data.alamat.kelurahan ? data.alamat.kelurahan : "kelurahan"}
                                </option>
                                {listKelurahan.map((v, i) => (
                                    <option value={JSON.stringify(v)} key={i}>
                                        {v.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <Textarea
                            placeholder="alamat"
                            required
                            className=""
                            value={data?.alamat?.alamat || "..."}
                            onChange={(e) =>
                                setData((v) => {
                                    v.alamat["alamat"] = e.target.value;
                                    return { ...v };
                                })
                            }
                        />
                        <TextInput
                            className=""
                            placeholder="link google maps"
                            value={data.alamat.linkGMap}
                            onChange={(e) =>
                                setData((v) => {
                                    v.alamat["linkGMap"] = e.target.value;
                                    return { ...v };
                                })
                            }
                        />
                    </Card>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="file-upload" className="pl-2">
                        6. Foto Rumah
                    </Label>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="flex flex-row flex-wrap gap-3">
                            {data.fotoRumah.map((v, i) => {
                                if (Number(v)) return;
                                return (
                                    <div className="relative w-24 h-24" key={i}>
                                        <HiXCircle
                                            className="absolute -top-[5px] -right-[5px] fill-red-500 bg-white rounded-full cursor-pointer"
                                            size={"22px"}
                                            onClick={() =>
                                                setData((d) => {
                                                    d.fotoRumah.splice(i, 1);
                                                    return { ...d };
                                                })
                                            }
                                        />
                                        <img src={v} className="border rounded-lg object-cover w-24 h-24" alt="" />
                                    </div>
                                );
                            })}
                            {Number(data.fotoRumah[data.fotoRumah.length - 1]) ? (
                                <>
                                    <label className="w-24 h-24 border border-dashed rounded-lg flex justify-center items-center">
                                        <p className="font-semibold text-sm">{data.fotoRumah[data.fotoRumah.length - 1] + " %"}</p>
                                        <input type="file" name="myfile" className="hidden" />
                                    </label>
                                </>
                            ) : (
                                <>
                                    <label className="w-24 h-24 border border-dashed rounded-lg flex justify-center items-center">
                                        <p className="font-semibold text-xl">+</p>
                                        <input
                                            type="file"
                                            name="myfile"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={async (e) => {
                                                let file = e.target.files[0];
                                                if (!file) return;
                                                let formData = new FormData();
                                                formData.append("key", "bd3113d71ae0bb1bc328b3a5a0d021fc");
                                                formData.append("image", file);
                                                var pan = data.fotoRumah.length;

                                                axios
                                                    .post("https://api.imgbb.com/1/upload", formData, {
                                                        onUploadProgress: (progressEvent) => {
                                                            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                                                            setData((d) => {
                                                                d.fotoRumah[pan] = percentCompleted;
                                                                return {
                                                                    ...d,
                                                                };
                                                            });
                                                        },
                                                    })
                                                    .then((response) => {
                                                        setData((d) => {
                                                            d.fotoRumah[pan] = response.data.data.url;
                                                            return { ...d };
                                                        });
                                                    })
                                                    .catch((error) => {
                                                        // handle error
                                                    });
                                            }}
                                        />
                                    </label>
                                </>
                            )}
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="file-upload" className="pl-2">
                        7. Foto Kamar Kost
                    </Label>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="flex flex-row flex-wrap gap-3">
                            {data.fotoKamar.map((v, i) => {
                                if (Number(v)) return;
                                return (
                                    <div className="relative w-24 h-24" key={i}>
                                        <HiXCircle
                                            className="absolute -top-[5px] -right-[5px] fill-red-500 bg-white rounded-full cursor-pointer"
                                            size={"22px"}
                                            onClick={() =>
                                                setData((d) => {
                                                    d.fotoKamar.splice(i, 1);
                                                    return { ...d };
                                                })
                                            }
                                        />
                                        <img src={v} className="border rounded-lg object-cover w-24 h-24" alt="" />
                                    </div>
                                );
                            })}
                            {Number(data.fotoKamar[data.fotoKamar.length - 1]) ? (
                                <>
                                    <label className="w-24 h-24 border border-dashed rounded-lg flex justify-center items-center">
                                        <p className="font-semibold text-sm">{data.fotoKamar[data.fotoKamar.length - 1] + " %"}</p>
                                        <input type="file" name="myfile" className="hidden" />
                                    </label>
                                </>
                            ) : (
                                <>
                                    <label className="w-24 h-24 border border-dashed rounded-lg flex justify-center items-center">
                                        <p className="font-semibold text-xl">+</p>
                                        <input
                                            type="file"
                                            name="myfile"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={async (e) => {
                                                let file = e.target.files[0];
                                                if (!file) return;
                                                let formData = new FormData();
                                                formData.append("key", "bd3113d71ae0bb1bc328b3a5a0d021fc");
                                                formData.append("image", file);
                                                var pan = data.fotoKamar.length;

                                                axios
                                                    .post("https://api.imgbb.com/1/upload", formData, {
                                                        onUploadProgress: (progressEvent) => {
                                                            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                                                            setData((d) => {
                                                                d.fotoKamar[pan] = percentCompleted;
                                                                return {
                                                                    ...d,
                                                                };
                                                            });
                                                        },
                                                    })
                                                    .then((response) => {
                                                        setData((d) => {
                                                            d.fotoKamar[pan] = response.data.data.url;
                                                            return { ...d };
                                                        });
                                                    })
                                                    .catch((error) => {
                                                        // handle error
                                                    });
                                            }}
                                        />
                                    </label>
                                </>
                            )}
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="file-upload" className="pl-2">
                        8. Foto Kamar Mandi
                    </Label>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="flex flex-row flex-wrap gap-3">
                            {data.fotoKamarMandi.map((v, i) => {
                                if (Number(v)) return;
                                return (
                                    <div className="relative w-24 h-24" key={i}>
                                        <HiXCircle
                                            className="absolute -top-[5px] -right-[5px] fill-red-500 bg-white rounded-full cursor-pointer"
                                            size={"22px"}
                                            onClick={() =>
                                                setData((d) => {
                                                    d.fotoKamarMandi.splice(i, 1);
                                                    return { ...d };
                                                })
                                            }
                                        />
                                        <img src={v} className="border rounded-lg object-cover w-24 h-24" alt="" />
                                    </div>
                                );
                            })}
                            {Number(data.fotoKamarMandi[data.fotoKamarMandi.length - 1]) ? (
                                <>
                                    <label className="w-24 h-24 border border-dashed rounded-lg flex justify-center items-center">
                                        <p className="font-semibold text-sm">{data.fotoKamarMandi[data.fotoKamarMandi.length - 1] + " %"}</p>
                                        <input type="file" name="myfile" className="hidden" />
                                    </label>
                                </>
                            ) : (
                                <>
                                    <label className="w-24 h-24 border border-dashed rounded-lg flex justify-center items-center">
                                        <p className="font-semibold text-xl">+</p>
                                        <input
                                            type="file"
                                            name="myfile"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={async (e) => {
                                                let file = e.target.files[0];
                                                if (!file) return;
                                                let formData = new FormData();
                                                formData.append("key", "bd3113d71ae0bb1bc328b3a5a0d021fc");
                                                formData.append("image", file);
                                                var pan = data.fotoKamarMandi.length;

                                                axios
                                                    .post("https://api.imgbb.com/1/upload", formData, {
                                                        onUploadProgress: (progressEvent) => {
                                                            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                                                            setData((d) => {
                                                                d.fotoKamarMandi[pan] = percentCompleted;
                                                                return {
                                                                    ...d,
                                                                };
                                                            });
                                                        },
                                                    })
                                                    .then((response) => {
                                                        setData((d) => {
                                                            d.fotoKamarMandi[pan] = response.data.data.url;
                                                            return { ...d };
                                                        });
                                                    })
                                                    .catch((error) => {
                                                        // handle error
                                                    });
                                            }}
                                        />
                                    </label>
                                </>
                            )}
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="file-upload" className="pl-2">
                        9. Foto Fasilitas Kost
                    </Label>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="flex flex-row flex-wrap gap-3">
                            {data.fotoFasilitas.map((v, i) => {
                                if (Number(v)) return;
                                return (
                                    <div className="relative w-24 h-24" key={i}>
                                        <HiXCircle
                                            className="absolute -top-[5px] -right-[5px] fill-red-500 bg-white rounded-full cursor-pointer"
                                            size={"22px"}
                                            onClick={() =>
                                                setData((d) => {
                                                    d.fotoFasilitas.splice(i, 1);
                                                    return { ...d };
                                                })
                                            }
                                        />
                                        <img src={v} className="border rounded-lg object-cover w-24 h-24" alt="" />
                                    </div>
                                );
                            })}
                            {Number(data.fotoFasilitas[data.fotoFasilitas.length - 1]) ? (
                                <>
                                    <label className="w-24 h-24 border border-dashed rounded-lg flex justify-center items-center">
                                        <p className="font-semibold text-sm">{data.fotoFasilitas[data.fotoFasilitas.length - 1] + " %"}</p>
                                        <input type="file" name="myfile" className="hidden" />
                                    </label>
                                </>
                            ) : (
                                <>
                                    <label className="w-24 h-24 border border-dashed rounded-lg flex justify-center items-center">
                                        <p className="font-semibold text-xl">+</p>
                                        <input
                                            type="file"
                                            name="myfile"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={async (e) => {
                                                let file = e.target.files[0];
                                                if (!file) return;
                                                let formData = new FormData();
                                                formData.append("key", "bd3113d71ae0bb1bc328b3a5a0d021fc");
                                                formData.append("image", file);
                                                var pan = data.fotoFasilitas.length;

                                                axios
                                                    .post("https://api.imgbb.com/1/upload", formData, {
                                                        onUploadProgress: (progressEvent) => {
                                                            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                                                            setData((d) => {
                                                                d.fotoFasilitas[pan] = percentCompleted;
                                                                return {
                                                                    ...d,
                                                                };
                                                            });
                                                        },
                                                    })
                                                    .then((response) => {
                                                        setData((d) => {
                                                            d.fotoFasilitas[pan] = response.data.data.url;
                                                            return { ...d };
                                                        });
                                                    })
                                                    .catch((error) => {
                                                        // handle error
                                                    });
                                            }}
                                        />
                                    </label>
                                </>
                            )}
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="file-upload" className="pl-2">
                        10. Fasilitas
                    </Label>
                    <div className="flex flex-row max-w-lg gap-2">
                        <TextInput type="text" sizing="sm" className="flex-1" placeholder="tambah fasilitas" onChange={(e) => setFasilitasInput(e.target.value)} />
                        <Button
                            size="xs"
                            onClick={() =>
                                setData((s) => {
                                    s.fasilitas = [
                                        ...s.fasilitas,
                                        {
                                            name: fasilitasInput,
                                            default: false,
                                            status: false,
                                        },
                                    ];
                                    return { ...s };
                                })
                            }
                        >
                            Tambah
                        </Button>
                    </div>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 mt-1">
                        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                            {data.fasilitas.map((v, i) => {
                                return (
                                    <div key={i} className="flex flex-row items-center gap-2">
                                        <Checkbox
                                            className="dark:border-gray-400"
                                            id={"fasilitas-" + i}
                                            checked={v.status}
                                            onChange={(es) =>
                                                setData((d) => {
                                                    d.fasilitas[i].status = es.target.checked;
                                                    return { ...d };
                                                })
                                            }
                                        />
                                        <Label className="flex-1 truncate" htmlFor={"fasilitas-" + i}>
                                            {v.name}
                                        </Label>
                                        {v.default == false && (
                                            <Button
                                                className="mr-8 bg-red-800"
                                                onClick={() =>
                                                    setData((d) => {
                                                        d.fasilitas.splice(i, 1);
                                                        return { ...d };
                                                    })
                                                }
                                                size={"xs"}
                                            >
                                                <FaTrash size={10} />
                                            </Button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="file-upload" className="pl-2">
                        11. Ketersediaan Kamar
                    </Label>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 mt-1 relative">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="file-upload" className="pl-1">
                                    Total kamar :
                                </Label>
                                <Select
                                    value={data.totalKamar.total}
                                    id="countries"
                                    required
                                    className="w-[100px]"
                                    onChange={(e) =>
                                        setData((d) => {
                                            d.totalKamar.total = e.target.value;
                                            return { ...d };
                                        })
                                    }
                                >
                                    {Array.from({ length: 50 }).map((_, i) => {
                                        return (
                                            <option value={i + 1} key={i}>
                                                {i + 1}
                                            </option>
                                        );
                                    })}
                                </Select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="file-upload" className="pl-1">
                                    Kamar tersedia :
                                </Label>
                                <Select
                                    value={data.totalKamar.tersedia}
                                    id="countries"
                                    required
                                    className="w-[100px]"
                                    onChange={(e) =>
                                        setData((d) => {
                                            d.totalKamar.tersedia = e.target.value;
                                            return { ...d };
                                        })
                                    }
                                >
                                    {Array.from({ length: 50 }).map((_, i) => {
                                        return (
                                            <option value={i + 1} key={i}>
                                                {i + 1}
                                            </option>
                                        );
                                    })}
                                </Select>
                            </div>
                            <div className="flex flex-col gap-1 col-span-2">
                                <Label htmlFor="file-upload" className="pl-1">
                                    Ukuran Kamar :
                                </Label>
                                <div className="flex flex-row items-center gap-2">
                                    <TextInput
                                        rightIcon={MeterIcon}
                                        className="w-[100px] m-0"
                                        onChange={(e) =>
                                            setData((d) => {
                                                d.totalKamar.ukuran.w = e.target.value;
                                                return { ...d };
                                            })
                                        }
                                    />
                                    <p>X</p>
                                    <TextInput
                                        rightIcon={MeterIcon}
                                        className="w-[100px]"
                                        onChange={(e) =>
                                            setData((d) => {
                                                d.totalKamar.ukuran.h = e.target.value;
                                                return { ...d };
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col pt-3 gap-1">
                    <Label htmlFor="file-upload" className="pl-2">
                        12. Harga
                    </Label>
                    <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 mt-1">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1 col-span-2">
                                <Label htmlFor="file-upload" className="pl-1">
                                    Harga/hari :
                                </Label>
                                <TextInput
                                    value={data.harga.hari}
                                    icon={() => <FaRupiahSign size={14} />}
                                    className="max-w-lg"
                                    onChange={(e) =>
                                        setData((d) => {
                                            d.harga.hari = e.target.value;
                                            return { ...d };
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1 col-span-2">
                                <Label htmlFor="file-upload" className="pl-1">
                                    Harga/minggu :
                                </Label>
                                <TextInput
                                    value={data.harga.minggu}
                                    icon={() => <FaRupiahSign size={14} />}
                                    className="max-w-lg"
                                    onChange={(e) =>
                                        setData((d) => {
                                            d.harga.minggu = e.target.value;
                                            return { ...d };
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1 col-span-2">
                                <Label htmlFor="file-upload" className="pl-1">
                                    Harga/bulan :
                                </Label>
                                <TextInput
                                    value={data.harga.bulan}
                                    icon={() => <FaRupiahSign size={14} />}
                                    className="max-w-lg"
                                    onChange={(e) =>
                                        setData((d) => {
                                            d.harga.bulan = e.target.value;
                                            return { ...d };
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1 col-span-2">
                                <Label htmlFor="file-upload" className="pl-1">
                                    Harga/6 bulan :
                                </Label>
                                <TextInput
                                    value={data.harga.semester}
                                    icon={() => <FaRupiahSign size={14} />}
                                    className="max-w-lg"
                                    onChange={(e) =>
                                        setData((d) => {
                                            d.harga.semester = e.target.value;
                                            return { ...d };
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1 col-span-2">
                                <Label htmlFor="file-upload" className="pl-1">
                                    Harga/tahun :
                                </Label>
                                <TextInput
                                    value={data.harga.tahun}
                                    icon={() => <FaRupiahSign size={14} />}
                                    className="max-w-lg"
                                    onChange={(e) =>
                                        setData((d) => {
                                            d.harga.tahun = e.target.value;
                                            return { ...d };
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="flex flex-row gap-4 items-center mt-6">
                    {!isUpdate ? (
                        <Button className="w-fit" onClick={updateData}>
                            Update
                        </Button>
                    ) : (
                        <Button>
                            <Spinner aria-label="Spinner button example" size="sm" />
                            <span className="pl-3">Loading...</span>
                        </Button>
                    )}
                    <Alert color="success" icon={HiInformationCircle} className={`w-fit ${!updateDone && "hidden"}`}>
                        <span className="font-medium">Info alert!</span> {updateDone}
                    </Alert>
                    <Alert color="failure" icon={HiInformationCircle} className={`w-fit ${!updateError && "hidden"}`}>
                        <span className="font-medium">Info alert!</span> {updateError}
                    </Alert>
                </div>
                {/*  */}
            </div>
        </>
    );
}
function MeterIcon() {
    return <span style={{ fontWeight: "bold", fontSize: "12px" }}>m</span>;
}
