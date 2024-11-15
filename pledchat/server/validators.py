import os

from django.core.exceptions import ValidationError
from PIL import Image


def validate_icon_image_size(image, size=70):
    if image:
        with Image.open(image) as img:
            if img.width > size or img.height > size:
                raise ValidationError(f"Image is too large. Maximum size is {size}px")


def validate_banner_image_size(image, size=100):
    if image:
        with Image.open(image) as img:
            if img.width > size or img.height > size:
                raise ValidationError(f"Image is too large. Maximum size is {size}px")


def validate_image_file_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = [".jpg", ".jpeg", ".png", ".gif"]
    if ext.lower() not in valid_extensions:
        raise ValidationError("Unsupported file extension. Supported extensions are: .jpg, .jpeg, .png, .gif")
