from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
# from writers.models import Writer
from django.db import models

# Create your models here.
class Like(models.Model):
    from_user = models.ForeignKey('writers.Writer', on_delete=models.CASCADE, related_name='likes')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    liked_object = GenericForeignKey('content_type', 'object_id')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('from_user', 'content_type', 'object_id')

    def __str__(self):
        return f'{self.from_user.username}:{self.id}'

    @property
    def model_name(self):
        return self.content_type.model
    
    @property
    def app_label(self):
        return self.content_type.app_label
