FROM python
# WORKDIR /code
ARG location=China  
COPY ./requirements_mini.txt .
RUN if [ "$location" = "China" ] ; \
    then pip install -r requirements_mini.txt -i https://pypi.tuna.tsinghua.edu.cn/simple ; \
    else pip install -r requirements_mini.txt ; \
    fi
EXPOSE 8000
ENTRYPOINT ["docker-entrypoint.sh"]
