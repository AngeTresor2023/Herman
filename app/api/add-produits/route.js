import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();


export async function POST (request){
    const res = await request.json()
    const { name, qa, qr, pa, pv, date, desc } = res;
   
    console.log ({res})
    const qaInt = parseInt(qa, 10);
    const qrInt = parseInt(qr, 10);
    const paInt = parseInt(pa, 10);
    const pvInt = parseInt(pv, 10);

    const result = await prisma.produit.create({
        data: {
            name,
            qa:qaInt,
            qr:qrInt,
            pa:paInt,
            pv:pvInt,
            date:new Date(date),
            desc,
            stock:qrInt,
        }
    })
    return NextResponse.json({result})
}