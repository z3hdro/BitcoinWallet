import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import styles from '../styles/adresses.module.css';
import { getFakeAdresses } from '../helpers/seed';
import { localhost, randomAdress, addAdress, adressesAll } from '../config';


interface Adress {
    info: string,
  }

export const Adresses = () => {

    const [data, setData] = useState<Adress[]>([{info: ''}])

    const addRandomAdresses = async (set: Adress[]) => {
        const data: any = new FormData();
        data.append("adresses", JSON.stringify(set));
        await fetch(`${localhost}/${randomAdress}/`, {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: data
        }).then(res => {
            return res.json();
        })
        .then(json => {
            console.log(json.result)
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
                return res.json();
			})
			.then(json => {
                console.log(json.result)
				setData(json.result);
            })
            .catch((e) => console.log(e.message));
	}, [])

    useEffect(() => {
        const result: string | null = localStorage.getItem('adresses');
        const privateKey: string | null = localStorage.getItem('privateKey')
        if (privateKey !== null) {
            if (result !== null && result !== undefined ) {
                getAdresses();
            } else {
                const generatedAdresses: Adress[] = getFakeAdresses();
                addRandomAdresses(generatedAdresses);
                localStorage.setItem('adresses', JSON.stringify(generatedAdresses.length))
                setData(generatedAdresses);
            }
        }
    }, [getAdresses])

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