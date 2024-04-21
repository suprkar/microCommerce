# Start from the Node.js 14 base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/product-service

# Copy the current directory contents into the container at /usr/src/product-service
COPY . .

# Install necessary npm packages
RUN npm install

# Make port 4002 available to the world outside this container
EXPOSE 4002

# Environment settings
ENV NODE_ENV production
ENV DB_HOST=localhost
ENV DB_PORT=27017
ENV DB_NAME=productdb

# Command to run the application
CMD ["node", "index.js"]
