"use server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Synchroniser tous les utilisateurs
export const fetchUsers = async (q, page) => {
  const ITEM_PER_PAGE = 10;
  const skip = ITEM_PER_PAGE * (page - 1);

  try {
    const count = await prisma.user.count( );
    const users = await prisma.user.findMany();
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users");
  }
};

// Tous les produits
export const fetchlisteProduits = async () => {
  try {
    const produits = await prisma.produit.findMany();
    return produits;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch produits");
  }
};

// Rechercher des produits avec pagination
export const fetchProduits = async (q, page) => {
  const ITEM_PER_PAGE = 10;
  const skip = ITEM_PER_PAGE * (page - 1);

  try {
    const count = await prisma.produit.count();
    const produits = await prisma.produit.findMany();
    return { count, produits };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch produits");
  }
};

// Toutes les ventes
export const fetchVentes = async (q, page) => {
  const ITEM_PER_PAGE = 10;
  const skip = ITEM_PER_PAGE * (page - 1);

  try {
    const count = await prisma.vente.count();
    const ventes = await prisma.vente.findMany();
    return { count, ventes };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch ventes");
  }
};

// Tous les clients
export const fetchClients = async (q, page) => {
  const ITEM_PER_PAGE = 10;
  const skip = ITEM_PER_PAGE * (page - 1);

  try {
    const count = await prisma.client.count();
    const clients = await prisma.client.findMany();
    return { count, clients };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch clients");
  }
};

// Synchroniser un utilisateur par ID
export const fetchUser = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user");
  }
};

// Synchroniser un produit par ID
export const fetchProduit = async (id) => {
  try {
    const produit = await prisma.produit.findUnique({
      where: { id },
    });
    return produit;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch produit");
  }
};

// Synchroniser une vente par ID
export const fetchVente = async (id) => {
  try {
    const vente = await prisma.vente.findUnique({
      where: { id },
    });
    return vente;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch vente");
  }
};

// Synchroniser un client par ID
export const fetchClient = async (id) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id },
    });
    return client;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch client");
  }
};

// Récupérer l'historique d'un produit par ID de produit
export const fetchProduitHistory = async (produitId) => {
  try {
    const history = await prisma.produitHistory.findMany({
      where: { produitId },
      orderBy: { modifiedAt: "desc" },
    });
    return history;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product history");
  }
};

// Récupérer l'historique d'une vente par ID de vente
export const fetchVenteHistory = async (venteId) => {
  try {
    const history = await prisma.venteHistory.findMany({
      where: { venteId },
      orderBy: { modifiedAt: "desc" },
    });
    return history;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch vente history");
  }
};
