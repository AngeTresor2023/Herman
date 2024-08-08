"use server"
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

// Ajouter un utilisateur
export const addUser = async (formData) => {
    const { name, surname, email, password, phone, ville, desc, isAdmin, cat } = Object.fromEntries(formData);

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await prisma.user.create({
            data: {
                name,
                surname,
                email,
                password: hashedPassword,
                phone,
                ville,
                desc,
                isAdmin,
                cat,
            },
        });
    } catch (err) {
        console.error(err);
        throw new Error("Failed to create user");
    }

    revalidatePath("/dashboard/utilisateurs");
    redirect("/dashboard/utilisateurs");
};

// Supprimer un utilisateur
export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        await prisma.user.delete({
            where: { id },
        });
    } catch (err) {
        console.error(err);
        throw new Error("Failed to delete user");
    }

    revalidatePath("/dashboard/utilisateurs");
};

// Mettre à jour un utilisateur
export const updateUser = async (formData) => {
    const { id, name, surname, email, password, phone, ville, desc, isAdmin, cat } = Object.fromEntries(formData);

    try {
        const updateFields = { name, surname, email, password, phone, ville, desc, isAdmin, cat };
        Object.keys(updateFields).forEach(
            (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
        );

        await prisma.user.update({
            where: { id },
            data: updateFields,
        });
    } catch (err) {
        console.error(err);
        throw new Error("Failed to update user");
    }

    revalidatePath("/dashboard/utilisateurs");
    redirect("/dashboard/utilisateurs");
};

// Ajouter un produit
export const addProduit = async (formData) => {
    const { name, date, qa, qr, pa, pv, sa, desc } = Object.fromEntries(formData);

    try {
        const stock = qr;
        const newProduit = await prisma.produit.create({
            data: {
                name,
                date: new Date(date),
                qa,
                qr,
                pa,
                pv,
                sa,
                desc,
                stock,
            },
        });

        const ventes = await prisma.vente.findMany();

        // Mise à jour de la liste des produits pour chaque vente
        for (const vente of ventes) {
            const updatedListeProduits = [...JSON.parse(vente.listeproduits || '[]'), { id: newProduit.id, name: newProduit.name }];
            await prisma.vente.update({
                where: { id: vente.id },
                data: { listeproduits: JSON.stringify(updatedListeProduits) },
            });
        }

        await prisma.produitHistory.create({
            data: {
                produitId: newProduit.id,
                name: newProduit.name,
                date: new Date(date),
                desc,
                qa,
                qr,
                pa,
                pv,
                sa,
                stock,
            },
        });
    } catch (err) {
        console.error(err);
        throw new Error("Failed to create produit");
    }

    revalidatePath("/dashboard/produits");
    redirect("/dashboard/produits");
};

// Supprimer un produit
export const deleteProduit = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        await prisma.produit.update({
            where: { id },
            data: { activite: "Inactive" },
        });
    } catch (err) {
        console.error(err);
        throw new Error("Failed to update produit state");
    }

    revalidatePath("/dashboard/produits");
};

// Mettre à jour un produit
export const updateProduit = async (formData) => {
    const { id, stock, pv, desc } = Object.fromEntries(formData);

    if (!id) {
        throw new Error("Product ID is required");
    }

    try {
        const updateFields = { 
            stock: stock ? parseInt(stock, 10): undefined, 
            pv: pv ? parseInt(pv, 10): undefined, 
            desc };
        Object.keys(updateFields).forEach(
            (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
        );

        const produit = await prisma.produit.update({
            where: { id },
            data: updateFields,
        });

       /* await prisma.produitHistory.create({
            data: {
                produitId: produit.id,
                name: produit.name,
                date: produit.date,
                desc: produit.desc,
                qa: produit.qa,
                qr: produit.qr,
                pa: produit.pa,
                pv: produit.pv,
                sa: produit.sa,
                stock: produit.stock,
                img: produit.img || null,
        
            },
        });*/
    } catch (err) {
        console.error(err);
        throw new Error("Failed to update produit");
    }

    revalidatePath("/dashboard/produits");
    redirect("/dashboard/produits");
};

// Ajouter un client
export const addClient = async (formData) => {
    const { name, surname, phone, ville, desc, cat } = Object.fromEntries(formData);

    try {
        await prisma.client.create({
            data: {
                name,
                surname,
                phone,
                ville,
                desc,
                cat,
            },
        });
    } catch (err) {
        console.error(err);
        throw new Error("Failed to create client");
    }

    revalidatePath("/dashboard/clients");
    redirect("/dashboard/clients");
};

// Supprimer un client
export const deleteClient = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        await prisma.client.delete({
            where: { id },
        });
    } catch (err) {
        console.error(err);
        throw new Error("Failed to delete client");
    }

    revalidatePath("/dashboard/clients");
};

// Ajouter une vente

export const addVente = async (formData) => {
    const { nomproduit, qtevendu, nomclient, prixvente, date, avance, desc } = Object.fromEntries(formData);

    try {
        // Chercher le produit par son nom
        const produit = await prisma.produit.findUnique({
            where: { name: nomproduit },
        });

        // Vérifier si le produit existe
        if (!produit) {
            throw new Error("Produit not found");
        }

        // Mettre à jour le stock du produit
        const newStock = produit.stock - parseInt(qtevendu, 10);
        if (newStock < 0) {
            throw new Error("Insufficient stock for the product");
        }

        // Mise à jour du stock du produit
        await prisma.produit.update({
            where: { id: produit.id },
            data: { stock: newStock },
        });

        // Calcul du reste
        const total = parseInt(prixvente, 10) * parseInt(qtevendu, 10);
        const avanceInt = parseInt(avance, 10);
        const reste = total - avanceInt;

        // Vérifier que le reste n'est pas négatif
        if (reste < 0) {
            throw new Error("Le montant restant ne peut pas être négatif.");
        }

        // Créer une nouvelle vente
        const newVente = await prisma.vente.create({
            data: {
                nomproduit,
                date: new Date(date),
                qtevendu: parseInt(qtevendu, 10),
                prixvente: parseInt(prixvente, 10),
                avance: avanceInt,
                reste,
                desc,
                nomclient,
            },
        });

        // Créer une nouvelle entrée dans l'historique des ventes
        await prisma.venteHistory.create({
            data: {
                venteId: newVente.id,
                nomproduit,
                date: new Date(date),
                qtevendu: parseInt(qtevendu, 10),
                prixvente: parseInt(prixvente, 10),
                avance: avanceInt,
                reste,
                desc,
                nomclient,
            },
        });

        // Créer une nouvelle entrée dans l'historique des produits
        await prisma.produitHistory.create({
            data: {
                produitId: produit.id,
                name: produit.name,
                date: new Date(),
                desc: produit.desc,
                qa: produit.qa,
                qr: produit.qr,
                pa: produit.pa,
                pv: produit.pv,
                sa: produit.sa,
                stock: newStock,
            },
        });
    } catch (err) {
        console.error(err);
        throw new Error("Failed to add vente");
    }

    revalidatePath("/dashboard/vente");
    redirect("/dashboard/vente");
};

// Mettre à jour une vente
export const updateVente = async (formData) => {
    const { id, name, nomproduit, qtevendu, nomclient, prixvente, date, avance, desc } = Object.fromEntries(formData);

    if (!id) {
        throw new Error("ID is required to update the vente");
    }

    try {
        const qtevenduInt = qtevendu ? parseInt(qtevendu, 10) : undefined;
        const prixventeInt = prixvente ? parseInt(prixvente, 10) : undefined;
        const avanceInt = avance ? parseInt(avance, 10) : undefined;

        // Calculate the total and reste
        const total = prixventeInt && qtevenduInt ? prixventeInt * qtevenduInt : undefined;
        const reste = total && avanceInt !== undefined ? total - avanceInt : undefined;

        if (reste !== undefined && reste < 0) {
            throw new Error("Le montant restant ne peut pas être négatif.");
        }

        const updateFields = { 
            name, 
            nomproduit, 
            qtevendu: qtevenduInt,
            nomclient, 
            prixvente: prixventeInt, 
            date, 
            avance: avanceInt, 
            reste, 
            desc 
        };

        // Remove empty or undefined fields
        Object.keys(updateFields).forEach(
            (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
        );

        const vente = await prisma.vente.update({
            where: { id },
            data: updateFields,
        });

        /*await prisma.venteHistory.create({
            data: {
                venteId: vente.id,
                name: vente.name,
                nomproduit: vente.nomproduit,
                date: vente.date,
                qtevendu: vente.qtevendu,
                prixvente: vente.prixvente,
                avance: vente.avance,
                reste: vente.reste,
                desc: vente.desc,
                nomclient: vente.nomclient,
            },
        });*/

        revalidatePath("/dashboard/vente");
        redirect("/dashboard/vente");
    } catch (err) {
        console.error(err);
        throw new Error("Failed to update vente");
    }
};

/////delete vente

export const deleteVente = async (id) => {
    if (!id) {
      throw new Error("ID is required to delete the vente");
    }
  
    try {
      // Supprimer la vente
      await prisma.vente.delete({
        where: { id },
      });
  
      // Vous pouvez également supprimer l'historique associé si nécessaire
      /* await prisma.venteHistory.deleteMany({
        where: { venteId: id },
      }); */
  
      revalidatePath("/dashboard/vente");
      redirect("/dashboard/vente");
    } catch (err) {
      console.error(err);
      throw new Error("Failed to delete vente");
    }
  };




// Fonction d'authentification
export const authenticate = async (formdata) => {
    const { username, password } = Object.fromEntries(formdata);

    try {
        await signIn("credentials", { username, password });
    } catch (err) {
        if (err.message.includes("CredentialsSignin")) {
            return "Wrong Credentials";
        }
        throw err;
    }
};
