import React, { useState, useCallback, useEffect } from 'react';
import styles from '../styles/transactionlist.module.css';
import { localhost, transactionsAll } from '../config';

interface Transaction {
    id: number,    
    adress_id: number,
    time: string,
    incoming_outgoing: number,
    sender_receiver: string,
    amount: number,
    tax: number,
  }

export const TransactionsList = () => {

    const [data, setData] = useState<Transaction[]>([])

    const getTransactions = useCallback(() => {
        fetch(`${localhost}/${transactionsAll}/`, {
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

    useEffect(()=> {
        getTransactions()
    }, [getTransactions])
    
    const result = data.map((transaction: Transaction) => (
        <div key={transaction.id} className={styles.TransactionInfo}>
            <div className={styles.Transaction}>
                {`incoming/outgoing: ${transaction.incoming_outgoing}`}
            </div>
            <div className={styles.Transaction}>
                {`amount: ${transaction.amount}`}
            </div>
            <div className={styles.Transaction}>
                {`sender/receiver: ${transaction.sender_receiver}`}
            </div>
            <div className={styles.Transaction}>
                {`tax: ${transaction.tax}`}
            </div>
            <div className={styles.Transaction}>
                {`time: ${new Date(transaction.time).toDateString()}`}
            </div>
        </div>
    ))

    return (
        <div className={styles.container}>
            <div>
                <p className={styles.HomeHeader}>Transactions</p>
            </div>
            {result}
        </div>
    )
  }