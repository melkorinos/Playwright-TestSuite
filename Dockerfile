FROM ubuntu:focal
 
# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive
 
# Install Node.js 16 and other necessary dependencies
# https://github.com/microsoft/playwright/issues/10168#issuecomment-965941358
RUN apt-get update && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
 
# Set the working directory
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install production dependencies
RUN npm ci --only=production
 
# Copy the rest of the application
COPY . .
 
# Install Chromium and its dependencies
RUN npx playwright install --with-deps chrome
 
# Set environment variables
ENV SERVER=dev2.v8
ENV PROJECT=DEBUG
 
# Clean up to reduce image size
RUN npm cache clean --force && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
 
# Run the API test
CMD ["npm", "run", "test:verifyTestSuite"]