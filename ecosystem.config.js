// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'simple-web-server',
      script: 'server.ts',
      interpreter: 'node_modules/.bin/ts-node',
      watch: ['server.ts'],
      env: {
        NODE_ENV: 'production',
        PORT: 3500
      }
    }
  ]
}
