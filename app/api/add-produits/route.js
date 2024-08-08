import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const res = await request.json();
        const { name, qa, qr, pa, pv, date, desc } = res;

        // Validation des champs
        if (!name || !qa || !qr || !pa || !pv || !date || !desc) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const qaInt = parseInt(qa, 10);
        const qrInt = parseInt(qr, 10);
        const paInt = parseInt(pa, 10);
        const pvInt = parseInt(pv, 10);

        // Vérifiez que les conversions se sont bien passées
        if (isNaN(qaInt) || isNaN(qrInt) || isNaN(paInt) || isNaN(pvInt)) {
            return NextResponse.json({ error: 'Invalid number format' }, { status: 400 });
        }

        const result = await prisma.produit.create({
            data: {
                name,
                qa: qaInt,
                qr: qrInt,
                pa: paInt,
                pv: pvInt,
                date: new Date(date),
                desc,
                stock: qrInt,
            },
        });

        return NextResponse.json({ result }, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de la création du produit:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
