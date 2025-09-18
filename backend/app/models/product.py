from sqlalchemy import Column, Integer, String, Float
from ..database import Base

# Model database untuk produk
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    description = Column(String(500))
    price = Column(Float)
    image = Column(String(500))  # URL gambar produk

    def to_dict(self):
        """Mengkonversi model menjadi dictionary"""
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "image": self.image
        }
