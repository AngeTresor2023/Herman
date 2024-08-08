'use client'
import React from 'react'
import styles from "./singleClient.module.css"
import Image from 'next/image'
const SingleClientPage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.infoContainer}>
            <div className={styles.imgContainer}>
                <Image
                src="/avatar.png"
                alt="User Image"
                width={400}
                height={400}
                />
            </div>
            John Doe
        </div>
        <div className={styles.formContainer}>
            <form action="" className={styles.form}>
            <label for="name">Nom du client :</label>
            <input type="text" placeholder='Nom' name="name "required />
            <label for="prenom">Prénom du client :</label>
            <input type="text" placeholder='Prénom' name="surname"  required/>
            <label for="email">Téléphone du client :</label>
            <input type="phone" placeholder='Téléphone' name="phone"  required/>
            <label >Ville d&apos;activité du client :</label>
            <input type="text" placeholder="Ville d'activité" name="ville"  />
            <select name="cat" id="cat">
                <option value="general">Choisir un role</option>
                <option value="Vendeur">Détaillant</option>
                <option value="Acheteur">Grossiste</option>
            </select>
                <label>Description du produit :</label>
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

export default SingleClientPage