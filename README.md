

## APIs

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


## Main Models
### Writer

- user
- screen_name
- created_at
- stories - ManyToMany of Story
- groups - ManyToMany of Group


### Discipline

> To control the permission about the actions to story

- blacklist - ManyToMany of Writers
- whitelist - ManyToMany of Writers
- registration_time - requirement of qualification
- update_cycle


### Feed

- writer - ForeinKey of Writer
- character - ForeinKey of Character
- plot - ForeinKey of Plot
- group - ForeinKey of Group
- story - ForeinKey of Story
- chapter - ForeinKey of Chapter
- content_type


### Group

- name
- Description
- Rule - ManyToMany of Discipline

### Character

- players - ManyToManyto of Writer (size=3)
- participation - percentage
- appear_at - ForeinKey of Plot
- update - ForeignKey of Plot

### Plot

- written_by - ForeinKey of Writer
- created_at
- valid
    - Clean invalid plots per some time
- content
- chapter - ForeinKey of Chapter


### Chapter

- title
- created_at
- story - ForeignKey of Story
- rules - ManyToMany of Discipline


### Story

- title
- creator - ForeignKey of Writer
- maintainer - ForeignKey of Group
- description
- rules - ManyToMany of Discipline
- style
- category
- public - private chat between users, story of group or public story

