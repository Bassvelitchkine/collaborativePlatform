# FROM node:current-slim as build
# WORKDIR /app/client
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# CMD ["npm", "start"]


# FROM nginx:1.16.0-alpine
# COPY --from=build /app/client/build /usr/share/nginx/html
# # On change la configuration du serveur nginx avec la ligne du dessous

# COPY --from=build nginx/nginx.conf /etc/nginx/conf.d/default.conf
# # COPY nginx/nginx.conf /usr/share/nginx/conf.d/nginx.conf

# # Attention au port qu'on expose, nginx a une confirguration par défaut, qu'on peut d'ailleurs changer
# # Mais par défaut, il semble que le port 80 seul soit exposé
# EXPOSE 80 
# CMD ["nginx", "-g", "daemon off;"]

FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]