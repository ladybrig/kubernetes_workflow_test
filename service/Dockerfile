FROM python:3.11.0a1-slim-bullseye

WORKDIR /project
COPY ./src /project

RUN pip install -r requirements.txt

ENTRYPOINT python app.py
