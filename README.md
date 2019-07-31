

## APIs

## Account

- `/register/`
- `/signin/`
- `/logout/`

## Group

- `/group/join/`
- `/group/leave/`
- `/group/create/`
- `/group/dismiss/` When #members==0, group is archived

## Displine

- `/displine/create/`
- `/displine/apply/`
- `/displine/delete/`


## Story

- `/story/create/`
- `/story/delete/`
- `/story/configure/`
- `/story/chapter/create/`
- `/story/chapter/delete/`
- `/story/plot/create/`
- `/story/plot/delete/`
- `/story/plot/edit/`
- `/story/character/create/`


## Main Models
### Writer

- user
- screen_name
- created_at
- joined - ManyToMany of Story


### Discipline

> To control the permission about the actions to story

- blacklist - ManyToMany of Writers
- whitelist - ManyToMany of Writers
- registration_time - requirement of qualification
- update_cycle
- life_cycle


### Group

- name
- Description
- Rule - ForeignKey of Discipline

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


