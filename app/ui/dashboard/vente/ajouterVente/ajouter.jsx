"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from "./ajouter.module.css"

const fetchProduits = async () => {
    try {
      const response = await fetch('/api/get-produits'); // Assurez-vous que cette route existe et retourne les produits
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      return [];
    }
  }

const AjouterVente = () => {
  const router = useRouter();
  const [produits, setProduits] = useState([]);
  const [nomproduit, setNomproduit] = useState('');
  const [desc, setDesc] = useState('');
  const [nomclient, setNomclient] = useState('');
  const [prixvente, setPrixvente] = useState('');
  const [qtevendu, setQtevendu] = useState('');
  const [date, setDate] = useState('');
  const [avance, setAvance] = useState('');
  const [reste, setReste] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const calculateReste = () => {
    const total = (parseInt(prixvente, 10) || 0) * (parseInt(qtevendu, 10) || 0);
    const totalAvance = parseInt(avance, 10) || 0;
    const calculatedReste = total - totalAvance;

    if (calculatedReste < 0) {
      setErrorMessage('Le montant restant ne peut pas être négatif.');
      setReste(0);
    } else {
      setErrorMessage('');
      setReste(calculatedReste);
    }
  };


  useEffect(() => {
    calculateReste();
  }, [prixvente, qtevendu, avance]);

  useEffect(() => {
    const fetchData = async () => {
      const produitsData = await fetchProduits();
      setProduits(produitsData);
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (reste < 0) {
        setErrorMessage('Le montant restant ne peut pas être négatif.');
        return;
      }

    try {
      await fetch('/api/add-ventes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomproduit,
          desc,
          nomclient,
          prixvente: parseInt(prixvente, 10),
          qtevendu: parseInt(qtevendu, 10),
          date,
          avance: parseInt(avance, 10),
          reste: parseInt(reste, 10),
        }),
      });

      router.refresh();
    } catch (error) {
      console.error(error);
    }

    setNomproduit('');
    setDesc('');
    setNomclient('');
    setPrixvente('');
    setQtevendu('');
    setDate('');
    setAvance('');
    setReste('');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
      <select name="nomproduit" value={nomproduit} onChange={(e) => setNomproduit(e.target.value)} required>
          <option value="">Sélectionnez un produit</option>
          {produits.length > 0 ? (
            produits.map((produit) => (
              <option key={produit.id} value={produit.name}>
                {produit.name}
              </option>
            ))
          ) : (
            <option disabled>Aucun produit trouvé.</option>
          )}
        </select>

        <input 
          type="date" 
          placeholder="Date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />

        <input 
          type="text" 
          placeholder="Nom du client" 
          value={nomclient} 
          onChange={(e) => setNomclient(e.target.value)} 
        />

        <input 
          type="number" 
          placeholder="Prix de Vente" 
          value={prixvente} 
          onChange={(e) => setPrixvente(e.target.value)} 
        />

        <input 
          type="number" 
          placeholder="Quantité Vendue" 
          value={qtevendu} 
          onChange={(e) => setQtevendu(e.target.value)} 
        />

        <input 
          type="number" 
          placeholder="Avance" 
          value={avance} 
          onChange={(e) => setAvance(e.target.value)} 
        />

        <input 
          type="number" 
          placeholder="Reste" 
          value={reste} 
          onChange={(e) => setReste(e.target.value)} 
          readOnly
        />

        <textarea 
          name="desc" 
          id="desc" 
          rows="2" 
          placeholder="Description" 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)} 
        />

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}

export default AjouterVente;
