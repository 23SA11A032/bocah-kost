"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getKosts() {
    var kos = await prisma.kos.findMany();
    return kos;
}

export async function getUser(id) {
    var user = await prisma.user.findFirst({ where: { id: id } });
    return user;
}

export async function getKost(id) {
    var kos = await prisma.kos.findFirst({ where: { id: id } });
    return kos;
}