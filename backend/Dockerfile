FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install build dependencies for native modules (like bcrypt)
RUN apk add --no-cache python3 make g++ 

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set permissions for uploads (if needed)
RUN mkdir -p uploads && chmod -R 777 uploads

# Expose the backend port
EXPOSE 4000

# Start command with migration
CMD ["sh", "-c", "npx knex migrate:latest && npm start"]
