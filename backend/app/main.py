from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

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
    # Konstruksi manual untuk Order
    db_order = Order(
        items=order.items,
        total=order.total,
        customer_name=order.customerName,  # Mapping manual
        customer_email=order.customerEmail,  # Mapping manual
        status=order.status or 'pending'
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    # Pastikan semua field tersedia untuk response
    return {
        "id": db_order.id,
        "items": db_order.items,
        "total": db_order.total,
        "customerName": db_order.customer_name,
        "customerEmail": db_order.customer_email,
        "status": db_order.status,
        "createdAt": datetime.now()  # Gunakan waktu saat ini jika tidak ada waktu spesifik
    }

# Endpoint untuk mendapatkan daftar pesanan
@app.get("/orders/", response_model=list[OrderResponse])
def read_orders(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    orders = db.query(Order).offset(skip).limit(limit).all()
    
    # Transform orders untuk memastikan semua field tersedia
    return [
        {
            "id": order.id,
            "items": order.items,
            "total": order.total,
            "customerName": order.customer_name,
            "customerEmail": order.customer_email,
            "status": order.status,
            "createdAt": order.created_at or datetime.now()
        } for order in orders
    ]
