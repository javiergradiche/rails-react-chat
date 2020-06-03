FROM node:10
 
# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /app
 
# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./
 
# Installs all node packages
RUN npm install
RUN yarn global add serve

# Copies everything over to Docker environment
COPY . .
 
# Uses port which is used by the actual application
EXPOSE 5000

RUN yarn build


# Finally runs the application
CMD [ "serve", "-s", "build" ]