from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

# Import models dan database
from .database import engine, Base, get_db
from .models.product import Product
from .models.order import Order

# Import skema
from .schemas.product import ProductCreate, ProductResponse
from .schemas.order import OrderCreate, OrderResponse

# Membuat tabel-tabel database
Base.metadata.create_all(bind=engine)

# Inisialisasi FastAPI
app = FastAPI()

# Konfigurasi CORS untuk mengizinkan request dari frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Sesuaikan dengan URL frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint untuk membuat produk
@app.post("/products/", response_model=ProductResponse)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

# Endpoint untuk mendapatkan daftar produk
@app.get("/products/", response_model=list[ProductResponse])
def read_products(skip: int = 0, limit: int = 8, db: Session = Depends(get_db)):
    products = db.query(Product).offset(skip).limit(limit).all()
    return products

# Endpoint untuk membuat pesanan
@app.post("/orders/", response_model=OrderResponse)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    db_order = Order(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

# Endpoint untuk mendapatkan daftar pesanan
@app.get("/orders/", response_model=list[OrderResponse])
def read_orders(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    orders = db.query(Order).offset(skip).limit(limit).all()
    return orders
