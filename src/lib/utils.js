"use server";

import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import db from "./db";
import { Prisma } from "@prisma/client";
const { cpu, mem, os } = require("node-os-utils");

export async function getinfo() {
    return {
        cpu: Object.fromEntries(await Promise.all(Object.keys(cpu).map(async (v) => [v, await cpu[v]()]))),
        mem: Object.fromEntries(await Promise.all(Object.keys(mem).map(async (v) => [v, await mem[v]()]))),
        os: Object.fromEntries(await Promise.all(Object.keys(os).map(async (v) => [v, await os[v]()]))),
    };
}

function getId() {
    try {
        var token = cookies().get("token")?.value;
        var decoded = verify(token, process.env.JWT_SECRET);
        return decoded.id;
    } catch {
        return null;
    }
}

export async function logout() {
    cookies().delete("token");
}

export async function getKosts() {
    var kos = await db.kost.findMany();
    kos = kos.map((v) => parseData(v));
    return kos;
}

export async function getKost(id) {
    try {
        var kos = await db.kost.findUnique({ where: { id } });
        kos = parseData(kos);
        return kos;
    } catch (error) {
        return null;
    }
}

export async function updateKost(id, data) {
    try {
        var kost = stringifyData(data),
            kost = await db.kost.upsert({
                where: { id: id },
                create: { ...kost },
                update: { ...kost },
            });
        kost = parseData(kost);
        return kost;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getUser() {
    try {
        var user = await db.user.findFirst({ where: { id: getId() } });
        return user;
    } catch (error) {
        return null;
    }
}

export async function getUsers() {
    try {
        var user = await db.user.findMany({});
        return user;
    } catch (error) {
        return null;
    }
}

/**
 *
 * @param {*} id
 * @param {import("@prisma/client").User} data
 * @returns
 */
export async function updateUser(id, data) {
    try {
        var kos = await db.user.update({ where: { id: id }, data });
        return kos;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getAdmin() {
    try {
        var admin = await db.admin.upsert({
            where: { id: 1 },
            create: {},
            update: {},
        });
        admin = parseData(admin);
        return admin;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updateAdmin(data) {
    try {
        var admin = stringifyData(data);
        admin = await db.admin.upsert({
            where: { id: 1 },
            create: { ...admin },
            update: { ...admin },
        });
        admin = parseData(data);
        return admin;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function checkout(user, kost) {
    try {
        const result = await db.checkout.create({ data: { userId: user, kostId: kost } });
        return result;
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

export async function getCheckout(id) {
    try {
        const result = await db.checkout.findUnique({ where: { userId: id } });
        return result;
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

/**
 *
 * @param {Prisma.CheckoutFindManyArgs} param0
 * @returns
 */
export async function getCheckouts({ setting }) {
    try {
        const result = await db.checkout.findMany(setting);
        return result;
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

/**
 *
 * @param {*} id
 * @param {import("@prisma/client").Checkout} data
 */
export async function updateCheckout(id, data) {
    try {
        const result = await db.checkout.update({ where: { id: id }, data });
        return result;
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

export async function imgToUrl(file, cb) {
    if (!file) return;
    let formData = new FormData();
    formData.append("key", "bd3113d71ae0bb1bc328b3a5a0d021fc");
    formData.append("image", file);

    try {
        var {
            data: {
                data: { url },
            },
        } = await axios.post("https://api.imgbb.com/1/upload", formData, {
            onUploadProgress: (progressEvent) => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                cb(percentCompleted);
            },
        });

        return url;
    } catch {
        return null;
    }
}

function isObject(item) {
    return typeof item === "object" && !Array.isArray(item) && item !== null;
}

function stringifyData(data) {
    return Object.fromEntries(
        Object.entries(data).map((v) => {
            if (isObject(v[1])) return [v[0], JSON.stringify(v[1])];
            if (Array.isArray(v[1])) return [v[0], JSON.stringify(v[1])];
            return [v[0], v[1]];
        })
    );
}

function parseData(data) {
    return Object.fromEntries(
        Object.entries(data).map((v) => {
            try {
                const parsed = JSON.parse(v[1]);
                if (isObject(parsed) || Array.isArray(parsed)) return [v[0], parsed];
            } catch (e) {
                // not a JSON string
            }
            return [v[0], v[1]];
        })
    );
}

export const verifyJWT = (token, secret) => {
    return new Promise((resolve) => {
        resolve(verify(token, secret));
    });
};
