FROM  node:latest

WORKDIR /usr/src/splitwise-frontend

COPY package*.json ./

RUN npm install

# COPY . .

EXPOSE 3000

CMD [ "./run-frontend.sh" ]