from django.contrib import admin
from .models import Profile, Skill, Experience, Project, ContactMessage


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'job_title', 'email', 'location')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'level', 'category', 'profile')
    list_filter = ('category',)
    search_fields = ('name',)


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('position', 'company', 'start_date',
                    'end_date', 'is_current', 'profile')
    list_filter = ('company', 'is_current')
    search_fields = ('position', 'company')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'profile', 'technologies', 'link')
    search_fields = ('title', 'technologies')


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at', 'is_read')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email')
