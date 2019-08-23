from rest_framework.permissions import BasePermission, SAFE_METHODS

class StoryPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        if request.user.is_anonymous:
            return False
        writer = request.user.account
        is_creator = obj.creator
        if is_creator:
            is_creator = writer == obj.creator
        is_maintainer_owner = obj.maintainer
        if is_maintainer_owner:
            is_maintainer_owner = writer.owned_groups.filter(id=obj.maintainer.id).exists()
        return is_creator or is_maintainer_owner

class ChapterPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return False
        return True
    
    def has_object_permission(self, request, view, obj):
        if request.user.is_anonymous:
            return False
        writer = request.user.account
        is_creator = obj.story.creator
        if is_creator:
            is_creator = writer == obj.story.creator
        is_maintainer_owner = obj.story.maintainer
        if is_maintainer_owner:
            is_maintainer_owner = writer.owned_groups.filter(id=obj.story.maintainer.id).exists()
        return is_creator or is_maintainer_owner


class PlotPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return False
        return True

    def has_object_permission(self, request, view, obj):
        if request.user.is_anonymous:
            return False
        writer = request.user.account
        is_creator = obj.chapter.story.creator
        if is_creator:
            is_creator = writer == obj.chapter.story.creator
        is_maintainer_owner = obj.chapter.story.maintainer
        if is_maintainer_owner:
            is_maintainer_owner = writer.owned_groups.filter(id=obj.chapter.story.maintainer.id).exists()
        is_written = obj.written_by
        if is_written:
            is_written = obj.written_by == writer
        return is_creator or is_maintainer_owner or is_written


class CharacterPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_anonymous:
            return False
        writer = request.user.account
        is_creator = obj.story.creator
        if is_creator:
            is_creator = writer == obj.story.creator
        is_maintainer_owner = obj.story.maintainer
        if is_maintainer_owner:
            is_maintainer_owner = writer.owned_groups.filter(id=obj.story.maintainer.id).exists()
        is_written = obj.player
        if is_written:
            is_written = obj.player == writer
        return is_creator or is_maintainer_owner or is_written
