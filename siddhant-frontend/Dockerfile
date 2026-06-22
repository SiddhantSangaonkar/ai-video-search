FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose Vite development server port
EXPOSE 5173

# Run the dev server and bind to all host interfaces
CMD ["npm", "run", "dev", "--", "--host"]
