FROM node:10.12-alpine as builder

WORKDIR /src
ADD package-lock.json .
ADD package.json .

# install everything (and clean up afterwards)
RUN apk -v --update add \
  python \
  py-pip \
  && \
  npm config set unsafe-perm true && \
  npm install -g rimraf && \
  pip install --upgrade awscli==1.14.5 s3cmd==2.0.1 && \
  apk -v --purge del py-pip && \
  rm /var/cache/apk/*

# Add the remaining project files
ADD . .

COPY env ./src/env

RUN npm install
RUN npm run build

FROM nginx:alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' copy website to default nginx public folder
COPY --from=builder /src/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

