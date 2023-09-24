FROM python:3.9-slim

ENV PYTHONUNBUFFERED 1
ENV FRONTEND_DIR /app/frontend
ENV BACKEND_DIR /app/backend

RUN mkdir /app
WORKDIR /app

COPY ./backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

COPY ./backend /app/backend

COPY ./frontend /app/frontend

RUN apt-get update && apt-get install -y nodejs npm

WORKDIR $FRONTEND_DIR
RUN npm install
RUN npm run build

EXPOSE 8000

# Start the server
WORKDIR $BACKEND_DIR
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port 8000 --reload & npm run start --prefix /app/frontend"]
