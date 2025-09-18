from pydantic import BaseModel
from typing import Optional

# Skema untuk membuat produk baru
class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    image: Optional[str] = None

# Skema untuk respon produk
class ProductResponse(ProductCreate):
    id: int

    class Config:
        orm_mode = True
