module.exports = {
  apps: [{
    script: "src/index.js",
    env: {
      NODE_ENV: "production"
    },
    error_file: 'logs/error.log',
    out_file: 'logs/info.log',
    log_file: 'logs/server.log',
    time: true
  }]
}