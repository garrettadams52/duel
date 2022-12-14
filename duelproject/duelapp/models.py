from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import AbstractUser

# Inheriting from 'AbstractUser' lets us use all the fields of the default User,
# and overwrite the fields we need to change
# This is different from 'AbstractBaseUser', which only gets the password management features from the default User,
# and needs the developer to define other relevant fields.
class AppUser(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] # Email & Password are required by default.

class Character(models.Model):
    #Character Stats
    strength = models.IntegerField()
    defense = models.IntegerField()
    accuracy = models.IntegerField()
    evasion = models.IntegerField()
    wisdom = models.IntegerField()
    spirit = models.IntegerField()

    #Else
    #add description
    type = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    level = models.IntegerField()
    experience = models.DecimalField(decimal_places=2,max_digits=10)
    user = models.ForeignKey(AppUser,on_delete=models.CASCADE)

class BaseCharacter(models.Model):
    strength = models.IntegerField()
    defense = models.IntegerField()
    accuracy = models.IntegerField()
    evasion = models.IntegerField()
    wisdom = models.IntegerField()
    spirit = models.IntegerField()
    type = models.CharField(max_length=255)

class Moves(models.Model):
    name = models.CharField(max_length=255)
    power = models.IntegerField()
    accuracy = models.IntegerField()
    magical = models.BooleanField()
    character = models.ManyToManyField(BaseCharacter)


