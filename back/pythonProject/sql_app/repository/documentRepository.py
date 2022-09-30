from requests import Session

import sql_app.repository.userRepository


def create_doc(userId: str, db : Session) :
    user = sql_app.repository.userRepository.get_by_id(userId)

    return None