import faker from 'faker';

export function getPrivateKey() {
    return faker.finance.account(25);
}

export function getAdresses() {
    let result = [];
    const privateKey = localStorage.getItem('privateKey');
    for (let i=0; i < 10; i++ ) {
        result.push({info: faker.finance.bitcoinAddress() + 'hash=' + privateKey});
    }
    return result;
}

