docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
#docker rmi make-story-together_backend
docker rmi make-story-together_frontend

