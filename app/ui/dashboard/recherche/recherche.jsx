
"use client"
import React from 'react'
import styles from "./recherche.module.css"
import { MdSearch } from 'react-icons/md'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'


  const Recherche = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const handleSearch =(e)=>{ 
  const params = new URLSearchParams(searchParams)
  if(e.target.value){
    params.set('q', e.target.value);

  }else{
    params.delete('q');
  }
  params.set("q", e.target.value);
  replace(`${pathname}?${params}`);
}

  return (
    <div className={styles.container}>
      <MdSearch/>
      <input type="text" placeholder={placeholder} className={styles.input} onChange={handleSearch}/>

    </div>
  )
}

export default Recherche