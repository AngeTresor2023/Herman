// pages/api/import.js
import { connectToDB } from '../../utils';
import { Produit } from '../../models';
import XLSX from 'xlsx';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const readExcelFile = (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet);
};

export default async (req, res) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing file' });
      }
      
      const filePath = files.file.path;
      const data = readExcelFile(filePath);

      await connectToDB();
      
      try {
        for (const record of data) {
          const { name, date, stade, stock, entrepot, state, provenanceE, img, desc, note, dateR, retrait } = record;
          const newProduit = new Produit({
            name,
            date: new Date(date),
            stade,
            stock,
            entrepot,
            state,
            provenanceE,
            img,
            desc,
            note,
            dateR: new Date(dateR),
            retrait
          });
          await newProduit.save();
        }
        res.status(200).json({ message: 'Data imported successfully!' });
      } catch (error) {
        res.status(500).json({ error: 'Error importing data' });
      } finally {
        fs.unlinkSync(filePath); // Supprimez le fichier temporaire après l'importation
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
