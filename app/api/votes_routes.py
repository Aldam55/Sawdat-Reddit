from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Post, User, db, Vote
from app.forms.vote_form import VoteForm


def validation_form_errors(validation_errors):
    errors = []
    for field in validation_errors:
        for err in validation_errors[field]:
            errors.append(f'{field}:{err}')
    return errors


vote_routes = Blueprint("votes", __name__)

# GET ALL VOTES


@vote_routes.route("/", methods=["GET"])
def get_all_votes():
    votes = Vote.query.all()
    votes_lst = []

    for vote in votes:
        post = (Post.query.filter(Post.id == vote.post_id).one()).to_dict()
        owner = (User.query.filter(User.id == vote.user_id).one()).to_dict()
        vote_dict = vote.to_dict()
        vote_dict["Post"] = post
        vote_dict["Owner"] = owner
        votes_lst.append(vote_dict)

    return {"votes": [vote for vote in votes_lst]}

# DELETE VOTE
@vote_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_vote(id):
    vote = Vote.query.get(id)
    if not vote:
        return {"message": "Vote couldn't be found", "statusCode": 404}

    if not vote.user_id == current_user.id:
        return {"message": "Forbidden", "stautsCode": 403}

    db.session.delete(vote)
    db.session.commit()
    return {"message": "Successfully deleted", "statusCode": 200}
