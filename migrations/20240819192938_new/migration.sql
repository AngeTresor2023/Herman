-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cat" TEXT,
    "ville" TEXT,
    "img" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "desc" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "qa" INTEGER,
    "stock" INTEGER,
    "qr" INTEGER,
    "pa" DOUBLE PRECISION,
    "pv" DOUBLE PRECISION,
    "img" TEXT,
    "sa" DOUBLE PRECISION,
    "desc" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vente" (
    "id" TEXT NOT NULL,
    "nomproduit" TEXT NOT NULL,
    "qtevendu" INTEGER NOT NULL,
    "nomclient" TEXT NOT NULL,
    "prixvente" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "avance" INTEGER NOT NULL,
    "reste" INTEGER NOT NULL,
    "desc" TEXT,
    "produitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "ville" TEXT,
    "img" TEXT,
    "cat" TEXT,
    "desc" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProduitHistory" (
    "id" TEXT NOT NULL,
    "produitId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "qa" INTEGER NOT NULL,
    "qr" INTEGER NOT NULL,
    "pa" DOUBLE PRECISION NOT NULL,
    "pv" DOUBLE PRECISION NOT NULL,
    "img" TEXT,
    "sa" DOUBLE PRECISION NOT NULL,
    "desc" TEXT NOT NULL,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProduitHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VenteHistory" (
    "id" TEXT NOT NULL,
    "venteId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "qtevendu" INTEGER NOT NULL,
    "prixvente" DOUBLE PRECISION NOT NULL,
    "avance" DOUBLE PRECISION NOT NULL,
    "reste" DOUBLE PRECISION NOT NULL,
    "desc" TEXT NOT NULL,
    "nomclient" TEXT NOT NULL,
    "nomproduit" TEXT NOT NULL,
    "img" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VenteHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Client_surname_key" ON "Client"("surname");

-- AddForeignKey
ALTER TABLE "Vente" ADD CONSTRAINT "Vente_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProduitHistory" ADD CONSTRAINT "ProduitHistory_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenteHistory" ADD CONSTRAINT "VenteHistory_venteId_fkey" FOREIGN KEY ("venteId") REFERENCES "Vente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
