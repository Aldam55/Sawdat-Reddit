from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Community, Post, User, db
from app.forms.community_form import CommunityForm
from app.forms.post_form import PostForm


def validation_form_errors(validation_errors):
    errors = []
    for field in validation_errors:
        for err in validation_errors[field]:
            errors.append(f'{field}:{err}')
    return errors


community_routes = Blueprint("communities", __name__)


# GET ALL COMMUNITIES
@community_routes.route("/", methods=["GET"])
def get_all_communities():
    communities = Community.query.all()

    communities_lst = []
    for community in communities:
        owner = (User.query.filter(
            User.id == community.user_id).one()).to_dict()
        community_dict = community.to_dict()
        community_dict["Owner"] = owner
        communities_lst.append(community_dict)
    return {"communities": [community for community in communities_lst]}


# GET COMMUNITIES OWNED BY CURRENT USER
@community_routes.route("/current", methods=["GET"])
@login_required
def get_communities_of_curr_user():
    communities = Community.query.filter(
        current_user.id == Community.user_id).all()

    return {"communities": [community.to_dict() for community in communities]}


# GET COMMUNITY BY ID
@community_routes.route("/<int:id>", methods=["GET"])
def get_community_by_id(id):
    community = Community.query.get(id)

    if not community:
        return {"message": "Community coulnd't be found", "statusCode": 404}

    community_dict = community.to_dict()
    owner = (User.query.filter(User.id == community.user_id).one()).to_dict()
    community_dict["Owner"] = owner

    posts = Post.query.filter(Post.community_id == id)
    community_dict["Posts"] = [post.to_dict() for post in posts]
    # EXTRA STUFF MAYBE WILL NEED TO LOOK BETTER
    if len(community.posts) == 0:
        community_dict["postCount"] = 0
    else:
        community_dict["postCount"] = len(community.posts)

    return community_dict


# GET POSTS BY COMMUNITY ID
@community_routes.route("/<int:id>/posts", methods=["GET"])
def get_post_by_community(id):
    community = Community.query.get(id)
    if not community:
        return {"message": "Community couldn't be found.", "statusCode": 404}

    posts_lst = []
    posts = Post.query.filter(Post.community_id == id).order_by(
        Post.created_at.desc()).all()
    for post in posts:
        post_dict = post.to_dict()

        owner = (User.query.filter(User.id == post.user_id).one()).to_dict()
        post_dict["Owner"] = owner

        posts_lst.append(post_dict)
    return jsonify(posts_lst)


# CREATE A COMMUNITY
@community_routes.route("/", methods=["POST"])
@login_required
def create_community():
    form = CommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        community = Community(
            user_id=current_user.id,
            name=form.name.data,
            about=form.about.data,
            banner_url=form.banner_url.data,
            icon_url=form.icon_url.data
        )
        db.session.add(community)
        db.session.commit()

        return community.to_dict()
    return {"errors": validation_form_errors(form.errors), "statusCode": 401}


# CREATE A POST FOR COMMUNITY VIA ID
@community_routes.route("/<int:id>/posts", methods=["POST"])
@login_required
def create_post(id):
    community = Community.query.get(id)

    if not community:
        return {"message": "Community couldn't be found.", "statusCode": 404}

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            user_id=current_user.id,
            community_id=id,
            title=form.title.data,
            description=form.description.data
        )

        db.session.add(post)
        db.session.commit()

        return post.to_dict()
    return {"errors": validation_form_errors(form.errors), "statusCode": 404}


# EDIT A COMMUNITY
@community_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_community(id):
    community = Community.query.get(id)
    if not community:
        return {"message": "Community couldn't be found", "statusCode": 404}

    if not community.user_id == current_user.id:
        return {"message": "Forbidden", "statusCode": 403}

    form = CommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        community.name = form.name.data
        community.about = form.about.data
        community.banner_url = form.banner_url.data
        community.icon_url = form.icon_url.data

        db.session.commit()

        return community.to_dict()
    return {"errors": validation_form_errors(form.errors), "statusCode": 401}


# DELETE A COMMUNITY
@community_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_community(id):
    community = Community.query.get(id)
    if not community:
        return {"message": "Community couldn't be found", "statusCode": 404}

    if not community.user_id == current_user.id:
        return {"message": "Forbidden", "statusCode": 403}

    db.session.delete(community)
    db.session.commit()

    return {"message": "Successfully deleted", "statusCode": 200}
