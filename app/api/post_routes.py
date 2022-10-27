from crypt import methods
from flask import Blueprint, request, jsonify
from app.forms.post_form import PostForm
from app.models import Post, User, db, Comment
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
    posts = Post.query.order_by(Post.created_at.desc()).all()
    post_lst = []

    for post in posts:
        owner = (User.query.filter(User.id == post.user_id).one()).to_dict()
        post_dict = post.to_dict()
        post_dict["Owner"] = owner
        post_lst.append(post_dict)

    return {"posts": [post for post in post_lst]}


# GET POSTS OWNED BY CURRENT USER
@post_routes.route("/current", methods=["GET"])
@login_required
def get_user_posts():
    posts = Post.query.filter(Post.user_id == current_user.id).all()

    return {"posts": [post.to_dict() for post in posts]}


# GET POST BY POST ID
@post_routes.route("/<int:id>", methods=["GET"])
def get_singular_post(id):
    post = Post.query.get(id)

    if not post:
        return {"message": "Post couldn't be found", "statusCode": 404}

    post_dict = post.to_dict()
    owner = (User.query.filter(User.id == post.user_id).one()).to_dict()
    post_dict["Owner"] = owner

    return post_dict


# EDIT A POST
@post_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_post(id):
    post = Post.query.get(id)

    if not post:
        return {"message": "Post couldn't be found", "statusCode": 404}

    if not current_user.id == post.user_id:
        return {"message": "Forbidden", "statusCode": 403}

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post.description = form.description.data

        db.session.commit()

        return post.to_dict()
    return {"errors": validation_form_errors(form.errors), "statusCode": 401}


# DELETE A POST
@post_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_post(id):
    post = Post.query.get(id)

    if not post:
        return {"message": "Post couldn't be found", "statusCode": 404}
    if not current_user.id == post.user_id:
        return {"message": "Forbidden", "statusCode": 403}

    db.session.delete(post)
    db.session.commit()

    return {"message": "Successfully delete", "statusCode": 200}


# GET ALL COMMENTS FOR A POST BY ID
@post_routes.route("/<int:id>/comments", methods=["GET"])
def get_comment_by_post(id):
    post = Post.query.get(id)
    if not post:
        return {"message": "Community couldn't be found.", "statusCode": 404}

    comments_lst = []
    comments = Comment.query.filter(Comment.post_id == id).order_by(
        Post.created_at.desc()).all()
    for comment in comments:
        comment_dict = comment.to_dict()

        owner = (User.query.filter(User.id == comment.user_id).one()).to_dict()
        comment_dict["Owner"] = owner

        comments_lst.append(comment_dict)
    return jsonify(comments_lst)
