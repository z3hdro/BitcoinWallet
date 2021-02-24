import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from '../styles/adresses.module.css';
import { getAdresses } from '../helpers/seed';

interface Adress {
    info: string,
  }

export const Adresses = () => {

    const [data, setData] = useState<Adress[]>([])

    useEffect(() => {
        const result: any = localStorage.getItem('adresses');
        const privateKey: string | null = localStorage.getItem('privateKey')
        if (privateKey !== null) {
            if (result !== null && result !== undefined ) {
                setData(JSON.parse(result))
            } else {
                const generatedAdresses: any = getAdresses();
                localStorage.setItem('adresses', JSON.stringify(generatedAdresses))
                setData(generatedAdresses);
            }
        }
    }, [])

    const result = data.map((adress: Adress) => (
                    <div key={adress.info} className={styles.AdressInfo}>
                        <Link className={styles.AdressLink} to={`/transactions/:${adress.info}/`}>{adress.info}</Link>
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