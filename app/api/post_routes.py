from flask import Blueprint, request, jsonify
from app.models import Post, Community


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
