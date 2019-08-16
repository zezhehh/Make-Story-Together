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
