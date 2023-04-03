###################################################################################################
# Dockerfile to build a Node.js application container image                                       #
###################################################################################################

# development stage
FROM node:19.8.1-alpine as development

WORKDIR /app

COPY ./ ./

RUN npm i

EXPOSE 5173

CMD npm run dev --host

# build stage
FROM development as build

RUN npm run build

# production stage
FROM nginx:stable-alpine as production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# no need to have a CMD here, as the default CMD of nginx is to start the server
