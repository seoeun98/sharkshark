from sqlalchemy import Column, ForeignKey, Integer, VARCHAR, FLOAT, TIMESTAMP, BIGINT, TEXT, Boolean
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "user"

    no = Column(Integer, primary_key=True, index=True, autoincrement=True)
    # id = Column(VARCHAR(45), ForeignKey('BJ_user.userId'))
    # BJ 통해서 인증한 후에 회원가입 되는 거라면 왜 굳이 FK로 이어야하지? 어차피 id가 같으니 연동돼있지 않아도 상관없는 거 아닌가

    id = Column(VARCHAR(45), unique=True)
    pw = Column(VARCHAR(120))
    token = Column(VARCHAR(45))
    git = Column(VARCHAR(45))
    dir = Column(VARCHAR(45))

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
    tier = Column(VARCHAR(45))
    totalSolvedCnt = Column(Integer)
    userId = Column(VARCHAR(45), unique=True)

    solvedCount = Column(Integer)
    userClass = Column(Integer)
    rating = Column(Integer)
    ratingByProblemsSum = Column(Integer)
    ratingByClass = Column(Integer)
    ratingBySolvedCount = Column(Integer)
    exp = Column(BIGINT)
    rivalCount = Column(Integer)
    reverseRivalCount = Column(Integer)
    maxStreak = Column(Integer)
    rank = Column(Integer)
    organization = Column(Integer)
    problems = Column(TEXT)

    # user = relationship("user", backref="BJ_users", uselist=False, cascade="all,delete")
    rival = relationship("rival", backref="BJ_users", uselist=False, cascade="all,delete")
    solvedProblem = relationship("solvedProblem", backref="BJ_users", cascade="all,delete")
    major_category = relationship("major_category", backref="BJ_users", cascade="all,delete")

class rival(Base):
    __tablename__ = "rival"

    no = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(VARCHAR(45), ForeignKey('user.id'))
    rivalId = Column(VARCHAR(45), ForeignKey('BJ_user.userId'))

class solvedProblem(Base):
    __tablename__ = "solvedProblem"

    probNo = Column(Integer, ForeignKey('problem.no'), primary_key=True)
    userId = Column(VARCHAR(45), ForeignKey('BJ_user.userId'))
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

    problem = relationship("solvedProblem", cascade="all,delete")
    problem_tag = relationship("problem_tag", cascade="all,delete")

class problem_tag(Base):
    __tablename__ = "problem_tag"

    no = Column(Integer, primary_key=True, autoincrement=True)
    probNo = Column(Integer, ForeignKey('problem.no'))
    tagNo = Column(Integer, ForeignKey('tag.no'))

class tag(Base):
    __tablename__ = "tag"

    no = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(VARCHAR(45))

    problem_tag = relationship("problem_tag", cascade="all,delete")

class wrongType(Base):
    __tablename__ = "wrongType"

    no = Column(Integer, primary_key=True, autoincrement=True)
    typeName = Column(VARCHAR(45))
    userId = Column(VARCHAR(45), ForeignKey('user.id'))
    wrongCnt = Column(Integer)

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