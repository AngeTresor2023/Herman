
import React from 'react'
import styles from "./produits.module.css"
import Image from 'next/image'
import QRCodeGenerator from '@/app/ui/dashboard/qrcode/Generateur/scanner'
import { fetchProduit } from '@/app/lib/dataPrisma'
import { updateProduit } from '@/app/lib/actionPrisma'

const RetraitProductPage = async ({ params }) => {
    const { id } = params;
    const produit = await fetchProduit(id);
    console.log(produit)
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
            <form action={ updateProduit } className={styles.form}>
                <input type="hidden" name="id" value={produit.id} />
                <h3> Mise a jour </h3>
                <label>Nom du produit: {produit.name}</label>
                <input type="hidden" name="id" value={produit.id} />
                <input type="number" placeholder='Mise a jour du stock' name="stock"  />
                <input type="number" placeholder='Mise a jour du prix de vente' name="pv" />
                <textarea
                    name="desc" 
                    id="note"
                    rows="8"
                    placeholder= {produit.desc} 
                />

                
                <button type="submit" className= {`${styles.button} ${styles.enregistrer}`}> 
                    Enregistrer 

                </button>
                </form>
                    <a className={styles.supprimer} href='/dashboard/produits'>Annuler</a>
                </div>
        </div>
  )
}

export default RetraitProductPage