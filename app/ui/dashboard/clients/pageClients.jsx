import React from 'react'
import styles from "@/app/ui/dashboard/clients/clients.module.css"
import Recherche from '@/app/ui/dashboard/recherche/recherche'
import Link from 'next/link'
import Image from 'next/image'
import Pagination from '@/app/ui/dashboard/pagination/pagination'
import { fetchClients } from '@/app/lib/dataPrisma';
import { deleteClient } from '@/app/lib/actionPrisma';
const PageClients = async ({ searchParams }) => {

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, clients } = await fetchClients(q, page);


  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Recherche placeholder={"Rechercher un client..."}/>
        <Link href="/dashboard/clients/ajouter">
          <button className={styles.addButton}>Ajouter un client</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            
            <td>Nom</td>
            <td>Prénom</td>
            <td>Téléphone</td>
            <td>Ville</td>
            <td>Statut</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
          <tr key={client.id}>
            <td>
              <div className={styles.client}>
                <Image
                src={"/avatar.png"}
                alt=''
                width={40}
                height={40}
                className={styles.clientImage}
                />
                {client.title}
              </div>
             </td>
             <td>{client.surname}</td>
             <td>{client.phone}</td>
             <td>{client.ville}</td>
             <td>{client.cat}</td>
             
             <td>
              <div className={styles.buttons}>
              <Link href="/dashboard/clients/test">
                <button className={`${styles.button} ${styles.view}`}>Voir</button>
                </Link>
                <form action={deleteClient} >
                  <input type="hidden" name="id" value={client.id} />
                <button className={`${styles.button} ${styles.supprimer}`}>Supprimer</button>
              </form>
              </div>
             </td>
          </tr>
          ))}
        </tbody>

      </table>
      <Pagination/>
    </div>
  )
}

export default PageClients