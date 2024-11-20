"""
ASGI config for pledchat project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "pledchat.settings")

django_application = get_asgi_application()

from . import urls  # noqa isort:skip

application = ProtocolTypeRouter(
    {
        "http": django_application,
        "websocket": URLRouter(urls.websocket_urlpatterns),
    }
)
