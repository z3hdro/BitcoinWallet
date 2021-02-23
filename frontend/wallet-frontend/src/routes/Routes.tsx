import React, { useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams
} from "react-router-dom";
import { Adresses } from './Adresses';
import { TransactionsList } from './TransactionList';
import { Home } from './Home';
import { DetailsPage } from './DetailsPage';
import { SideMenu } from '../components/sideMenu';
import styles from '../styles/routes.module.css'

interface Details {
    id?: string | undefined,
}

function TransactionByAdress() {
	const { id }: Details = useParams();
	return (
		<DetailsPage id = {id !== undefined ? id.slice(1,) : null}/>
	);
}   


export const Routes = () => {

    const [key , setKey] = useState('');

    useEffect(() => {
        const clientKey: any = localStorage.getItem('privateKey');
        if (clientKey !== null && clientKey !== undefined) {
            setKey(clientKey);
        } else {
            setKey('Not existing key');
        }
    }, [key])

    

    return (
        <Router>
        <div className={styles.container}>
            { key === 'Not existing key'  ? null : <SideMenu /> }
            <div className={styles.navigationPages}>
                <Switch >
                    <Route exact path='/transactions/:id/'>
                        { key === 'Not existing key' ? <Redirect to='/'/>  : <TransactionByAdress />}
                    </Route>
                    <Route path="/adresses">
                      { key === 'Not existing key' ? <Redirect to='/'/> : <Adresses /> }
                    </Route>
                    <Route path="/transactions">
                     { key === 'Not existing key' ? <Redirect to='/'/> : <TransactionsList /> }
                    </Route>
                    <Route path="/home">
                        { key !== 'Not existing key' ? <Redirect to='/adresses' /> : <Home privateKey={key} setPrivateKey={setKey} /> }
                    </Route>
                    <Route path="/">
                        { key !== 'Not existing key' ? <Redirect to='/adresses' /> : <Redirect to='/home' /> }
                    </Route>
                </Switch>
            </div>
        </div>
      </Router>
    );
  }

  
