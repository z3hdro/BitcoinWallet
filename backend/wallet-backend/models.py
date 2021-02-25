import sqlalchemy
from sqlalchemy import Column, ForeignKey, Integer, String, Date
from .database import Base

metadata = sqlalchemy.MetaData()

transactions_table = sqlalchemy.Table(
    "transactions",
    metadata,
    Column("id", Integer, primary_key=True, index=True)
    Column("time", Date())
    Column("incoming_outgoing", Integer)
    Column("sender_receiver", String(40), default=True)
    Column("amount", Integer)
    Column("tax", Integer)  
)