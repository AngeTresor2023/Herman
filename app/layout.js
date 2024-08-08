
import { Inter } from "next/font/google";
import './ui/global.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gestionnaire de stock et de vente",
  description: "par Ange Djomo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
      </body>
    </html>
  );
}
