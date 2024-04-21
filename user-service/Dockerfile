# Start with a base image containing Java runtime
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/user-service

# Copy the current directory contents into the container at /usr/src/user-service
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Make port 4001 available to the world outside this container
EXPOSE 4001

# Set environment variables
ENV NODE_ENV production
ENV DB_HOST=localhost
ENV DB_PORT=27017
ENV DB_NAME=userdb

# Run index.js when the container launches
CMD ["node", "index.js"]
