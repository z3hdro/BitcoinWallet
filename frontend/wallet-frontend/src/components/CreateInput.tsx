import React, {useState} from 'react';
import styles from '../styles/creating.module.css';
import { addAdress, localhost } from '../config';

interface CreateInputProps {
    setToggle: any;
    fetchData: any;
}

export function CreateInput(props: CreateInputProps) {
    const { setToggle, fetchData } = props;

    const [address, setAddress] = useState('');

    async function addAddress(event: any) {
        if (event.key === 'Enter') {
            if (address.trim() !== '') {
                let response = await fetch(`${localhost}/${addAdress}/${address}/`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
                let answer = await response.json();
                console.log(answer);
                fetchData();
                setToggle(false);
            }
        }
    };

    return (
        <div className={styles.userlist}>
            <input
                className = {styles.create_number}
                type='text'
                placeholder='write an address:'
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                onKeyPress={(event) => {addAddress(event);}}/>
        </div>
    ); 
};