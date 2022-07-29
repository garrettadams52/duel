Duel Arena 

MVP: This is a turn based character creation/battle game. 
Page 1(Login): Login screen to create and login to user accounts
Page 2(Home): A welcome page with a navigation bar
Page 3(Character Creation): A page to choose attributes to assign to the character
Page 4(Character View): A page to view the characters that have been created
Page 5(Battle/Duel): A turn based match between two a character that the user has saved to their account and an "enemy" that is created in the front end using third party API's Pokemon/Magic the gathering/ and/or Dnd.

The data that is stored will be users, characters, and moves. Users to characters has a one to many relationship since an account can save x characters(limit of 5?) and characters to moves has a many to many relationship. 


Models:
Characters
--------
id serial PK
strength int
defense int
accuracy int
evasion int
wisdom int
spirit int
name string 
type string
level int
experience int 
user FK >- Users.id

Users
--------
id serial PK
email int
password string
account_date date

Moves
---------
id serial pk
attack int
accuracy int
magical boolean
character FK >-< Characters.id





TODO:

Create Enemy Character on the front end
    Get traits from 3 API's and display image and log traits

Finish NavBar and Page Navigation

Outline Models and send to instructors, Project Doc