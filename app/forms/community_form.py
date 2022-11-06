from xml.dom import ValidationErr
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError


def valid_name(form, field):
    name = field.data
    if len(name) < 5 or len(name) > 25:
        raise ValidationError(
            "Community name must be between 5 and 25 characters.")

def valid_about(form, field):
    about = field.data
    if len(about) < 5 or len(about) > 200:
        raise ValidationError("About must be between 5 and 200 characters")


class CommunityForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), valid_name])
    about = StringField("About", validators=[DataRequired(), valid_about])
    banner_url = StringField('Banner')
    icon_url = StringField('Icon', validators=[DataRequired()])
