import React from 'react'
import styles from "./footer.module.css"

const Footer = () => {
  return (
    <div className={styles.container}>
        <div className={styles.logo}>Ange Djomo</div>
        <div className={styles.text}>© Copyright 2022 Ange Djomo. All rights reserved</div>
    </div>
  )
}

export default Footer