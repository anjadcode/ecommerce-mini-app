from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from sqlalchemy.sql import func
from app.database import Base

# Model database untuk pesanan
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    items = Column(JSON)  # Menyimpan daftar produk dalam format JSON
    total = Column(Float)
    # Sesuaikan nama kolom dengan frontend
    customer_name = Column(String(255), name='customerName')
    customer_email = Column(String(255), name='customerEmail')
    status = Column(String(50), default='pending')
    created_at = Column(DateTime(timezone=True), server_default=func.now(), name='createdAt')

    def to_dict(self):
        """Mengkonversi model menjadi dictionary"""
        return {
            "id": self.id,
            "items": self.items,
            "total": self.total,
            "customerName": self.customer_name,
            "customerEmail": self.customer_email,
            "status": self.status,
            "createdAt": self.created_at.isoformat() if self.created_at else None
        }
