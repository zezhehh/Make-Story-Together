- Requirements: `node.js` `yarn` `python3`
- In directory `/backend`, run `python3 manage.py runserver 0.0.0.0:8000` to start backend
    - `requirements.txt` contains modules used in my virtual environment
- In directory `makestorytogether`, `yarn start` to start development mode of frontend
    - For first use, run `yarn` to add dependencies


## TODO

- 新增交互接口
- websocket to inform update
- like character/plot/story
- Dockerfile
- 重构react post函数
- Model Details TBD
  - group invitation
- UI
- API
  - different user: different detail info
  - paginate
- Feed - Celery
- Cache to speed up / reselect

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

```
{
   "liked_object": {"id":9,"model_name":"story","app_label":"stories"}
}
```



