from rest_framework.permissions import BasePermission, SAFE_METHODS
from .constants import PUBLIC

class DisciplinePermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        if request.method in SAFE_METHODS:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if obj.ptype == PUBLIC:
            return True
        stories = request.user.account.owned_stories.all()
        for story in stories:
            if story.rule.filter(id=obj.id).exists():
                return True
        groups = request.user.account.owned_groups.all()
        for group in groups:
            if group.rule.filter(id=obj.id).exists():
                return True
        return False
