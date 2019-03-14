require('dotenv-safe').config();

const Logger = require('./Logger')

// Carrega apenas os atributos que serão utilizados
const { createLogger, format, transports } = require('winston')

// https://www.npmjs.com/package/winston#creating-your-own-logger
// const logger = createLogger({
//   level: process.env.NODE_ENV==='production' ? 'info' : 'debug',
//   format: format.combine(
//     format.timestamp({
//       format: 'YYYY-MM-DD HH:mm:ss'
//     }),
//     format.errors({ stack: true }),
//     format.splat(),
//     format.json()
//   ),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     //
//     // - Write to all logs with level `info` and below to `combined.log`
//     // - Write all logs error (and below) to `error.log`.
//     //
//     new transports.File({ filename: 'logs/user-service-error.log', level: 'error' }),
//     new transports.File({ filename: 'logs/user-service-combined.log' })
//   ]
// })

const logger = createLogger(new Logger('user'))

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

logger.error('esse é um error()')
logger.log('info','esse é um log(info)')
logger.info('esse é um info()')
logger.debug('esse é um debug()')