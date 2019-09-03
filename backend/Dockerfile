FROM python
WORKDIR /backend
ARG location=China  

COPY ./requirements_mini.txt /backend

RUN if [ "$location" = "China" ] ; \
    then pip install -r requirements_mini.txt -i https://pypi.tuna.tsinghua.edu.cn/simple ; \
    else pip install -r requirements_mini.txt ; \
    fi

COPY . /backend

EXPOSE 8000

CMD bash docker-entrypoint.sh
