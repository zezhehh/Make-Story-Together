The devolopment version could be visited at http://207.148.115.171:3000
- Encounter something wrong? Refresh it...

---

- Requirements: `node.js` `yarn` `python3` `postgresql` `redis`
    - Don't forget to start services `postgresql` and `redis-server`
- In directory `/backend`, run `python3 manage.py runserver 0.0.0.0:8000` to start backend
    - `requirements.txt` contains modules used in my virtual environment
    - `pip install git+https://github.com/Ian-Foote/rest-framework-generic-relations.git`
- In directory `makestorytogether`, `yarn start` to start development mode of frontend
    - For first use, run `yarn` to add dependencies


## Features

- Authentication based on Json Web Token
- RESTful API for almost all models used
    - LIST / CREATE(POST) / DELETE / RETRIEVE / PATCH
    - filter query by url params
    - statistic for personal info (like registration time, number of plots created or timeline of some achievements)
- Signal of model creation to generate feeds
    - only listen to creation of Group/Story yet
- Group/Story management page
    - Ugly creation form yet
- Like or Unlike Story/Plot/Character
    - something like follow
- (What this project finally aims to do) Write story with connecting to websocket specified by story_id
    - Update the writing page immediately when here come new plots or chapters


## TODO - I DON'T WANT TO DO THEM YET

- Handle Error HTTP Response
- Personal info page
  - for now, only the own page is visited
- Discipline Functionality
- More interation UI interface
- Fit mobile user
- Control conflicts of simultaneously plot creation 
- Dockerfile
- Refactory / reuser axio functions
- Model Details TBD
  - group invitation
  - email verification
- Beautiful UI Design
  - Current ui are all based on Ant.design
- API Pagination
- Celery
- Cache to speed up / reselect in redux


## APIs Memo

### Account

- `/?screen_name=`
  - search writer by screen_name
- `/register/`
- `/signin/`
- `/logout/`


### Group

- `/group/{pk}/join/`
- `/group/{pk}/quit/`
- `/group/(?order=number)`
  - `GET` groups list
  - `POST` create group
- `/group/{pk}/`
  - `GET` fetch detail
  - `DELETE` delete group
- `/group/my/`
  - owned groups list
- `/group/joined/`
  - joined groups list
- `/group/remove_members/`
  - `{"usernames": []}`
  - remove members given list of usernames
- `/group/remove_discipline/`
  - `{"discipline_id": }`
  - remove discipline from rule
- `/group/apply_discipline/`
  - `{"discipline_id": }`
  - add discipline to rule


### Story

- `/story/(?order=number&&group={group_id})`
  - `GET` stories list
  - `POST` create story
- `/story/{pk}/`
  - `GET` fetch detail
    - different serializers: story participator and normal user
  - `DELETE` delete story
-  `/story/my/`
  - owned stories list
- `/story/joined/`
  - joined stories list
- `/story/{pk}/plots/?chapter_id=`
- `/story/{pk}/chapters/`
- `/story/{pk}/new_chapter/`
  - POST DATA: `{"title": }`
- `/story/{pk}/new_plot/`
  - POST DATA: `{"content": , "chapter_id": }`
- `/story/{pk}/clear_empty_content/`
- `/story/{pk}/remove_invalid_plots/`
- `/story/{pk}/get_characters/`


### Character

- `/character/?story_id=`
    - POST format: 

```
{
    "description": "",
    "name": "",
    "player": screen_name,
    "story": id
}
```

### Like

- `/like/`
    - POST format: 

```
{
   "liked_object": {"id":9,"model_name":"story","app_label":"stories"}
}
```



