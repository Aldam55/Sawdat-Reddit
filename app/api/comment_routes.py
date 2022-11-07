from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Comment, Post
from app.forms.comment_form import CommentForm


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

