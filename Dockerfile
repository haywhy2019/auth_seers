# Base image
FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application
COPY . .

# Build the app
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Start the app in development mode
CMD ["yarn", "dev"]