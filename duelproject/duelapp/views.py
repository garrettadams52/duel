from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import AppUser as User, BaseCharacter, Character, Moves
from django.core import serializers
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
def home(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

@api_view(['POST'])
def sign_up(request):
    try:
        User.objects.create_user(username=request.data['email'], password=request.data['password'], email=request.data['email'])
    except Exception as e:
        print(str(e))
    return HttpResponse('hi')

@api_view(['POST'])
def log_in(request):
    print(dir(request))
    print(dir(request._request))

    # DRF assumes that the body is JSON, and automatically parses it into a dictionary at request.data
    email = request.data['email']
    password = request.data['password']
    # user = authenticate(username=email, password=password, email=email)
    user = authenticate(username=email, password=password)
    print('user?')
    print(user.email)
    print(user.password)
    if user is not None:
        if user.is_active:
            try:
                # access the base request, not the DRF request
                # this starts a login session for this user
                login(request._request, user)
            except Exception as e:
                print('except')
                print(str(e))
            return HttpResponse('success!')
            # Redirect to a success page.
        else:
            return HttpResponse('not active!')
            # Return a 'disabled account' error message
    else:
        return HttpResponse('no user!')
        # Return an 'invalid login' error message.

@api_view(['POST'])
def log_out(request):
    logout(request)
    return HttpResponse('Logged you out!')

@api_view(['GET'])
def who_am_i(request):
    # Make sure that you don't send sensitive information to the client, such as password hashes
    # raise Exception('oops')
    if request.user.is_authenticated:
        data = serializers.serialize("json", [request.user], fields=['email', 'username'])
        return HttpResponse(data)
    else:
        return JsonResponse({'user':None})

#send character data to frontend

def return_base_characters(request):
    base_characters = serializers.serialize("json",BaseCharacter.objects.all())
    return HttpResponse(base_characters)

@csrf_exempt
@api_view(['POST'])
def create_character(request):
    char_data = json.loads(request.body.decode('utf-8'))
    mock_user = User.objects.get(id=1)
    new_char = Character(strength=char_data['strength'],defense=char_data['defense'],accuracy=char_data['accuracy'],evasion=char_data['evasion'],wisdom=char_data['wisdom'],spirit=char_data['spirit'],type=char_data['type'],level=0,experience=0,image='na',user=mock_user)
    new_char.save()
    return HttpResponse("success")

def return_characters(request):
    characters = serializers.serialize("json",Character.objects.all())
    return HttpResponse(characters)