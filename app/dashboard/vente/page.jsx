"use  client"
import React from 'react'
import styles from "@/app/ui/dashboard/produits/produits.module.css"
import Recherche from '@/app/ui/dashboard/recherche/recherche'
import Link from 'next/link'
import Pagination from '@/app/ui/dashboard/pagination/pagination'
import { fetchVentes } from '@/app/lib/dataPrisma';





const PageVentes = async ({searchParams}) => {

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, ventes } = await fetchVentes(q, page);
  console.log(ventes);
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Recherche placeholder="Rechercher une vente..."/>
        <div className={styles.ajouter}>
        <Link href="/dashboard/vente/ajouter">
          <button className={styles.addButton}>Ajouter une vente</button>
        </Link>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>


            <td>Vendu le:</td>
            <td>Produit</td>
            <td>Quantité vendu</td>
            <td>Prix Unitaire</td>
            <td>Avance</td>
            <td>Reste</td>
            <td>Client</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {ventes.map((vente) => (
          <tr key={vente.id}>
            <td>
              <div className={styles.produits}>
                {formatDate(vente.date)}
              </div>
             </td>

             <td>{vente.nomproduit}</td>
             <td>{vente.qtevendu}</td>
             <td>{vente.prixvente} FCFA</td>
             <td>{vente.avance} FCFA</td>
             <td>{vente.reste} FCFA</td>
             <td>{vente.nomclient}</td>
             <td>
              <div className={styles.buttons}>
              <Link href={`/dashboard/vente/${vente.id}`}>
                <button className={`${styles.button} ${styles.view}`}>Voir</button>
                </Link>
                <Link href={`/dashboard/vente/retrait/${vente.id}`}>
                <button className={`${styles.button} ${styles.view}`}>Gérer</button>
                </Link>
                
              </div>
             </td>
          </tr>
          ))}
        </tbody>
      </table>
      <Pagination count ={count}/>
    </div>
  )
}

export default PageVentes