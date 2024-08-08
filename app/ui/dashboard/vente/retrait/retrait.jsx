'use client'; // This directive indicates this is a client component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./produits.module.css";
import { updateVente } from '@/app/lib/actionPrisma';
import { revalidatePath } from 'next/cache';

const RetraitVenteClient = ({ venteId }) => {
    const [vente, setVente] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchVente = async () => {
            try {
                const response = await fetch(`/api/get-vente?id=${venteId}`);
                const data = await response.json();
                setVente(data);
            } catch (error) {
                console.error('Erreur de récupération de la vente:', error);
            }
        };

        fetchVente();
    }, [venteId]);

    const handleDelete = async () => {
        try {
            const response = await fetch('/api/delete-vente', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: vente.id }),
            });
    
            if (response.ok) {
                router.push('/dashboard/vente');
                revalidatePath('/dashboard/vente');
            } else {
                console.error('Failed to delete vente');
            }
        } catch (error) {
            console.error('Error deleting vente:', error);
        }
    };

    if (!vente) {
        return <div>Chargement...</div>;
    }

    const placeholderAvance = `Mise à jour de l'avance qui est de : ${vente.avance}`;
    const placeholderReste = `Mise à jour du reste à payer qui est de : ${vente.reste}`;
    const placeholderPv = `Mise à jour du prix de vente qui est de : ${vente.prixvente}`;
    const placeholderqv = `Mise à jour de la quantité vendue qui est de : ${vente.qtevendu}`;
    const placeholderProduit = `Nom du produit : ${vente.nomproduit}`;

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form action={updateVente} className={styles.form}>
                    <input type="hidden" name="id" value={vente.id} />
                    <h3>Mise à jour</h3>
                    <input type="text" placeholder={placeholderProduit} readOnly />
                    <input type="hidden" name="id" value={vente.id} />
                    <input type="number" placeholder={placeholderAvance} name="avance" />
                    <input type="number" placeholder={placeholderqv} name="qtevendu" />
                    <input type="number" placeholder={placeholderPv} name="reste" />
                    <textarea
                        name="desc"
                        id="note"
                        rows="8"
                        placeholder={vente.desc}
                    />
                    <button type="submit" className={`${styles.button} ${styles.enregistrer}`}>
                        Enregistrer
                    </button>
                </form>
                <div className={styles.supprime}>
                    <a className={styles.supprimer} href='/dashboard/vente'>Retour</a>
                    <button onClick={handleDelete} className={`${styles.button} ${styles.supprimer}`}>
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RetraitVenteClient;
