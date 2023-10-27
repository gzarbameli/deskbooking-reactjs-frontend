FROM node:16-alpine
#Workdir
WORKDIR /app
#CP
COPY package.json ./

COPY package-lock.json ./

RUN npm install react-router-dom \
    && npm install react-icons \
    && npm install styled-components \
    && npm install axios

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
