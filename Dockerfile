FROM node:22-alpine

# Set the working directory in the container
WORKDIR /code

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8000

CMD [ "npm", "run", "dev" ]
