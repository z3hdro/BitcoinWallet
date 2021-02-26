from fastapi import FastAPI
from database import database
from sqlalchemy import desc, func, select
from models.transactions import transactions_table
from models.adresses import adresses_table
from fastapi.middleware.cors import CORSMiddleware
import crud


app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/adresses/randomly/{number}")
async def add_random_adresses(number: int):
    return await crud.add_random_adresses(number)

@app.get("/adresses/")
async def add_random_adresses():
    return await crud.get_adresses()

@app.get("/adresses/{adress}/", status_code=201)
async def create_adress(adress: str):
    return await crud.create_adress(adress)

@app.get("/{adress}/transactions/")
async def get_transaction_by_adress(adress: str):
    return await crud.get_adress_transactions(adress)

@app.get("/transactions/")
async def get_transactions():
    return await crud.get_all_transactions()