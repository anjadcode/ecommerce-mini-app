# E-Commerce Mini App

## Deskripsi Proyek
Aplikasi e-commerce mini sederhana yang memungkinkan pengguna untuk:
- Melihat daftar produk
- Menambahkan produk ke keranjang
- Melakukan checkout sebagai guest
- Melihat daftar pesanan

## Teknologi yang Digunakan
### Frontend
- React
- TypeScript
- Redux Toolkit
- React Router
- Axios

### Backend
- Python
- FastAPI
- SQLAlchemy
- Alembic (Database Migration)

### Database
- MySQL

## Prasyarat
- Git
- Node.js (v14+)
- Python (v3.8+)
- MySQL Server
- pip (Python package manager)

## Langkah Instalasi Lengkap

### 1. Clone Repository
```bash
# Clone repository dari GitHub
git clone https://github.com/anjadcode/ecommerce-mini-app.git
cd ecommerce-mini-app
```

### 2. Konfigurasi Database MySQL
1. Pastikan MySQL sudah terinstall dan berjalan
2. Buat database dan user baru:
```bash
# Masuk ke MySQL sebagai root
sudo mysql

# Jalankan perintah SQL berikut:
CREATE DATABASE ecommerce_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'ecommerce_user'@'localhost' IDENTIFIED BY 'ecommerce_pass';
GRANT ALL PRIVILEGES ON ecommerce_db.* TO 'ecommerce_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Setup Backend
```bash
# Masuk ke direktori backend
cd backend

# Buat virtual environment
python3 -m venv venv

# Aktifkan virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Jalankan migrasi database
#PYTHONPATH=. alembic upgrade head

# (Opsional) Seed data produk awal
PYTHONPATH=. python -m app.seed_data
```

### 4. Setup Frontend
```bash
# Kembali ke root project
cd ..

# Masuk ke direktori frontend
cd frontend

# Install dependencies
npm install
```

### 5. Jalankan Aplikasi

#### Jalankan Backend (Terminal 1)
```bash
cd backend
source venv/bin/activate
PYTHONPATH=. uvicorn app.main:app --reload
# Backend akan berjalan di http://localhost:8000
```

#### Jalankan Frontend (Terminal 2)
```bash
cd frontend
npm start
# Frontend akan berjalan di http://localhost:3000
```

## Konfigurasi Tambahan

### Mengubah Koneksi Database
Edit file `backend/app/database.py` untuk mengubah kredensial database:
```python
SQLALCHEMY_DATABASE_URL = "mysql://username:password@localhost/ecommerce_db"
```

## Fitur
- [x] Daftar Produk
- [x] Keranjang Belanja
- [x] Checkout Guest
- [x] Daftar Pesanan
- [ ] Deployment

## Troubleshooting
- Pastikan MySQL berjalan
- Periksa koneksi database di `backend/app/database.py`
- Pastikan semua dependencies terinstall
- Gunakan Python 3.8+ dan Node.js 14+

## RESTful API Endpoints

### Produk
- **GET `/products/`**
  - Deskripsi: Mengambil daftar produk
  - Parameter:
    - `skip` (opsional): Jumlah produk yang dilewati (untuk pagination)
    - `limit` (opsional): Jumlah produk yang diambil
  - Response: Daftar produk

### Pesanan
- **POST `/orders/`**
  - Deskripsi: Membuat pesanan baru
  - Request Body:
    ```json
    {
      "items": [
        {
          "id": 1,
          "name": "Nama Produk",
          "price": 100.00
        }
      ],
      "total": 100.00,
      "customerName": "Nama Pelanggan",
      "customerEmail": "email@example.com",
      "status": "pending"
    }
    ```
  - Response: Detail pesanan yang dibuat

- **GET `/orders/`**
  - Deskripsi: Mengambil daftar pesanan
  - Parameter:
    - `skip` (opsional): Jumlah pesanan yang dilewati (untuk pagination)
    - `limit` (opsional): Jumlah pesanan yang diambil
  - Response: Daftar pesanan

### Teknologi API
- Framework: FastAPI
- Dokumentasi: Swagger UI tersedia di `/docs`
- Format Respons: JSON
- Validasi: Pydantic
- Database ORM: SQLAlchemy

