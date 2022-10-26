from .db import db
from sqlalchemy.sql import func


class Community(db.Model):
    __tablename__ = "communities"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    banner_url = db.Column(db.String(255), nullable=False)
    icon_url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.current_timestamp())

    owner = db.relationship("User", back_populates="communities")
    posts = db.relationship(
        "Post", back_populates="communities", cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "banner_url": self.banner_url,
            "icon_url": self.icon_url,
            "created_at": self.created_at
        }
