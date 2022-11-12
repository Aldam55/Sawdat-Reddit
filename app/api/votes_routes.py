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


# DELETE VOTE
@vote_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_vote(id):
    pass
