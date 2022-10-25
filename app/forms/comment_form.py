from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    comment_body= StringField("Comment Body", validators=[DataRequired()])
