from rest_framework.permissions import BasePermission, SAFE_METHODS

class StoryPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        writer = request.user.account
        return (writer == obj.creator) or \
            writer.owned_groups.filter(id=obj.maintainer.id).exists()
