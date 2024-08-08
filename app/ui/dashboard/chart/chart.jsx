"use client"
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from "./chart.module.css"
const data = [
  {
    name: "Dec",
    cash: 20000,
    vente:70,
  },
  {
    name: "Jan",
    cash: 35000,
    vente:30,
  },
  {
    name: "Fev",
    cash: 90000,
    vente:5,
  },
  {
    name: "Mars",
    cash: 2000,
    vente:10,
  },
  {
    name: "Avril",
    cash: 8000,
    vente:20,
  },
  {
    name: "Mai",
    cash: 230000,
    vente:3,
  },
  {
    name: "Juin",
    cash: 5000,
    vente:3,
  },
  {
    name: "Juillet",
    cash: 700000,
    vente:3,
  },
  {
    name: "Aout",
    cash: 100000,
    vente:3,
  },
  {
    name: "Sept",
    cash: 200000,
    vente:3,
  },
  {
    name: "Oct",
    cash: 50000,
    vente:3,
  },
  {
    name: "Nov",
    cash: 10000,
    vente:3,
  },
  
];

const Chart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Récapitulatif Mensuel</h2>
      <ResponsiveContainer width="100%" height="90%">
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                  <CartesianGrid strokeDasharray="1 90" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip contentStyle={{background:"#151c2c", border:"none"}}/>
                <Legend />
                <Line type="monotone" dataKey="cash" stroke="#8884d8" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="vente" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
              </LineChart>
            </ResponsiveContainer>
    </div>
    
  )
}

export default Chart