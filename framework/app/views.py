from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
import pyttsx3
import os

# Create your views here.

def index(request):
    return render(request, "index.html")

def audio(request):
    if request.method == "POST":
        engine = pyttsx3.init()
        text = request.POST.get("message", "")
        engine.save_to_file(text, os.path.join(settings.MEDIA_ROOT, "test.mp3"))
        engine.runAndWait()

        with open(os.path.join(settings.MEDIA_ROOT, "test.mp3"), "rb") as audio_file:
            response = HttpResponse(audio_file.read(), content_type="audio/mpeg")
        response["Content-Disposition"] = f"attachment; filename=test.mp3"
        return response
    return HttpResponse("Este endpoint só aceita resquisições do tipo POST.")
