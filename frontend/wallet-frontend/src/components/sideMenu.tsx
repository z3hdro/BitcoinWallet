import { Link } from "react-router-dom";
import styles from '../styles/routes.module.css'

export const SideMenu = () => (
    <div className={styles.navigation}> 
        <p className={styles.navigationHeader}>Bitcoin Wallet</p>
        <nav>
            <ul>
                <li>
                    <Link className={styles.Links} to="/adresses">Adresses</Link>
                </li>
                <li>
                    <Link className={styles.Links} to="/transactions">Transactions</Link>
                </li>
            </ul>
        </nav>
    </div>
)
    