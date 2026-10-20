// pm2 process config. All configuration comes from the environment / .env.
module.exports = {
  apps: [
    {
      name: "public-mcp-starter",
      script: "build/server.js",
      instances: 1,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        BIND_ADDR: "127.0.0.1",
      },
    },
  ],
};
