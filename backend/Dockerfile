FROM python:3.9
ENV PYTHONUNBUFFERED 1
RUN mkdir /app
WORKDIR /app
COPY requirements.txt /app/
RUN pip install --user -r requirements.txt
COPY . /app/
CMD python manage.py runserver
