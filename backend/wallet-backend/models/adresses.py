import sqlalchemy


metadata = sqlalchemy.MetaData()


adresses_table = sqlalchemy.Table(
    "adresses",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, index=True),
    sqlalchemy.Column("adress", sqlalchemy.String(50)),
)