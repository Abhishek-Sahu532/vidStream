FROM node:21

#Change the working directory to /app/backend
WORKDIR /app/backend

#Copy the root package.json and package-lock.json (if available)
COPY package*.json ./


#Copy only the backend folder contents
COPY backend/ .


#Install dependencies
RUN npm install --only=production


#Expose the port that your app runs on
EXPOSE 8000


#Start the application
CMD ["node", "src/index.js"]
