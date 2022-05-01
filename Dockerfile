FROM node:14-alpine
ENV NODE_ENV=production
ENV PORT=8000
RUN mkdir /build
WORKDIR /build
COPY ./dist /build
EXPOSE 8000

# Change security context to non-root user
USER node
CMD ["node", "--max-http-header-size", "15000", "/build"]
