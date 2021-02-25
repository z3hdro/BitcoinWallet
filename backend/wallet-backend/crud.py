from datetime import datetime
from database import database 
from models.transactions import transactions_table
from models.adresses import adresses_table
from sqlalchemy import desc, func, select
from schemas import Adress
import random
import string
import os
import hashlib


def random_char(y):
       return ''.join(random.choice(string.ascii_letters) for x in range(y))

async def add_random_adresses(data):
    for adr in data['adresses']:
        query = (
            adresses_table.insert().values(adress=adr.info).returning(adresses_table.c.id)
        )
        adress = await database.fetch_one(query)

        transactions_amount = random.randint(7, 10)
        for i in range(transactions_amount):
            transaction_query = (
                transactions_table.insert()
                .values(
                        adress_id=adress.values()[0],
                        time=datetime.now(),
                        incoming_outgoing=random.randint(70, 220),
                        sender_receiver=random_char(7)+"@gmail.com",
                        amount=random.randint(1000, 1200),
                        tax=random.randint(5, 100)
                    )
                )
            
            await database.fetch_one(transaction_query)

    return {"Result": "Initial adresses were added"}

async def create_adress(adress: str):
    query = (
        adresses_table.insert().values(adress=adress)
    )
    await database.fetch_one(query)

    return {"Result": "adress created"}

async def get_adresses():
    query = (
        select(
            [    
                adresses_table.c.adress,
            ]
        )
        .select_from(adresses_table)
    )
    return await database.fetch_all(query)

async def get_adress_transactions(adress: str):

    query = (
        select(
            [
                adresses_table.c.id,
            ]
        )
        .select_from(adresses_table)
        .where(adresses_table.c.adress == adress)
    )
    adress  = await database.fetch_one(query)
     
    transactions = (
        select(
            [
                transactions_table.c.id,    
                transactions_table.c.adress_id,
                transactions_table.c.time,
                transactions_table.c.incoming_outgoing,
                transactions_table.c.sender_receiver,
                transactions_table.c.amount,
                transactions_table.c.tax,
            ]
        )
        .select_from(transactions_table)
        .where(transactions_table.c.id == adress['id'])
        .order_by(desc(transactions_table.c.time))
    )

    return await database.fetch_all(transactions)

async def get_all_transactions():
    query = (
        select(
            [
                transactions_table.c.id,    
                transactions_table.c.adress_id,
                transactions_table.c.time,
                transactions_table.c.incoming_outgoing,
                transactions_table.c.sender_receiver,
                transactions_table.c.amount,
                transactions_table.c.tax,
            ]
        )
        .select_from(transactions_table)
        .order_by(desc(transactions_table.c.time))
    )
    return await database.fetch_all(query)