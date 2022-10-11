import json

from sqlalchemy import Column, ForeignKey, Integer, VARCHAR, FLOAT, TIMESTAMP, BIGINT, TEXT, Boolean, JSON
from sqlalchemy.dialects.mysql import MEDIUMTEXT
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "user"

    no = Column(Integer, primary_key=True, index=True, autoincrement=True)

    id = Column(VARCHAR(45), unique=True)
    pw = Column(VARCHAR(120))
    token = Column(VARCHAR(100), default="")
    git = Column(VARCHAR(45), default="")
    dir = Column(VARCHAR(45), default="")

    rival = relationship("rival", backref="users", uselist=False, cascade="all,delete")

class userMsg(Base):
    __tablename__ = "userMsg"

    no = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(VARCHAR(45))
    userMsg = Column(VARCHAR(45))

class major_category(Base):
    __tablename__ = "major_category"

    no = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(VARCHAR(45), ForeignKey('BJ_user.userId'))
    math = Column(FLOAT)
    implementation = Column(FLOAT)
    greedy = Column(FLOAT)
    string = Column(FLOAT)
    dataStructure = Column(FLOAT)
    graph = Column(FLOAT)
    dp = Column(FLOAT)
    bruteforce = Column(FLOAT)


class BJ_user(Base):
    __tablename__ = "BJ_user"

    no = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(VARCHAR(45), unique=True)
    solvedCount = Column(Integer)
    userClass = Column(Integer)
    tier = Column(Integer)
    rating = Column(Integer)
    ratingByProblemsSum = Column(Integer)
    ratingByClass = Column(Integer)
    ratingBySolvedCount = Column(Integer)
    exp = Column(BIGINT)
    rivalCount = Column(Integer)
    reverseRivalCount = Column(Integer)
    maxStreak = Column(Integer)
    rank = Column(Integer)
    organization = Column(VARCHAR(200))
    problems = Column(MEDIUMTEXT)

    rival = relationship("rival", backref="BJ_users", uselist=False, cascade="all,delete")
    major_category = relationship("major_category", backref="BJ_users", cascade="all,delete")

class rival(Base):
    __tablename__ = "rival"

    no = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(VARCHAR(45), ForeignKey('user.id'))
    rivalId = Column(VARCHAR(45), ForeignKey('BJ_user.userId'))

class solvedProblem(Base):
    __tablename__ = "solvedProblem"

    probNo = Column(Integer, primary_key=True)
    userId = Column(VARCHAR(45))
    solvedDate = Column(TIMESTAMP(6))

class problem(Base):
    __tablename__ = "problem"

    no = Column(Integer,  primary_key=True)
    title = Column(VARCHAR(45))
    acceptedUserCnt = Column(Integer)
    level = Column(Integer)
    avgTries = Column(Integer)
    isSolvable = Column(Boolean)
    acceptedUserCnt = Column(Integer)
    tags = Column(TEXT)
    

class wrongType(Base):
    __tablename__ = "wrongType"

    no = Column(Integer, primary_key=True, autoincrement=True)
    userId = Column(VARCHAR(45), ForeignKey('user.id'))
    wrong_print = Column(Integer)
    wrong_answer = Column(Integer)
    over_time = Column(Integer)
    over_memory = Column(Integer)
    over_print = Column(Integer)
    runtime_error = Column(Integer)
    compile_error = Column(Integer)

class auth(Base):
    __tablename__ = "auth"

    no = Column(Integer, primary_key=True, autoincrement=True)
    userId = Column(VARCHAR(45))
    refresh_token = Column(VARCHAR(2000))

class rec_rival(Base):
    __tablename__ = "recRival"

    no = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(VARCHAR(45))
    rivalIds = Column(VARCHAR(1000))

class rec_problems(Base):
    __tablename__ = "recProblems"

    no = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(VARCHAR(45))
    problems = Column(VARCHAR(1000))

class rec_rival_tag(Base):
    __tablename__ = "recRivalTag"

    no = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(VARCHAR(45))
    rivalIds = Column(VARCHAR(1000))

class rec_problems_tag(Base):
    __tablename__ = "recProblemsTag"

    no = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(VARCHAR(45))
    problems = Column(VARCHAR(1000))

class levelavg(Base):
    __tablename__ = "levelavg"

    no = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(VARCHAR(45))
    lv_avg = Column(FLOAT)    
    pb_list = Column(JSON)
    time = Column(TIMESTAMP(6))

class pbperweek(Base):
    __tablename__ = "pbperweek"

    no = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(VARCHAR(45))    
    pbperweek = Column(JSON)
    time = Column(TIMESTAMP(6))

class roadmap(Base):
    __tablename__ = "roadmap"

    no = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(VARCHAR(45))    
    roadmap = Column(JSON)
    time = Column(TIMESTAMP(6))