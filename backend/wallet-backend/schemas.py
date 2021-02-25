from datetime import datetime
from typing import Optional

from pydantic import UUID4, BaseModel, EmailStr, validator, Field

class Adress(BaseModel):
    """ Return response data """
    info: str