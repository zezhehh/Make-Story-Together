from rest_framework.permissions import BasePermission, SAFE_METHODS

class GroupPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        if request.user.is_anonymous:
            return False
        return request.user.account == obj.owner
