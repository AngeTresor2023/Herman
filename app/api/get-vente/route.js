import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    try {
        const vente = await prisma.vente.findUnique({
            where: { id },
        });
        return NextResponse.json(vente, { status: 200 });
    } catch (error) {
        console.error('Erreur de récupération de la vente:', error);
        return NextResponse.json({ message: 'Erreur de récupération de la vente' }, { status: 500 });
    }
}
