FROM node:14-alpine as builder
ARG SSH_KEY
ENV SSH_KEY=$SSH_KEY
RUN mkdir /root/.ssh/
RUN echo "$SSH_KEY" > /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa
RUN touch /root/.ssh/known_hosts
RUN apk add --no-cache git openssh
RUN /usr/bin/ssh-keyscan bitbucket.org >> /root/.ssh/known_hosts
WORKDIR /app
COPY package*.json ./
RUN npm config set unsafe-perm true
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]
EXPOSE 8080