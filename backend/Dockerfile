FROM node:22-alpine AS base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN npm install -g corepack@latest
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base as runner
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV API_URL=http://localhost:3333
ENV MONGODB_URI=mongodb://mongodb:27017/rocketbox
ENV PORT=3333

EXPOSE 3333

CMD pnpm start
