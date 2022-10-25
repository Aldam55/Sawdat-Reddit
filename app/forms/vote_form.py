from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class VoteForm(FlaskForm):
    vote = IntegerField("Vote", validators=[DataRequired()])
