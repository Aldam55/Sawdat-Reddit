from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class CommunityForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    banner_url = StringField('Banner', validators=[DataRequired()])
    icon_url = StringField('Icon', validators=[DataRequired()])
