"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    Alert,
    Button,
    Card,
    DarkThemeToggle,
    Label,
    Select,
    Spinner,
    TextInput,
} from "flowbite-react";
import batik_hitam from "@/assets/batik-hitam.svg";
import batik_putih from "@/assets/batik-putih.svg";
import orang from "@/assets/orang.svg";
import rumah from "@/assets/rumah.svg";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/utils";

const schema = yup.object({
    nama: yup.string().min(5).required().label("Nama"),
    jk: yup
        .mixed()
        .oneOf(["Laki-Laki", "Perempuan"])
        .defined()
        .label("Jenis Kelamin"),
    pekerjaan: yup.string().required().label("Pekerjaan"),
    status: yup
        .mixed()
        .oneOf(["Sudah Menikah", "Belum Menikah"])
        .defined()
        .label("Status"),
    alamat: yup.string().required().label("Alamat"),
    nowa: yup.string().min(10).label("Nomor Whatsapp"),
    email: yup.string().email().required().label("Email"),
    password: yup.string().min(8).required().label("Password"),
});

export default function Daftar() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const [role, setRole] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [suces, setSuces] = useState("");

    const onSubmit = async (data) => {
        data = { ...data, role };
        try {
            var res = await fetch("/api/daftar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            var json = await res.json();
            if (!res.ok) return setError(json.message);
            router.push("/");
        } catch (error) {
            setError("Error kesalahan sistem!");
        }
    };

    return (
        <>
            <div className="flex min-h-screen justify-center items-center py-8">
                <Card className="max-w-sm lg:max-w-lg w-full relative shadow-lg overflow-hidden">
                    {/* BATIK */}
                    <img
                        src={batik_putih.src}
                        alt=""
                        className={`absolute -top-1 -right-1 w-28`}
                    />
                    <img
                        src={batik_hitam.src}
                        alt=""
                        className={`absolute -top-1 -right-1 w-28 dark:hidden`}
                    />

                    {!role && (
                        <div className={`duration-100`}>
                            <h5 className="text-2xl font-bold tracking-tight pl-10 text-gray-900 dark:text-white">
                                Mau Jadi Apa?
                            </h5>

                            <div className="flex flex-col gap-5 mt-6">
                                <Button
                                    className="items-start font-semibold text-xl"
                                    size={"xl"}
                                    onClick={(e) => setRole("user")}
                                >
                                    <div className="flex flex-row gap-6 items-center">
                                        <img
                                            src={orang.src}
                                            alt=""
                                            className="w-12"
                                        />
                                        Pencari Kost
                                    </div>
                                </Button>
                                <Button
                                    className="items-start font-semibold text-xl"
                                    size={"xl"}
                                    onClick={(e) => setRole("kos")}
                                >
                                    <div className="flex flex-row gap-6 items-center">
                                        <img
                                            src={rumah.src}
                                            alt=""
                                            className="w-12"
                                        />
                                        Pemilik Kost
                                    </div>
                                </Button>
                            </div>
                            <p className="pt-5 font-medium text-gray-500 dark:text-gray-300 text-right">
                                Sudah punya akun?{" "}
                                <Link
                                    className="text-cyan-700 hover:underline dark:text-cyan-500"
                                    href={"/"}
                                >
                                    Masuk
                                </Link>{" "}
                            </p>
                        </div>
                    )}
                    {/* pembatas */}
                    {role && (
                        <div className={`duration-100`}>
                            <h5 className="flex flex-row gap-3 items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white -translate-x-[0%] duration-700">
                                <Button
                                    pill
                                    size={"xs"}
                                    onClick={() => {
                                        setRole("");
                                        setError("");
                                        setSuces("");
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Button>
                                <div>
                                    Daftar
                                    <span className="text-lg bg-gradient-to-r from-teal-700 to-teal-400 bg-clip-text text-transparent pl-4">{` ${
                                        role == "user"
                                            ? "Pencari Kost"
                                            : "Pemilik Kost"
                                    }`}</span>
                                </div>
                            </h5>

                            <form
                                className="flex flex-col gap-4 mt-6"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Alert
                                    color="success"
                                    icon={HiInformationCircle}
                                    className={`${suces == "" && "hidden"}`}
                                >
                                    <span className="font-medium">
                                        Info alert!
                                    </span>{" "}
                                    {suces}
                                </Alert>

                                <Alert
                                    color="failure"
                                    icon={HiInformationCircle}
                                    className={`${error == "" && "hidden"}`}
                                >
                                    <span className="font-medium">
                                        Info alert!
                                    </span>{" "}
                                    {error}
                                </Alert>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                    <div>
                                        <div className="mb-2">
                                            <Label
                                                htmlFor="nama"
                                                value="Nama"
                                            />
                                        </div>
                                        <TextInput
                                            id="nama"
                                            {...register("nama")}
                                            placeholder="nama"
                                            helperText={errors.nama?.message}
                                            color={
                                                errors.nama?.message &&
                                                "failure"
                                            }
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2">
                                            <Label
                                                htmlFor="jk"
                                                value="Jenis Kelamin"
                                            />
                                        </div>
                                        <Select
                                            id="jk"
                                            defaultValue={""}
                                            {...register("jk")}
                                            helperText={errors.jk?.message}
                                            color={
                                                errors.jk?.message && "failure"
                                            }
                                        >
                                            <option value="" disabled>
                                                pilih
                                            </option>
                                            <option value={"Laki-Laki"}>
                                                Laki-Laki
                                            </option>
                                            <option value={"Perempuan"}>
                                                Perempuan
                                            </option>
                                        </Select>
                                    </div>
                                </div>

                                <div
                                    className={`grid grid-cols-1 lg:grid-cols-2 gap-2`}
                                >
                                    <div>
                                        <div className="mb-2">
                                            <Label
                                                htmlFor="nowa"
                                                value="Nomor Whatsapp"
                                            />
                                        </div>
                                        <TextInput
                                            id="nowa"
                                            {...register("nowa")}
                                            helperText={errors.nowa?.message}
                                            color={
                                                errors.nowa?.message &&
                                                "failure"
                                            }
                                            placeholder="nomor whatsapp"
                                        />
                                    </div>
                                    <div>
                                        <div className={`mb-2`}>
                                            <Label
                                                htmlFor="pekerjaan"
                                                value="Pekerjaan"
                                            />
                                        </div>
                                        <TextInput
                                            id="pekerjaan"
                                            {...register("pekerjaan")}
                                            helperText={
                                                errors.pekerjaan?.message
                                            }
                                            color={
                                                errors.pekerjaan?.message &&
                                                "failure"
                                            }
                                            placeholder="pekerjaan"
                                        />
                                    </div>
                                </div>

                                <div
                                    className={`grid grid-cols-1 lg:grid-cols-2 gap-2`}
                                >
                                    <div>
                                        <div className="mb-2">
                                            <Label
                                                htmlFor="status"
                                                value="Status"
                                            />
                                        </div>
                                        <Select
                                            defaultValue={""}
                                            id="status"
                                            {...register("status")}
                                            helperText={errors.status?.message}
                                            color={
                                                errors.status?.message &&
                                                "failure"
                                            }
                                        >
                                            <option value="" disabled>
                                                pilih
                                            </option>
                                            <option value={"Belum Menikah"}>
                                                Belum Menikah
                                            </option>
                                            <option value={"Sudah Menikah"}>
                                                Sudah Menikah
                                            </option>
                                        </Select>
                                    </div>
                                    <div>
                                        <div className="mb-2">
                                            <Label
                                                htmlFor="alamat"
                                                value="Alamat"
                                            />
                                        </div>
                                        <TextInput
                                            id="alamat"
                                            {...register("alamat")}
                                            helperText={errors.alamat?.message}
                                            color={
                                                errors.alamat?.message &&
                                                "failure"
                                            }
                                            placeholder="alamat"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                    <div>
                                        <div className="mb-2">
                                            <Label
                                                htmlFor="email"
                                                value="Email"
                                            />
                                        </div>
                                        <TextInput
                                            id="email"
                                            {...register("email")}
                                            helperText={errors.email?.message}
                                            color={
                                                errors.email?.message &&
                                                "failure"
                                            }
                                            placeholder="email"
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2">
                                            <Label
                                                htmlFor="pass"
                                                value="Password"
                                            />
                                        </div>
                                        <TextInput
                                            id="pass"
                                            {...register("password")}
                                            helperText={
                                                errors.password?.message
                                            }
                                            color={
                                                errors.password?.message &&
                                                "failure"
                                            }
                                            type="password"
                                            placeholder="password"
                                        />
                                    </div>
                                </div>

                                {loading ? (
                                    <>
                                        <Button className="mt-2">
                                            <Spinner
                                                aria-label="Spinner button example"
                                                size="sm"
                                            />
                                            <span className="pl-3">
                                                Loading...
                                            </span>
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button type="submit" className="mt-2">
                                            Daftar
                                        </Button>
                                    </>
                                )}
                            </form>
                        </div>
                    )}
                </Card>
            </div>

            <DarkThemeToggle className="fixed top-4 right-4 border dark:border-gray-700 bg-white dark:bg-gray-800" />
        </>
    );
}
