from fastapi import FastAPI
from database import database
from sqlalchemy import desc, func, select
from models.transactions import transactions_table
from models.adresses import adresses_table
import crud


app = FastAPI()


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}

@app.post("adresses/randomly")
async def add_random_adresses(data):
    return await crud.add_random_adresses(data)

@app.get("/adresses/")
async def add_random_adresses():
    return await crud.get_adresses()

@app.post("/adresses/{adress}", status_code=201)
async def create_adress(adress: str):
    return await crud.create_adress(adress)

@app.get("/{adress}/transactions")
async def get_transaction_by_adress(adress: str):
    return await crud.get_adress_transactions(adress)

@app.get("/transactions")
async def get_transactions():
    return await crud.get_all_transactions()