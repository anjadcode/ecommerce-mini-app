from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models.product import Product
from app.models.order import Order
from app.database import Base

def create_tables():
    # Membuat semua tabel yang didefinisikan dalam model
    Base.metadata.create_all(bind=engine)

def seed_products(db: Session):
    # Cek apakah sudah ada produk
    existing_products = db.query(Product).count()
    if existing_products > 0:
        print("Produk sudah ada di database.")
        return
    
    # Daftar produk awal
    products = [
        Product(
            name="Laptop Gaming Keren", 
            description="Laptop gaming dengan performa tinggi dan desain menarik", 
            price=12999.99, 
            image="https://example.com/laptop.jpg"
        ),
        Product(
            name="Smartphone Canggih", 
            description="Smartphone dengan kamera resolusi tinggi dan baterai tahan lama", 
            price=8499.50, 
            image="https://example.com/smartphone.jpg"
        ),
        Product(
            name="Headphone Wireless", 
            description="Headphone nirkabel dengan kualitas suara premium", 
            price=1299.75, 
            image="https://example.com/headphone.jpg"
        ),
        Product(
            name="Smartwatch Pintar", 
            description="Smartwatch dengan fitur kesehatan dan notifikasi lengkap", 
            price=2599.99, 
            image="https://example.com/smartwatch.jpg"
        ),
        Product(
            name="Kamera Profesional", 
            description="Kamera DSLR dengan lensa berkualitas tinggi", 
            price=15999.00, 
            image="https://example.com/camera.jpg"
        ),
        Product(
            name="Monitor Ultra Wide", 
            description="Monitor gaming dengan resolusi tinggi dan refresh rate cepat", 
            price=4799.50, 
            image="https://example.com/monitor.jpg"
        ),
        Product(
            name="Speaker Bluetooth", 
            description="Speaker portabel dengan suara jernih dan bass mendalam", 
            price=899.99, 
            image="https://example.com/speaker.jpg"
        ),
        Product(
            name="Tablet Multifungsi", 
            description="Tablet dengan performa tinggi untuk produktivitas dan hiburan", 
            price=6299.75, 
            image="https://example.com/tablet.jpg"
        )
    ]
    
    # Tambahkan produk ke database
    db.add_all(products)
    db.commit()
    print(f"Berhasil menambahkan {len(products)} produk!")

def main():
    # Buat koneksi database
    create_tables()
    db = SessionLocal()
    try:
        # Seed produk
        seed_products(db)
    finally:
        db.close()

if __name__ == "__main__":
    main()
