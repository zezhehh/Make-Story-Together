FROM node
WORKDIR /makestorytogether
ARG location=China  

COPY . /makestorytogether

RUN if [ "$location" = "China" ] ; \
    then npm config set registry https://registry.npm.taobao.org --global && \
        npm config set disturl https://npm.taobao.org/dist --global && \
        npm install yarn -g && \
        yarn config set registry https://registry.npm.taobao.org --global && \
        yarn config set disturl https://npm.taobao.org/dist --global && \
        yarn ; \
    else npm install yarn -g && yarn ; \
    fi

EXPOSE 3000

CMD yarn start

