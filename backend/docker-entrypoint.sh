#!/bin/bash

# Collect static files
# echo "Collect static files"
# python manage.py collectstatic --noinput

# Apply database migrations
echo "Apply database migrations"
python manage.py makemigrations writers
python manage.py makemigrations disciplines
python manage.py makemigrations groups
python manage.py makemigrations stories
python manage.py makemigrations feeds
python manage.py makemigrations likes
python manage.py migrate

# Create superuser
echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@example.com', 'admin')" | python manage.py shell

# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8000
