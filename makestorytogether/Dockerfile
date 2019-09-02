FROM node
WORKDIR /code
ARG location=China  
RUN if [ "$location" = "China" ] ; \
    then npm config set registry https://registry.npm.taobao.org --global && \
        npm config set disturl https://npm.taobao.org/dist --global && \
        npm install yarn && \
        yarn config set registry https://registry.npm.taobao.org --global && \
        yarn config set disturl https://npm.taobao.org/dist --global && \
        yarn ; \
    else npm install yarn && yarn ; \
    fi
COPY ../makestorytogether .
EXPOSE 3000
CMD yarn start
