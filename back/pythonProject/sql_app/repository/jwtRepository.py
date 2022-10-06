import json
import traceback
from typing import Optional

from datetime import datetime, timedelta
from jose import jwt
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Request, HTTPException
from requests import Session

from sql_app import models

ACCESS_KEY = "access"
REFRESH_KEY = "refresh"
ACCESS_EXPIRES = timedelta(hours=1)
REFRESH_EXPIRES = timedelta(days=14)

ALGORITHM = "HS256"


class JWTRepo():

    # refresh token을 db에 저장
    def set_auth(refresh: str, userId: str, db: Session):
        check_token = db.query(models.auth).filter(models.auth.userId == userId)
        if check_token.first():
            check_token.update({'refresh_token': refresh})
        else:
            db_token = models.auth(userId=userId, refresh_token=refresh)
            db.add(db_token)
        db.commit()

    # refresh token이 맞는지 확인
    def check_refresh_token(refresh: str, db: Session):
        userId = JWTRepo.decode_refresh_token(refresh)

        if userId:
            check_token = db.query(models.auth).filter(models.auth.userId == userId)
            if check_token.first() and refresh == check_token.first().refresh_token:
                return True
        return False

    def generate_access_token(data: dict, expires_delta: Optional[timedelta] = None):
        to_encode = data.copy()
        if expires_delta:

            expire = datetime.utcnow() + ACCESS_EXPIRES
        else:
            expire = datetime.utcnow() + ACCESS_EXPIRES
        to_encode.update({"exp": expire})
        encode_jwt = jwt.encode(to_encode, ACCESS_KEY, algorithm=ALGORITHM)

        return encode_jwt

    def generate_refresh_token(data: dict, expires_delta: Optional[timedelta] = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + REFRESH_EXPIRES
        else:
            expire = datetime.utcnow() + REFRESH_EXPIRES
        to_encode.update({"exp": expire})
        encode_jwt = jwt.encode(to_encode, REFRESH_KEY, algorithm=ALGORITHM)

        return encode_jwt

    def decode_token(token: str):
        try:
            decode_token = jwt.decode(token, ACCESS_KEY, ALGORITHM)
            return decode_token['id']
        except:
            print(traceback.format_exc())
            return False

    def decode_refresh_token(token: str):
        try:
            decode_token = jwt.decode(token, REFRESH_KEY, ALGORITHM)
            return decode_token['id']
        except:
            print("error on decoding refresh token")
            print(traceback.format_exc())
            return False

    # refresh token확인해서 유효한 token이면 새로운 access token을 발급해준다
    def create_new_access_token(refresh: str, db: Session):
        if JWTRepo.check_refresh_token(refresh, db):
            print("refresh token 유효. 새로운 access token 발급")
            userId = JWTRepo.decode_refresh_token(refresh)
            return JWTRepo.generate_access_token({"id": userId})
        return None;


class JWTBearer(HTTPBearer):

    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)

        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Invalid authentication scheme.")
            if not self.verfity_jwt(credentials.credentials):
                raise HTTPException(
                    status_code=403, detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise HTTPException(
                status=403, detail="Invalid authorization code.")

    def verfity_jwt(SELF, jwttoken: str):
        isTokenValid: bool = False

        try:
            payload = jwt.decode(jwttoken, ACCESS_KEY, ALGORITHM)
        except:
            print(traceback.format_exc())
            payload = None

        if payload:
            isTokenValid = True

        return isTokenValid