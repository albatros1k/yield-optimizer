FROM node:16

EXPOSE 4173

WORKDIR /home/node/app
# USER node

COPY . /home/node/app

RUN yarn install && yarn build

ENTRYPOINT yarn preview --host 0.0.0.0 --open 0