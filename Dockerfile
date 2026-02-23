
# use official node image 
FROM node:20-alpine

# set working directory
WORKDIR /app

# copy package.json files
COPY package*.json ./

# install dependencies
RUN npm ci --omit=dev

# copy full project
COPY . .

# expose port
EXPOSE 5000

# start the application
CMD ["npm", "start"]