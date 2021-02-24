import React, { useState, useEffect } from 'react';
import styles from '../styles/details.module.css';
import { getTransactions } from '../helpers/seed';

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

    const [data, setData] = useState<DetailsInfo[]>([])

    useEffect(() => {
        const privateKey: string | null = localStorage.getItem('privateKey');
        if ((privateKey !== null) && (privateKey !== undefined)) {
            const transactionsGenerated: string | null = localStorage.getItem('transactionsGenerated');
            if ((transactionsGenerated !== null) && (transactionsGenerated !== undefined)) {
                // console.log(result);
                // setData(result);
            } else {
                const result: DetailsInfo[] = getTransactions();
                localStorage.setItem('transactionsGenerated', 'true');
                setData(result);
            }
            
        }
        
    }, [])

    const res = data.map((transaction: DetailsInfo) => (
                    <div key={transaction.id} className={styles.transactionInfo}>
                        <div className={styles.transaction}>
                            {transaction.time.toDateString()}
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
                ))

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