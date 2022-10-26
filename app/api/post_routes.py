from flask import Blueprint, request, jsonify
from app.models import Post, Community
from flask_login import current_user, login_required


def validation_form_errors(validation_errors):
    errors = []
    for field in validation_errors:
        for err in validation_errors[field]:
            errors.append(f'{field}:{err}')
    return errors


post_routes = Blueprint("posts", __name__)


# GET ALL POSTS
@post_routes.route("/", methods=["GET"])
def get_all_posts():
    posts = Post.query.all()


# GET POSTS OWNED BY CURRENT USER
@post_routes.route("/current", methods=["GET"])
def get_user_posts():
    posts = Post.query.filter(Post.user_id == current_user.id).all()

    return {"posts": [post.to_dict() for post in posts]}
