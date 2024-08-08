import React from 'react'
import styles from "@/app/ui/dashboard/produits/produits.module.css"
import Recherche from '@/app/ui/dashboard/recherche/recherche'
import Link from 'next/link'
import Image from 'next/image'
import Pagination from '@/app/ui/dashboard/pagination/pagination'
import { fetchProduits } from '@/app/lib/dataPrisma';





const PageProduits = async ({searchParams}) => {

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, produits } = await fetchProduits(q, page);
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Recherche placeholder="Rechercher un produit..."/>
        <div className={styles.ajouter}>
        <Link href="/dashboard/produits/ajouter">
          <button className={styles.addButton}>Ajouter un produit</button>
        </Link>
        
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>


            <td>Nom</td>
            <td>stock</td>
            <td>Prix</td>
            <td>Modifié le:</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {produits.map((produit) => (
          <tr key={produit.id}>
            <td>
              <div className={styles.produits}>
                <Image
                src={produit.img || "/avatarProduit.png"}
                alt=''
                width={40}
                height={40}
                className={styles.produitsImage}
                />
                {produit.name}

              </div>
             </td>

             <td >{produit.stock}</td>
             <td>{produit.pv}</td>
             <td>{formatDate(produit.updatedAt)}</td>
             <td>
              <div className={styles.buttons}>
              <Link href={`/dashboard/produits/${produit.id}`}>
                <button className={`${styles.button} ${styles.view}`}>Voir</button>
                </Link>
                <Link href={`/dashboard/produits/retrait/${produit.id}`}>
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

export default PageProduits
