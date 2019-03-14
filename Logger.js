require('dotenv-safe').config();

const { format, transports } = require('winston')

class Logger {

  constructor(service) {
    return {
      level: process.env.NODE_ENV==='production' ? 'info' : 'debug',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      defaultMeta: { service: service },
      transports: [
        new transports.File({ filename: `logs/${service}/error.log`, level: 'error' }),
        new transports.File({ filename: `logs/${service}/combined.log` })
      ]
    }
  }

}

module.exports = Logger