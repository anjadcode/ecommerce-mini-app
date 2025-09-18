from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from .product import ProductResponse

# Skema untuk membuat pesanan baru
class OrderCreate(BaseModel):
    items: List[dict]
    total: float
    customerName: str
    customerEmail: str
    status: Optional[str] = 'pending'

# Skema untuk respon pesanan
class OrderResponse(OrderCreate):
    id: int
    createdAt: datetime

    class Config:
        orm_mode = True
