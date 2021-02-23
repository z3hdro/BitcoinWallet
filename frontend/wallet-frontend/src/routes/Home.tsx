import React from 'react';
import styles from '../styles/home.module.css';
import { getPrivateKey } from '../helpers/seed';

interface HomeProps {
    privateKey: string | null,
    setPrivateKey: any,
}

export const Home = (props: HomeProps) => {

    const { privateKey, setPrivateKey } = props;

    const GenerateKey = () => {
        const userKey: string = getPrivateKey();
        localStorage.setItem('privateKey', userKey);
        setPrivateKey(userKey);
    }

    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.Key}>
                    Your private key: { privateKey }
                </div>
                <div
                    className={styles.Generate}
                    role = 'button'
                        onClick = {GenerateKey}
                        onKeyPress = {() => {}}
                        tabIndex = {0}>
                    Generate
                </div>
            </div>
        </React.Fragment>
        
    )
  }