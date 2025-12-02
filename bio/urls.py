from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.profile_detail),
    path('skills/', views.skill_list),
    path('experiences/', views.experience_list),
    path('projects/', views.project_list),
    path('contact/', views.contact_create),
]
