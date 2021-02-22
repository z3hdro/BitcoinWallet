import React, { useState } from 'react';
import styles from '../styles/homepage.module.css';

interface Adress {
    info: string,
  }

export const Home = () => {

    const [data, setData] = useState([{info: '414113g1v1cc1'}, {info: '3413413413413'}, {info: '0036169413413'}])

    const result = data.map((adress: Adress) => (
                    <div className={styles.AdressInfo}>
                        <p>{adress.info}</p>
                    </div>
                ))

    return (
        <React.Fragment>
            <div className={styles.container}>
                <div>
                    <p className={styles.HomeHeader}>Adresses</p>
                </div>
                {result}
            </div>
        </React.Fragment>
        
    )
  }