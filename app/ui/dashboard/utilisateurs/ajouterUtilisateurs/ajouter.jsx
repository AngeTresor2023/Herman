
import React from 'react'
import styles from "./ajouter.module.css"
import { addUser } from '@/app/lib/actionPrisma'


const AjouterUtilisateurs = () => {
 
  return (
    <div className={styles.container}>
        <form action={addUser} className={styles.form}>
            <input type="text" placeholder='Nom' name= "name" required />
            <input type="text" placeholder='Prénom' name= "surname"  required/>
            <input type="phone" placeholder='Téléphone' name= "phone"  required/>
            <input type="email" placeholder='Email' name= "email"  required/>
            <input type="password" placeholder='Mot de passe' name= "password"  required/>
            <input type="text" placeholder="Ville d'activité" name= "ville"  />
            <select name= "cat" id="cat">
                <option value="general">Choisir un role</option>
                <option value="Vendeur">Commerciale</option>
                <option value="Gérant">Gérant</option>
            </select>
            <label ></label>
            <select name= "isAdmin" id="isAdmin" placeholder='Administrateur : ?'>
              <option value={false} >Administrateur ?</option>
                <option value={true}>Oui</option>
                <option value={false}>Non</option>
            </select>
            <textarea
            name= "desc" 
            id="desc"
            rows="16"
            placeholder='Description'/>
            <button type="submit">Enregistrer</button>

        </form>
    </div>
  );
};

export default AjouterUtilisateurs