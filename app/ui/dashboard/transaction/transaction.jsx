
import React from 'react'
import styles from "./transaction.module.css"
import Image from 'next/image';
import Recherche from '@/app/ui/dashboard/recherche/recherche'
import Link from 'next/link'
import Pagination from '@/app/ui/dashboard/pagination/pagination'
import { fetchVentes } from '@/app/lib/dataPrisma';



const Transaction = async (searchParams) => {

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, ventes } = await fetchVentes(q, page);
  console.log(ventes);

  const recentVentes = ventes.slice(0, 4);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ventes les plus récentes</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Date</td>
            <td>Nom du produit</td>
            <td>Qré Vendu</td>
            <td>Nom du client</td>
          </tr>
        </thead>
        <tbody>
        {recentVentes.map((vente) => (
          <tr key={vente.id}>
            <td>
              <div className={styles.produits}>
                {formatDate(vente.date)}
              </div>
             </td>

             <td>{vente.nomproduit}</td>
             <td>{vente.qtevendu}</td>
             <td>{vente.nomclient}</td>
            </tr>
        ))}

        </tbody>
      </table>

    </div>
  )
}

export default Transaction