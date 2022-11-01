from flask import Blueprint, request, jsonify
from app.models import Comment, Post


def validation_form_errors(validation_errors):
    errors = []
    for field in validation_errors:
        for err in validation_errors[field]:
            errors.append(f'{field}:{err}')
    return errors


comment_routes = Blueprint("comments", __name__)


# GET ALL COMMENTS
@comment_routes.route("/", methods=["GET"])
def get_all_comments():
    comments = Comment.query.all()
