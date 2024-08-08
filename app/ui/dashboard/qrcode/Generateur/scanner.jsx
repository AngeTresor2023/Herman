/*import QRCode from 'qrcode.react';
import styles from '@/app/ui/dashboard/qrcode/Generateur/scanner.module.css';
import { useQRCode } from 'next-qrcode';


const QRCodeGenerator = ({ text }) => {
  return (
    <div className={styles.container}>
      <h1>QR Code Generator</h1>
      <div className={styles.qrCode}>
        <QRCode value={text} />
      </div>
    </div>
  );
};

export default QRCodeGenerator;*/
"use client"
import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = ({ name, etat, entreposage }) => {
    const qrValue = `Nom du produit: ${name}, État: ${etat}, Entreposage: ${entreposage}`;

    return (
        <div>
            <QRCodeCanvas value={qrValue} size={300} />
        </div>
    );
};

export default QRCodeGenerator;
