# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /backend

# Copy package.json and package-lock.json before other files to leverage Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY backend ./

# Expose the application port
EXPOSE 8080

# Set the command to run the application
CMD ["node", "/src/index.js"]
