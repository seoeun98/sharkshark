from fastapi import APIRouter

router = APIRouter(
    prefix="/data",
    tags=["Datas"]
)

# 티어 상승 로드맵 조회
@router.get("/tier")
def get_tier_roadmap() :
    return None

# 주요 유형 조회
@router.get("/category")
def get_major_cate() :
    return None

# 기간별 문제 풀이 조회
@router.get("/history")
def get_history() :
    return None

# 주요 오답 유형 조회
@router.get("/wrong")
def get_major_wrong() :
    return None
