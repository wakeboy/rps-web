FROM node:12.18.2-alpine
RUN npm install http-server -g
COPY dist/web /dist
EXPOSE 80
WORKDIR /dist/web/browser
CMD ["http-server"]