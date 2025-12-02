from django.db import models


class Profile(models.Model):
    full_name = models.CharField(max_length=100)
    job_title = models.CharField(max_length=100)
    short_bio = models.TextField()
    about_me = models.TextField()
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100, blank=True)
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    instagram = models.URLField(blank=True)

    def __str__(self):
        return self.full_name


class Skill(models.Model):
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=50)
    level = models.IntegerField(help_text='0-100')
    category = models.CharField(
        max_length=50, blank=True)

    def __str__(self):
        return f"{self.name} - {self.profile.full_name}"


class Experience(models.Model):
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='experiences')
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.position} at {self.company}"


class Project(models.Model):
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=100)
    description = models.TextField()
    technologies = models.CharField(
        max_length=200, help_text='e.g.: Django, React, PostgreSQL')
    link = models.URLField(blank=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.name}"
