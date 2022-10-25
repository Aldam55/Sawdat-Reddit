from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    comment_id = IntegerField("Comment Id")
    comment_body = StringField("Comment Body", validators=[DataRequired()])
