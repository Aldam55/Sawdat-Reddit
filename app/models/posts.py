from tkinter import CASCADE
from db import db
from sqlalchemy.sql import func


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey(
        "communities.id"), nullable=False)
    title = db.Column(db.String(1000), nullable=False)
    description = db.Column(db.String(3000))
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.current_timestamp())
    updated_at = db.Column(db.DateTime(timezone=True),
                           onupdate=func.current_timestamp())

    user = db.relationship("User", back_populates="posts")
    communities = db.relationship("Post", back_populates="posts")
    comments = db.relationship(
        "Comment", back_populates="posts", cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "community_id": self.community_id,
            "title": self.title,
            "description": self.description,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
