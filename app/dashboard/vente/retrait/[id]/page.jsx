
import React from 'react'
import RetraitVentePage from '@/app/ui/dashboard/vente/retrait/retrait'
const Page = ({params}) => {
  const {id}= params;
  return (
    <RetraitVentePage venteId = { id } />
  )
}

export default Page