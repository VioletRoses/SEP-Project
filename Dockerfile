#Includes node.js
FROM node:14

#Sets directory
WORKDIR /usr/src/credisearch

#Copies in package.json (and -lock.json)
COPY package*.json ./

#Downloads node deps
RUN npm install


COPY . .

#Exposes port 80
EXPOSE 80

CMD [ "node", "app.js" ]