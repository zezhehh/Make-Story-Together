from rest_framework.viewsets import ModelViewSet

# Create your views here.
class WriterViewSet(ModelViewSet):
    def get_queryset(self):
        