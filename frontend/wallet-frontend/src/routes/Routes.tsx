import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Home } from './Home';
import { TransactionsList } from './TransactionList';
import styles from '../styles/routes.module.css'

export const Routes = () => {
    return (
        <Router>
        <div className={styles.container}>
            <div className={styles.navigation}>
                <p className={styles.navigationHeader}>Bitcoin Wallet</p>
                <nav>
                    <ul>
                        <li>
                            <Link className={styles.Links} to="/">Адреса</Link>
                        </li>
                        <li>
                            <Link className={styles.Links} to="/transactions">Транзакции</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={styles.navigationPages}>
                <Switch>
                    <Route path="/transactions">
                     <TransactionsList />
                    </Route>
                    <Route path="/">
                     <Home />
                    </Route>
                </Switch>
            </div>
          
        </div>
      </Router>
    );
  }

  
