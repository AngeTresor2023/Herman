import React from 'react'
import styles from "./produits.module.css"
import Recherche from '../recherche/recherche'

const Produits = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Recherche/>
      </div>
      <table>

      </table>
    </div>
  )
}

export default Produits