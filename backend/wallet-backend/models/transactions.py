import sqlalchemy
# from .database import Base
from .adresses import adresses_table

metadata = sqlalchemy.MetaData()

transactions_table = sqlalchemy.Table(
    "transactions",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, index=True),
    sqlalchemy.Column("adress_id", sqlalchemy.ForeignKey(adresses_table.c.id)),
    sqlalchemy.Column("time", sqlalchemy.DateTime()),
    sqlalchemy.Column("incoming_outgoing", sqlalchemy.Integer),
    sqlalchemy.Column("sender_receiver", sqlalchemy.String(40), default=True),
    sqlalchemy.Column("amount", sqlalchemy.Integer),
    sqlalchemy.Column("tax", sqlalchemy.Integer),
)