# from django.shortcuts import render

# # Create your views here.


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Profile, Skill, Experience, Project, ContactMessage
import json


def profile_detail(request):
    profile = Profile.objects.first()
    if not profile:
        return JsonResponse({'detail': 'Profile not found'}, status=404)

    data = {
        'full_name': profile.full_name,
        'job_title': profile.job_title,
        'short_bio': profile.short_bio,
        'about_me': profile.about_me,
        'email': profile.email,
        'phone': profile.phone,
        'location': profile.location,
        'github': profile.github,
        'linkedin': profile.linkedin,
        'instagram': profile.instagram,
        'avatar_url': profile.avatar.url if profile.avatar else None,
    }
    return JsonResponse(data)


def skill_list(request):
    skills = Skill.objects.all()
    data = [
        {
            'name': s.name,
            'level': s.level,
            'category': s.category,
        }
        for s in skills
    ]
    return JsonResponse(data, safe=False)


def experience_list(request):
    experiences = Experience.objects.all().order_by('-start_date')
    data = [
        {
            'company': e.company,
            'position': e.position,
            'start_date': e.start_date,
            'end_date': e.end_date,
            'is_current': e.is_current,
            'description': e.description,
        }
        for e in experiences
    ]
    return JsonResponse(data, safe=False)


def project_list(request):
    projects = Project.objects.all()
    data = [
        {
            'title': p.title,
            'description': p.description,
            'technologies': p.technologies,
            'link': p.link,
            'image_url': p.image.url if p.image else None,
        }
        for p in projects
    ]
    return JsonResponse(data, safe=False)


@csrf_exempt
def contact_create(request):
    if request.method != 'POST':
        return JsonResponse({'detail': 'Method not allowed'}, status=405)

    try:
        body = json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
        return JsonResponse({'detail': 'Invalid JSON'}, status=400)

    name = body.get('name')
    email = body.get('email')
    message = body.get('message')

    if not name or not email or not message:
        return JsonResponse({'detail': 'name, email, message are required'}, status=400)

    ContactMessage.objects.create(name=name, email=email, message=message)
    return JsonResponse({'detail': 'Message received'}, status=201)
