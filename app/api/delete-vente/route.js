import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ message: 'ID is required' }, { status: 400 });
        }

        // Log the ID to verify it's correctly received
        console.log('ID reçu:', id);

        await prisma.vente.delete({
            where: { id }, // Assurez-vous que `id` est une chaîne de caractères, et non un objet
        });

        return NextResponse.json({ message: 'Vente deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting vente:', error);
        return NextResponse.json({ message: 'Failed to delete vente' }, { status: 500 });
    }
}
