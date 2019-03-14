require('dotenv-safe').config();

const { format, transports } = require('winston')
require('winston-daily-rotate-file')

class Logger {

  constructor(service) {

    let dailyRotateTransport = new (transports.DailyRotateFile)({
      filename: `logs/${service}/%DATE%.log`,
      datePattern: 'YYYY-MM-DD-HH-mm',
      zippedArchive: true,
      maxSize: '1m',
      maxFiles: '2d'
    })

    dailyRotateTransport.on('rotate', (oldFilename, newFilename) => {
      console.log(`O rotate foi chamado. old: ${oldFilename} | new:${newFilename}`)
    })

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
        new transports.File({ filename: `logs/${service}/combined.log` }),
        dailyRotateTransport
      ]
    }
  }

}

module.exports = Logger