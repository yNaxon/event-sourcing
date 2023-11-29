FROM node:19.9.0 As development
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --dev --frozen-lockfile
COPY . .
RUN yarn prisma:generate
RUN yarn build

FROM node:19.9.0 as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install --frozen-lockfile --production
COPY . .
RUN yarn prisma:generate
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]
