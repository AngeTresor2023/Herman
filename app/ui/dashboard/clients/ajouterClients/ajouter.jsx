
import React from 'react'
import styles from "./ajouter.module.css"
import { addClient } from '@/app/lib/actionPrisma'


const AjouterClients = () => {
  return (
    <div className={styles.container}>
        <form action={addClient} className={styles.form}>
            <input type="text" placeholder='Nom' name= "name" required />
            <input type="text" placeholder='Prénom' name= "surname" required/>
            <input type="phone" placeholder='Téléphone' name= "phone"  required/>
            <input type="text" placeholder="Ville d'activité" name= "ville"  />
            <select name= "cat" id="cat">
                <option value="general">Choisir un role</option>
                <option value="Vendeur">Détaillant</option>
                <option value="Acheteur">Grossiste</option>
            </select>
            
            <textarea
            name= "desc" 
            id="desc"
            rows="16"
            placeholder='Description'/>
            <button type="submit">Enregistrer</button>

        </form>
    </div>
  )
}

export default AjouterClients