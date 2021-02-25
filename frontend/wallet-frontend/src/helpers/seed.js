import faker from 'faker';

export function getPrivateKey() {
    return faker.finance.account(25);
}

export function getFakeAdresses() {
    let result = [];
    const max = Math.floor(Math.random() * Math.floor(11));
    for (let i=0; i < max; i++ ) {
        result.push({info: `${faker.finance.bitcoinAddress()}`});
    }
    return result;
}

// export function getTransactionDescription() {
//     const data = faker.finance.transactionDescription(); 
//     return data;
// }

export function getTransactions() {
    let result = [];
    const random = Math.floor((Math.random() * 10) + 1)
    for (let i=0; i < random; i++) {
        const currency = faker.finance.currencyCode()
        result.push({
            id: faker.finance.account(20),
            time: faker.date.recent(),
            incoming_outgoing: faker.finance.transactionType(),
            sender_receiver: `${faker.internet.email()} / ${faker.internet.email()}` ,
            amount: `${faker.random.number({min: 500, max: 1500})} ${currency}`,
            tax: `${faker.random.number({min: 0, max: 150})} ${currency}`,
        })
    }
    return result;
}