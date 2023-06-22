from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Comment, Post, User, db
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


# DELETE A COMMENT
@comment_routes.route("/<int:id", methods=["DELETE"])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if not comment:
        return {"message": "Comment couldn't be found", "statusCode": 404}

    if not comment.user_id == current_user.id:
        return {"message": "Forbidden", "statusCode": 403}

    db.session.delete(comment)
    db.session.commit()

    return {"message": "Successfully deleted", "statusCode": 200}
