import React from 'react';
import styles from "./singleProduct.module.css";
import Image from 'next/image';
import QRCodeGenerator from '@/app/ui/dashboard/qrcode/Generateur/scanner';
import { fetchVente } from '@/app/lib/dataPrisma';
import { updateVente } from '@/app/lib/actionPrisma';

const SingleVentePage = async ({ params }) => {
    const { id } = params;
    const vente = await fetchVente(id);
    console.log(vente);
    /*console.log(produit.id);*/
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
      };
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <QRCodeGenerator
                        name={vente.name}
                        reste={vente.reste}
                        Client={vente.nomclient}
                    />
                </div>
                {vente.name}
            </div>
            <div className={styles.formContainer}>
                <form action={updateVente} className={styles.form}>
                    
                    <label>Nom du produit: {vente.nomproduit}</label>
                    <label>Date de vente : { formatDate(vente.date)}</label>
                    <label>Nom du client : {vente.nomclient}</label>
                    <label>Quantité vendu : {vente.qtevendu}</label>
                    <label>Prix de vente : {vente.prixvente}</label>
                    <label>Avance : {vente.avance}</label>
                    <label>Reste : {vente.reste}</label>
                    <label>Description : {vente.desc}</label>
                    
                </form>
            </div>
        </div>
    );
}

export default SingleVentePage;
