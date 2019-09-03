FROM python
WORKDIR /backend
ARG location=China  

COPY . /backend

RUN if [ "$location" = "China" ] ; \
    then pip install -r requirements_mini.txt -i https://pypi.tuna.tsinghua.edu.cn/simple ; \
    else pip install -r requirements_mini.txt ; \
    fi

EXPOSE 8000

COPY ./docker-entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/docker-entrypoint.sh
CMD bash docker-entrypoint.sh
