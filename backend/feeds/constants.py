NEW_STORY = 'NEW_STORY'
# NEW_CHARACTER = 'NEW_CHARACTER'
POPULAR_PLOT = 'POPULAR_PLOT'
NEW_GROUP = 'NEW_GROUP'
# NEW_CHAPTER = 'NEW_CHAPTER'
POPULAR_CHARACTER = 'POPULAR_CHARACTER'
POPULAR_STORY = 'POPULAR_STORY'


FEED_TYPE_CHOICES = [
    (NEW_STORY, 'New Story'),
    # (NEW_CHARACTER, 'New Character'),
    # (NEW_CHAPTER, 'New Chapter'),
    (NEW_GROUP, 'New Group'),
    (POPULAR_PLOT, 'Popular Plot'),
    (POPULAR_CHARACTER, 'Popular Character'),
    (POPULAR_STORY, 'Popular Story')
]


def format_new_story(story):
    return f'Story {story.id} was created!'

def format_new_group(group):
    return f'Group {group.name} was created!'

def format_popular_plot(plot):
    return f'Plot written by {plot.written_by.screen_name} becomes trendy!:\n\t{plot.content}'

def format_popular_character(character):
    return f'Character {character.name} in story {character.story.title} becomes trendy!'

def format_popular_story(story):
    return f'Story {story.title} becomes trendy!'
