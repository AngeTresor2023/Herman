"use client";
import React, { useEffect, useState } from 'react';
import styles from "@/app/ui/dashboard/transactions/transactionHistory.module.css";
import { fetchProduitHistory } from '@/app/lib/dataPrisma';
import { useRouter } from 'next/router';

const TransactionHistory = ({ produitId }) => {
  const [history, setHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProduitHistory(produitId);
      setHistory(data);
    };

    fetchData();
  }, [produitId]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={styles.container}>
      <h2>Historique des Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Nom</th>
            <th>Etat</th>
            <th>Stock</th>
            <th>Stade</th>
            <th>Modifié par</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={index}>
              <td>{formatDate(entry.modifiedAt)}</td>
              <td>{entry.name}</td>
              <td>{entry.state}</td>
              <td>{entry.stock}</td>
              <td>{entry.stade}</td>
              <td>{entry.modifiedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
