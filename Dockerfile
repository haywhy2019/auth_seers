FROM node:18-alpine

WORKDIR /app

# Copy only package files first
COPY package.json yarn.lock ./

# Clean yarn cache after install
RUN yarn install && yarn cache clean

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Remove development dependencies
RUN yarn install --production

EXPOSE 3000

CMD ["yarn", "start"]