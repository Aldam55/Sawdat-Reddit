from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


def valid_title(form, field):
    title = field.data
    if len(title) < 5 or len(title) > 120:
        raise ValidationError("Title must be between 5 and 120 characters.")


def valid_description(form, field):
    description = field.data
    if len(description) < 10 or len(description) > 3000:
        raise ValidationError(
            "Description must be between 10 and 3000 characters.")


class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), valid_title])
    description = StringField('Description', validators=[valid_description])
