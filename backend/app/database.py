from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Konfigurasi koneksi database MySQL
# Ganti dengan kredensial database Anda
SQLALCHEMY_DATABASE_URL = "mysql://username:password@localhost/ecommerce_db"

# Membuat engine database
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Membuat SessionLocal untuk interaksi dengan database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Membuat Base untuk model-model ORM
Base = declarative_base()

# Fungsi untuk mendapatkan koneksi database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
