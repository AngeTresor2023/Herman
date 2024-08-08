import React from 'react'
import styles from "./rightbar.module.css"
import Image from 'next/image'
import { MdPlayCircleFilled } from 'react-icons/md'
const Rightbar = () => {
  return (
    <div className={styles.container}>
      <h2 >Les mieux vendus</h2>
      <div className={styles.text}>
        <span className={styles.text}>
        Les mieux vendus
        </span>
        <button className={styles.button}>
          <MdPlayCircleFilled/>
          Voir les détails
        </button>
      </div>
    </div>
    /*<div className={styles.item}>
      <div className={styles.text}>
        <span className={styles.notifications}>
          Merci
        </span>
      </div>
    </div>*/
  )
}

export default Rightbar