import React from 'react'
import styles from "./card.module.css"
import { MdOutlineSupervisedUserCircle } from 'react-icons/md'
import { fetchProduits } from '@/app/lib/dataPrisma'

const Card = () => {
  return (
    <div className={styles.container}>
      <MdOutlineSupervisedUserCircle size={24}/>
      <div className={styles.text}>
        <span className={styles.titles}>Nos Produits</span>
        <span className={styles.number}> {fetchProduits.count} </span>
        <span className={styles.detail}>
          <span className={styles.positive}>12%</span> mieux qu&apos;avant
        </span>
      </div>
    </div>
  )
}

export default Card