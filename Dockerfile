# Official Playwright image — includes Ubuntu Noble (24.04 LTS), the correct Node.js version,
# and all browser system dependencies pre-installed. No manual browser or Node setup needed.
# Pin to the same version as @playwright/test in package.json to guarantee compatibility.
FROM mcr.microsoft.com/playwright:v1.59.1-noble

# Avoid interactive prompts during any apt operations
ENV DEBIAN_FRONTEND=noninteractive

# Set the working directory inside the container
WORKDIR /app

# Copy dependency manifests first — Docker caches this layer separately.
# As long as package.json and package-lock.json don't change, npm ci is not re-run on rebuild.
COPY package*.json ./

# Install all dependencies (including devDependencies — needed for the test runner and ESLint)
RUN npm ci

# Copy the rest of the source files
COPY . .

# Browsers are already installed in the base image — no need to run playwright install.
# If you ever switch to a non-Playwright base image, uncomment the line below:
# RUN npx playwright install --with-deps chromium

# SERVER selects the active environment from config/config.ts.
# Override at runtime: docker-compose run -e SERVER=your_env playwright-tests
# PASS is the authentication password — always override via .env or runtime flag, never hardcode a real value here.
ENV SERVER=example
ENV PASS=

# Clean npm cache to reduce final image size
RUN npm cache clean --force

# Default command — runs the API test suite.
# Override in docker-compose or at runtime to run a different suite:
#   docker-compose run playwright-tests npm run test:e2e
CMD ["npm", "run", "test:api"]