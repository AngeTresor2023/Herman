import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const res = await request.json();
        const { produitId, nomproduit, date, desc, nomclient, prixvente, qtevendu, avance, reste } = res;

        // Validation des champs
        if ( !produitId  || !nomproduit || !date || !desc || !nomclient || !prixvente || !qtevendu || !avance || !reste) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const prixventeInt = parseInt(prixvente, 10);
        const qtevenduInt = parseInt(qtevendu, 10);
        const avanceInt = parseInt(avance, 10);
        const resteInt = parseInt(reste, 10);

        // Vérifiez que les conversions se sont bien passées
        if (isNaN(prixventeInt) || isNaN(qtevenduInt) || isNaN(avanceInt) || isNaN(resteInt)) {
            return NextResponse.json({ error: 'Invalid number format' }, { status: 400 });
        }


        // Récupérer le produit pour vérifier le stock actuel
        const produit = await prisma.produit.findUnique({
            where: { id: produitId }
        });

        if (!produit) {
            return NextResponse.json({ error: 'Produit not found' }, { status: 404 });
        }

        // Vérifier si la quantité vendue est supérieure au stock disponible
        if (produit.stock < qtevenduInt) {
            return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 });
        }

        // Mettre à jour le stock du produit
        const updatedProduit = await prisma.produit.update({
            where: { id: produitId },
            data: {
                stock: produit.stock - qtevenduInt  // Soustraire la quantité vendue du stock
            }
        });


        
        // Tentative de connexion avec un produit existant ou création si le produit n'existe pas
        const result = await prisma.vente.create({
            data: {
                nomproduit,
                date: new Date(date),
                desc,
                nomclient,
                prixvente: prixventeInt,
                qtevendu: qtevenduInt,
                avance: avanceInt,
                reste: resteInt,
                produit: {
                    connectOrCreate: {
                        where: { id: produitId },  // Vérifier si un produit avec ce nom existe
                        create: {
                            id: produitId,                     // Si non, créer un nouveau produit
                            name: nomproduit,
                            date: new Date(date),
                            // Ajoutez ici d'autres champs si nécessaire lors de la création du produit
                        },
                    },
                },
            },
        });

        return NextResponse.json({ result }, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de la création de la vente:', error);
        return NextResponse.json({ error: 'Failed to create sale' }, { status: 500 });
    }
}
