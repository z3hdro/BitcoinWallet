import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/details.module.css';
import { getTransactions } from '../helpers/seed';
import { localhost, adressTransactions } from '../config';

interface DetailsPageProps {
    readonly id?: string | null,
  }



interface DetailsInfo {
    id: string,
    time: Date,
    incoming_outgoing: string,
    sender_receiver: string,
    amount: string,
    tax: string,
}

export const DetailsPage = (props: DetailsPageProps) => {
    const { id }: DetailsPageProps  = props;

    console.log('this is id prop: ', id);

    const [data, setData] = useState<DetailsInfo[]>([])

    const getDetails = useCallback(() => {
            fetch(`${localhost}/${id}/${adressTransactions}/`, {
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
                setData(json)
            })
            .catch((e) => console.log(e.message));
        }, []);

    useEffect(() => {
        const privateKey: string | null = localStorage.getItem('privateKey');
        if ((privateKey !== null) && (privateKey !== undefined)) {
            getDetails()
        }
        
    }, [getDetails])

    const res = data.length !== 0 ? data.map((transaction: DetailsInfo) => (
                    <div key={transaction.id} className={styles.transactionInfo}>
                        <div className={styles.transaction}>
                            {new Date(transaction.time).toDateString()}
                        </div>
                        <div className={styles.transaction}>
                            {transaction.incoming_outgoing}
                        </div>
                        <div className={styles.transactionSender}>
                            {transaction.sender_receiver}
                        </div>
                        <div className={styles.transaction}>
                            {transaction.amount}
                        </div>
                        <div className={styles.transaction}>
                            {transaction.tax}
                        </div>
                    </div>
                )) : []

    return (
        <React.Fragment>
            <div className={styles.container}>
                <div>
                    <p className={styles.HomeHeader}>Details</p>
                </div>
                <div className={styles.transactionContainer}>
                    <div className={styles.transactionHeader}>
                        <div className={styles.HeaderName}>
                            time
                        </div>
                        <div className={styles.HeaderName}>
                            {`incoming/\noutcoming`}
                        </div>
                        <div className={styles.HeaderNameSender}>
                            {`sender/\nreceiver`}
                        </div>
                        <div className={styles.HeaderName}>
                            amount
                        </div>
                        <div className={styles.HeaderName}>
                            tax
                        </div>
                    </div>
                </div>
                {res}
            </div>
        </React.Fragment>
        
    )
  }