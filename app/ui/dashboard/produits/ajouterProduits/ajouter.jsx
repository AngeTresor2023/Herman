"use client"
import React, { useState } from 'react'
import styles from "./ajouter.module.css"
import { useRouter } from 'next/navigation'

import { addProduit } from '@/app/lib/actionPrisma'

const AjouterProduits = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [pa, setPa] = useState('');
  const [qa, setQa] = useState('');
  const [qr, setQr] = useState('');
  const [date, setDate] = useState('');
  const [pv, setPv] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDescChange = (event) => {
        setDesc(event.target.value);
    };
  const handlePaChange = (event) => {
        setPa(event.target.value);
      };
  const handleQaChange = (event) => {
        setQa(event.target.value);
        };
  const handleQrChange = (event) => {
        setQr(event.target.value);
          };
  const handleDateChange = (event) => {
        setDate(event.target.value);
            };
  const handlePvChange = (event) => {
        setPv(event.target.value);
              };
  const handleSubmit = async (event) => {
        event.preventDefault();
        
                try{
                  fetch ('/api/add-produits', {
                    method: 'POST', 
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name, qa, qr, desc, pv, pa, date}) })

                    router.refresh()
                } catch (error){
                  console.error(error);
                }

                setName('');
                setDesc('');
                setPa('');
                setQa('');
                setQr('');
                setDate('');
                setPv('');
              };


  
  return (
    <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder='Nom du produit'
          name="name"
          value={name}
          onChange={handleNameChange}
          required
        />
        <input
          type="date"
          placeholder='Date'
          name="date"
          value={date}
          onChange={handleDateChange}
        />
        <input
          type="number"
          placeholder='Quantité Achaté'
          name="qa"
          value={qa}
          onChange={handleQaChange}
        />
        <input
          type="number"
          placeholder='Quantité Recu'
          name="qr"
          value={qr}
          onChange={handleQrChange}
        />
        <input
          type="number"
          placeholder="Prix d'Achat"
          name="pa"
          value={pa}
          onChange={handlePaChange}
        />
        <input
          type="number"
          placeholder="Prix de Vente"
          name="pv"
          value={pv}
          onChange={handlePvChange}
        />
        <textarea
          name="desc"
          id="desc"
          rows="2"
          placeholder='Description'
          value={desc}
          onChange={handleDescChange}
        />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  )
}

export default AjouterProduits