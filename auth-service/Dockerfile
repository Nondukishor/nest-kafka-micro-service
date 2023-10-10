FROM node:20-alpine

WORKDIR /home/app

COPY . .

RUN npm install

RUN npx prisma generate

CMD [ "npm", "run", "start:dev" ]

