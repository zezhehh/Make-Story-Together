- Requirements: `node.js` `yarn` `python3`
- In directory `/backend`, run `python3 manage.py runserver 0.0.0.0:8000` to start backend
- In directory `makestorytogether`, `yarn start` to start development mode of frontend
    - For first use, run `yarn` to add dependencies


## TODO

- Model Details
- UI
- API
- Authentification
- Feed - Celery
- Cache to speed up / reselect

## APIs Memo

### Account

- `/register/`
- `/signin/`
- `/logout/`
- `/follow/`

### Group

- `/group/join/`
- `/group/leave/`
- `/group/create/`
- `/group/dismiss/` When #members==0, group is archived

### Displine

- `/displine/create/`
- `/displine/apply/`
- `/displine/delete/`


### Story

- `/story/create/`
- `/story/delete/`
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



