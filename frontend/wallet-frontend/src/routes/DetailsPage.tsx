import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from '../styles/adresses.module.css';
import { getAdresses } from '../helpers/seed';

interface DetailsPageProps {
    id?: string | null,
  }

export const DetailsPage = (props: DetailsPageProps) => {
    const { id }: DetailsPageProps  = props;

    const [data, setData] = useState([])

    // useEffect(() => {
    //     const result: any = localStorage.getItem('adresses');
    //     const privateKey: string | null = localStorage.getItem('privateKey')
    //     if (privateKey !== null) {
    //         if (result !== null && result !== undefined ) {
    //             setData(JSON.parse(result))
    //         } else {
    //             const generatedAdresses: any = getAdresses();
    //             localStorage.setItem('adresses', JSON.stringify(generatedAdresses))
    //             setData(generatedAdresses);
    //         }
    //     }
    // }, [])

    // const result = data.map((adress: Adress) => (
    //                 <div className={styles.AdressInfo}>
    //                     <Link className={styles.AdressLink} to={`/transactions/:${adress.info}/`}>{adress.info}</Link>
    //                 </div>
    //             ))

    return (
        <React.Fragment>
            <div className={styles.container}>
                <div>
                    <p className={styles.HomeHeader}>Details for adress: {id}</p>
                </div>
                {/* {result} */}
            </div>
        </React.Fragment>
        
    )
  }