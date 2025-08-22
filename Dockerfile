# Multi-stage build for React UI
FROM node:18-alpine AS ui-build
WORKDIR /app/ui
COPY ui/package*.json ./
RUN npm install
COPY ui/ ./
RUN npm run build

# Python service stage
FROM python:3.11-slim AS service
WORKDIR /app/service
COPY service/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY service/ ./

# Final stage - serve both UI and API
FROM python:3.11-slim
WORKDIR /app

# Install Python dependencies
COPY --from=service /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=service /usr/local/bin /usr/local/bin

# Copy service code
COPY --from=service /app/service ./service

# Copy built UI
COPY --from=ui-build /app/ui/build ./ui/build

# Install nginx to serve static files
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Create nginx config
RUN echo 'server {\n\
    listen 80;\n\
    \n\
    # Serve React app\n\
    location / {\n\
        root /app/ui/build;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    \n\
    # Proxy API requests\n\
    location /api/ {\n\
        proxy_pass http://localhost:8000;\n\
        proxy_set_header Host $host;\n\
        proxy_set_header X-Real-IP $remote_addr;\n\
    }\n\
}' > /etc/nginx/sites-available/default

# Create start script
RUN echo '#!/bin/bash\n\
nginx &\n\
cd /app/service && uvicorn src.app:app --host 0.0.0.0 --port 8000' > /start.sh

RUN chmod +x /start.sh

EXPOSE 80
CMD ["/start.sh"]