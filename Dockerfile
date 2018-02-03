FROM python:2.7

RUN pip install flask

ADD src /src

CMD python /src/timten.py