import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const produits = await prisma.produit.findMany();
    return NextResponse.json(produits, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    return NextResponse.json({ error: 'Failed to fetch produits' }, { status: 500 });
  }
}
