"use server"
import React from 'react'
import styles from "./singleUser.module.css"
import Image from 'next/image'
import { fetchUser } from '@/app/lib/dataPrisma';
import { updateUser } from '@/app/lib/actionPrisma';

const SingleUserPage = async ({ params }) => {
    const { id } = params;
    const user = await fetchUser(id);

    console.log(user);
  return (
    <div className={styles.container}>
        <div className={styles.infoContainer}>
            <div className={styles.imgContainer}>
                <Image
                src={user.img || "/avatar.png"}
                alt="User Image"
                width={400}
                height={400}
                />
                {user.name}
            </div>
            
        </div>
        <div className={styles.formContainer}>
            <form action={updateUser} className={styles.form}>
                <input type="hidden" name="id" value={user.id}/>
                <label>Nom de l&apos;équipier(e):</label>
                <input type="text" name= "name" placeholder= {user.name} />
                <label>Prenom de l&apos;équipier(e):</label>
                <input type="text" name= "surname" placeholder= {user.surname} />
                <label>Téléphone :</label>
                <input type="phone" name= "phone" placeholder= {user.phone} />
                <label>Ville d&apos;activité :</label>
                <input type="text" name= "ville" placeholder= {user.ville} />
                <label>Email :</label>
                <input type="email" name= "email" placeholder= {user.email} />
                <label>Mot de passe :</label>
                <input type="Passeword" name= "password" placeholder='Mot de passe' />
                <label>Role :</label>
                <select name="cat" id="cat">
                    <option value="general">Choisir un role</option>
                    <option value="Vendeur">Commerciale</option>
                    <option value="Gérant">Gérant</option>
                    <option value="Admin">Administrateur</option>
                </select>
                <label>Description :</label>
                <textarea
                name="desc" 
                id="desc"
                placeholder='Description'/>
                <button type="submit">Enregistrer</button>

            </form>
        </div>
    </div>
  )
}

export default SingleUserPage