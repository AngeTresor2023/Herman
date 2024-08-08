
import React from 'react'
import styles from "@/app/ui/dashboard/utilisateurs/utilisateurs.module.css"
import Recherche from '@/app/ui/dashboard/recherche/recherche'
import Link from 'next/link'
import Image from 'next/image'
import Pagination from '@/app/ui/dashboard/pagination/pagination'
import { fetchUsers } from '@/app/lib/dataPrisma';


const PageUtilisateur = async ({searchParams}) => {

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await fetchUsers(q, page);
  
  
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Recherche placeholder={"Rechercher un utilisateur..."}/>
        <Link href="/dashboard/utilisateurs/ajouter">
          <button className={styles.addButton}>Ajouter un utilisateur</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            
            <td>Nom</td>
            <td>Prénom</td>
            <td>Email</td>
            <td>Rôle</td>
            <td>Statut</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
            <td>
              <div className={styles.user}>
                <Image
                src={user.img || "/avatar.png"}
                alt=''
                width={40}
                height={40}
                className={styles.userImage}
                />
                {user.name}
              </div>
             </td>
             
             <td>{user.surname}</td>
             <td>{user.email}</td>
             <td>{user.cat}</td>
             <td>{user.isAdmin ? "Administrateur" : "Utilisateur"}</td>
             <td>
              <div className={styles.buttons}>
              <Link href={`/dashboard/utilisateurs/${user.id}`}>
                <button className={`${styles.button} ${styles.view}`}>Voir</button>
                </Link>
                <form action={deleteUser}  >
                  <input type="hidden" name="id" value={user.id} />
                <button className={`${styles.button} ${styles.supprimer}`}>Supprimer</button>
              </form>
              </div>
             </td>
          </tr>
          ))}
        </tbody>
      </table>
      <Pagination count = {count} />
    </div>
  )
}

export default PageUtilisateur
