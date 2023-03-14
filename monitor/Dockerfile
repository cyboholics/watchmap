FROM node:18-alpine

WORKDIR /app
ARG DATABASE_URL
ARG PROJECT_HOST

ENV DATABASE_URL=$DATABASE_URL
ENV PROJECT_HOST=$PROJECT_HOST

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "start"]