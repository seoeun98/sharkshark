from sqlalchemy import Column, ForeignKey, Integer, VARCHAR
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "user"

    no = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id = Column(VARCHAR(45), nullable=False)
    pw = Column(VARCHAR(120), nullable=False)
    token = Column(VARCHAR(45))
    # token = Column(VARCHAR(45), nullable=False)
    git = Column(VARCHAR(45))
    dir = Column(VARCHAR(45))
    msg = Column(VARCHAR(45))


class BJ_user(Base):
    __tablename__ = "BJ_user"

    no = Column(Integer, primary_key=True, index=True, autoincrement=True)
    tier = Column(VARCHAR(45))
    totalSolvedCnt = Integer
    userId = VARCHAR(45)
    math = float
    implementation = float
    greedy = float
    string = float
    dataStructure = float
    graph = float
    dp = float
    bruteforce = float