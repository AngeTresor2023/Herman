import React from 'react'
import { fetchlisteProduits } from '@/app/lib/dataPrisma'; 

const produitsync = async () => {
  const produits  = await fetchlisteProduits();
  console.log(produits);
  
  return (
        <select name="nomproduit" required>
                    <option value="">Sélectionnez un produit</option>
                    {produits.map((produit) => (
                        <option key={produit._id} value={produit.name}>
                            {produit.name}
                        </option>
                    ))}
                </select>
                )};

    export default produitsync