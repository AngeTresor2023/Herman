"use client";  // Indique que le composant doit être exécuté côté client

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./ajouter.module.css";

const AjouterVente = () => {
  const router = useRouter();
  const [produits, setProduits] = useState([]);
  const [produitId, setProduitId] = useState('');  // État pour l'ID du produit sélectionné
  const [nomproduit, setNomproduit] = useState('');  // Nom du produit sélectionné
  const [desc, setDesc] = useState('');
  const [nomclient, setNomclient] = useState('');
  const [prixvente, setPrixvente] = useState('');
  const [qtevendu, setQtevendu] = useState('');
  const [date, setDate] = useState('');
  const [avance, setAvance] = useState('');
  const [reste, setReste] = useState('');
  const [name, setName] = useState(''); // Nom de la vente généré automatiquement
  const [errorMessage, setErrorMessage] = useState('');


  const handleProduitChange = (event) => {
    const selectedProduit = produits.find(p => p.id === event.target.value);
    setProduitId(selectedProduit.id);  // Stocke l'ID du produit sélectionné
    setNomproduit(selectedProduit.name);  // Met à jour le nom du produit sélectionné
  };

  const handleNomclientChange = (event) => setNomclient(event.target.value);
  const handleDescChange = (event) => setDesc(event.target.value);
  const handlePrixventeChange = (event) => setPrixvente(event.target.value);
  const handleQtevenduChange = (event) => setQtevendu(event.target.value);
  const handleDateChange = (event) => setDate(event.target.value);
  const handleAvanceChange = (event) => setAvance(event.target.value);
  const handleResteChange = (event) => setReste(event.target.value);
  const handleNameChange = (event) => setName(event.target.value); // Permettre à l'utilisateur de modifier le nom

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (reste < 0) {
      setErrorMessage('Le montant restant ne peut pas être négatif.');
      return;
    }

    try {
      const response = await fetch('/api/add-ventes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          produitId,  // Utilise l'ID du produit sélectionné
          nomproduit,
          desc,
          nomclient,
          prixvente: parseInt(prixvente, 10),
          qtevendu: parseInt(qtevendu, 10),
          date,
          avance: parseInt(avance, 10),
          reste: parseInt(reste, 10),
          name
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Erreur lors de la création de la vente.');
        return;
      }

      router.refresh();  // Actualiser la page ou rediriger après la soumission
    } catch (error) {
      console.error(error);
      setErrorMessage('Une erreur est survenue lors de la soumission du formulaire.');
    }

    // Réinitialiser les champs du formulaire
    setProduitId('');
    setNomproduit('');
    setDesc('');
    setNomclient('');
    setPrixvente('');
    setQtevendu('');
    setDate('');
    setAvance('');
    setReste('');
    setName('');
  };

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

  const fetchProduits = async () => {
    try {
      const response = await fetch('/api/get-produits'); // Assurez-vous que cette route existe et retourne les produits
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      return [];
    }
  };

 /* const generateNomVente = async (nomproduit, nomclient) => {
    let baseName = `${nomproduit}${nomclient}`;
    let uniqueName = baseName;
    let suffix = 1;

    while (await checkIfNomVenteExists(uniqueName)) {
      uniqueName = `${baseName} (${suffix})`;
      suffix += 1;
    }

    return uniqueName;
  };

  const checkIfNomVenteExists = async (nomVente) => {
    try {
      const response = await fetch(`/api/check-nom-vente?nomVente=${encodeURIComponent(nomVente)}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Erreur lors de la vérification du nom de vente:', error);
      return false;
    }
  };*/

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <select name="produit" value={produitId} onChange={handleProduitChange} required>
          <option value="">Sélectionnez un produit</option>
          {produits.length > 0 ? (
            produits.map((produit) => (
              <option key={produit.id} value={produit.id}>
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
          name="date"
          value={date}
          onChange={handleDateChange} 
          required
        />

        <input 
          type="text"
          name="nomclient"
          placeholder="Nom du client" 
          value={nomclient} 
          onChange={handleNomclientChange} 
          required
        />

        <input 
          type="number" 
          name="prixvente"
          placeholder="Prix de Vente" 
          value={prixvente} 
          onChange={handlePrixventeChange} 
          required
        />

        <input 
          type="number" 
          name="qtevendu"
          placeholder="Quantité Vendue" 
          value={qtevendu} 
          onChange={handleQtevenduChange} 
          required
        />

        <input 
          type="number" 
          name="avance"
          placeholder="Avance" 
          value={avance} 
          onChange={handleAvanceChange} 
          required
        />

        <input 
          type="number" 
          name="reste"
          placeholder="Reste" 
          value={reste} 
          onChange={handleResteChange} 
          readOnly
        />

        <textarea 
          name="desc" 
          id="desc" 
          rows="2" 
          placeholder="Description" 
          value={desc} 
          onChange={handleDescChange} 
          required
        />

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default AjouterVente;
