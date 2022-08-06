from . import views 
from django.urls import path

urlpatterns = [
    
    path('',views.home),
    path('signup', views.sign_up),
    path('login',views.log_in),
    path('logout',views.log_out),
    path('whoami',views.who_am_i),
    path('basecharacters',views.return_base_characters),
    path('createcharacter',views.create_character),
    path('characters',views.return_characters),
    path('deletecharacter',views.delete_character),
    path('moves',views.return_moves),
    path('addexp',views.add_exp),
    path('updatename',views.update_name)

]
