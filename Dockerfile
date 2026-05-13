FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /app

COPY . .
RUN npm ci

CMD ["npm", "t"]