import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import styles from '../styles/adresses.module.css';
import { getFakeAdresses } from '../helpers/seed';
import { localhost, randomAdress, addAdress, adressesAll } from '../config';


interface Adress {
    adress: string,
  }

export const Adresses = () => {

    const [data, setData] = useState<Adress[]>([{adress: ''}])

    const addRandomAdresses = async (set: number) => {
        await fetch(`${localhost}/${randomAdress}/${set}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
        }).then(res => {
            return res.json();
        })
        .then(json => {
            console.log(json)
        })
        .catch((e) => console.log(e.message));
    };
    
    

    const getAdresses = useCallback(() => {
        fetch(`${localhost}/${adressesAll}/`, {
            method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		})
			.then(res => {
                // console.log(res.json());
                return res.json();
			})
			.then(json => {
                console.log(json)
				setData(json);
            })
            .catch((e) => console.log(e.message));
	}, [])

    useEffect(() => {
        const result: string | null = localStorage.getItem('adresses');
        const privateKey: string | null = localStorage.getItem('privateKey')
        if (privateKey !== null) {
            if (result === null || result === undefined ) {
                const generatedAdresses: number = getFakeAdresses();
                localStorage.setItem('adresses', JSON.stringify(generatedAdresses))
                addRandomAdresses(generatedAdresses);
            } 
        }
    }, [])

    useEffect(() => {
        const result: string | null = localStorage.getItem('adresses');
        const privateKey: string | null = localStorage.getItem('privateKey');
        if (privateKey !== null) {
            if (result !== null) {
                getAdresses();
            }
        }       
    }, [getAdresses])

    const result = data.map((adress: Adress) => (
                    <div key={adress.adress} className={styles.AdressInfo}>
                        <Link className={styles.AdressLink} to={`/transactions/:${adress.adress}/`}>{adress.adress}</Link>
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