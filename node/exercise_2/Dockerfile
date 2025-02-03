FROM node:22

# Sets the current working app directory
WORKDIR /app

COPY package*.json ./

# RUN is executed as a Docker layer, if not changed, uses cached instead
RUN npm install

# Copying code into the container
COPY . .

# Set environment
ENV PORT=3000

EXPOSE 8080

# CMD is executed as a normal cli command, after building the container
# ONLY 1 CMD can be specified for a Dockerfile
CMD ["npm", "start"]
