from .db import db
from sqlalchemy.sql import func


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    comment_id = db.Column(db.Integer)
    comment_body = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.current_timestamp())

    user = db.relationship("User", back_populates="comments")
    posts = db.relationship("Post", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "comment_id": self.comment_id,
            "comment_body": self.comment_body,
            "created_at": self.created_at
        }
