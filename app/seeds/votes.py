from app.models import db, Vote

votes = [
    {"user_id": 1,
     "post_id": 30,
     "vote": 1,
     },
    {"user_id": 2,
     "post_id": 30,
     "vote": 1,
     },
    {"user_id": 3,
     "post_id": 30,
     "vote": 1,
     },
    {"user_id": 4,
     "post_id": 30,
     "vote": 1,
     },
    {"user_id": 5,
     "post_id": 30,
     "vote": 1,
     },
    {"user_id": 6,
     "post_id": 30,
     "vote": 1,
     },
    {"user_id": 7,
     "post_id": 30,
     "vote": 1,
     },
    {"user_id": 8,
     "post_id": 30,
     "vote": 1,
     },
    {"user_id": 9,
     "post_id": 30,
     "vote": -1,
     },
    {"user_id": 10,
     "post_id": 30,
     "vote": -1,
     },
]

add_vote = []

for vote in votes:
    new_vote = Vote(user_id=vote["user_id"],
                    post_id=vote["post_id"],
                    vote=vote["vote"])
    add_vote.append(new_vote)

def seed_votes():
    for vote in add_vote:
        db.session.add(vote)

    db.session.commit()

def undo_votes():
    db.session.execute('TRUNCATE votes RESTART IDENTITY CASCADE;')
    db.session.commit()
