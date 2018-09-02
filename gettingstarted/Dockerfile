FROM arm32v6/node:alpine
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*
ADD ./IoT/gettingstarted .
RUN npm install
CMD ["npm", "start"]