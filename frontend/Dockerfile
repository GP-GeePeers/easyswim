# Use the official Node.js image from the Docker Hub
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files and install dependencies
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install

# Copy the rest of the application's code
COPY . /app/

# Expose the port the React app runs on
EXPOSE 3000

# Command to start the React development server
CMD ["npm", "start"]
