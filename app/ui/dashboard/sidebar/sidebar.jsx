import React from 'react';
import styles from './sidebar.module.css';
import Image from 'next/image';
import { 
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout
} from 'react-icons/md';
import MenuLink from './menuLink/menuLink';

const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Tableau de Board",
                path: "/dashboard",
                icon: <MdDashboard />,
            },
            /*{
                title: "Mes Clients",
                path: "/dashboard/clients",
                icon: <MdSupervisedUserCircle />,
            },*/
            {
                title: "Mes Produits",
                path: "/dashboard/produits",
                icon: <MdShoppingBag />,
            },
            {
                title: "Mes Ventes",
                path: "/dashboard/vente",
                icon: <MdShoppingBag />,
            },
            /*
            {
                title: "Mon Historique",
                path: "/dashboard/transaction",
                icon: <MdWork />,
            },*/
        ],
    },
    {
        title: "Analytics",
        list: [
            
            {
                title: "Reports",
                path: "/dashboard/reports",
                icon: <MdAnalytics />,
            },
            {
                title: "Mon équipe",
                path: "/dashboard/utilisateurs",
                icon: <MdPeople />,
            },
        ],
    },
    {
        title: "User",
        list: [
            {
                title: "Settings",
                path: "/dashboard/settings",
                icon: <MdOutlineSettings />,
            },
            {
                title: "Help",
                path: "/dashboard/help",
                icon: <MdHelpCenter />,
            },
        ],
    },
];

const Sidebar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src="/avatar.png" alt="profil" width="50" height="50"/>
                <div className={styles.userdetail}>
                    <span className={styles.username}> Herman Djomo </span>
                    <span className={styles.userTitle}>   |  Administrateur</span>
                </div>
            </div>
            <ul className={styles.list}>
                {menuItems.map((cat) => (
                    <li key={cat.title}>
                        <span className={styles.cat}>{cat.title}</span>
                        <ul>
                            {cat.list.map((item) => (
                                <MenuLink item={item} key={item.title} />
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
