from django.urls import path

from .consumer import StoryConsumer

websocket_urlpatterns = [
    path('ws/story/<int:story_id>/', StoryConsumer),
]
