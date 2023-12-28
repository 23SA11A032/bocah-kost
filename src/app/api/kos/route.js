import db from "@/lib/db";

export async function GET() {
    try {
        var kos = await db.kost.findMany();
        return Response.json(kos);
    } catch (error) {}
}
