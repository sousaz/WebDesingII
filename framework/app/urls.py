from . import views
from django.urls import path

urlpatterns = [
    path("", views.index),
    path("audio/", views.audio, name="audio")
]