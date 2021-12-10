FROM python

WORKDIR /project
COPY ./src /project

RUN pip install -r requirements.txt

ENTRYPOINT python app.py
