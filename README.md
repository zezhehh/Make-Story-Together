- Requirements: `node.js` `yarn` `python3`
- In directory `/backend`, run `python3 manage.py runserver 0.0.0.0:8000` to start backend
- In directory `makestorytogether`, `yarn start` to start development mode of frontend
    - For first use, run `yarn` to add dependencies


## TODO

- Model Details TBD
  - group invitation
- UI
- API
  - different user: different detail info
  - paginate
  - group management
    - discipline add/delete
    - member add/delete/join/quit
<!-- - Authentification -->
- Feed - Celery
- Cache to speed up / reselect

## APIs Memo

### Account

- `/?screen_name=`
  - search writer by screen_name
- `/register/`
- `/signin/`
- `/logout/`
- `/follow/` TODO

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

TODO::


- `/story/configure/`
- `/story/follow/`
- `/story/unfollow/`
- `/story/tag/create/`
- `/story/chapter/create/`
- `/story/chapter/delete/`
- `/story/chapter/like/`
- `/story/chapter/unlike/`
- `/story/plot/create/`
- `/story/plot/delete/`
- `/story/plot/edit/`
- `/story/plot/like/`
- `/story/plot/unlike/`
- `/story/character/create/`



