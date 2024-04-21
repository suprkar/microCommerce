# Use Node.js 14 as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/image-service

# Copy everything from the current directory to the Workdir in the container
COPY . .

# Install all dependencies from the package.json
RUN npm install

# Install additional software for image processing
RUN apt-get update && apt-get install -y imagemagick

# Expose port 4003 for service communication
EXPOSE 4003

# Environment settings
ENV NODE_ENV production

# The command to run our application
CMD ["node", "index.js"]
