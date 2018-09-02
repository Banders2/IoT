FROM raniot/base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --no-bin-links
COPY . .
CMD ["npm", "start"]
