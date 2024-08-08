import React from 'react';
import styles from "./singleProduct.module.css";
import Image from 'next/image';
import QRCodeGenerator from '@/app/ui/dashboard/qrcode/Generateur/scanner';
import { fetchProduit } from '@/app/lib/dataPrisma';
import { updateProduit } from '@/app/lib/actionPrisma';

const SingleProductPage = async ({ params }) => {
    const { id } = params;
    const produit = await fetchProduit(id);
    console.log(produit);
    /*console.log(produit.id);*/
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
      };
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image
                        src={produit.img || "/avatarProduit.png"}
                        alt="User Image"
                        width={400}
                        height={400}
                    />
                    {produit.name}
                </div>

                <div className={styles.imgContainer}>
                    <QRCodeGenerator
                        name={produit.name}
                        etat={produit.stade}
                        entreposage={produit.entrepot}
                    />
                </div>
                {produit.name}
            </div>
            <div className={styles.formContainer}>
                <form action={updateProduit} className={styles.form}>
                    
                    <label>Nom du produit: {produit.name}</label>
                    <label>Date d&apos;ajout : {formatDate(produit.date)}</label>
                    <label>Stock : {produit.stock}</label>
                    <label>Prix de d&apos;achat : {produit.pa}FCFA</label>
                    <label>Prix de vente : {produit.pv}FCFA</label>
                    <label>Description : {produit.desc}</label>
                    
                </form>
            </div>
        </div>
    );
}

export default SingleProductPage;
