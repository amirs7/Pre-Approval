FROM node:lts-slim
RUN mkdir /app
WORKDIR /app
ADD ./package.json /app
RUN npm install
ADD ./ /app
ENV PORT=80
VOLUME /app/data
CMD node server.js
