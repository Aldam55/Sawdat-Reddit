from xml.dom import ValidationErr
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError


def valid_name(form, field):
    name = field.data
    if len(name) < 5 or len(name) > 40:
        raise ValidationError(
            "Community name must be between 5 and 40 characters.")


class CommunityForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), valid_name])
    banner_url = StringField('Banner', validators=[DataRequired()])
    icon_url = StringField('Icon', validators=[DataRequired()])
