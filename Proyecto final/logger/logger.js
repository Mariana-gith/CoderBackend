import log4js from 'log4js'

log4js.configure({
  appenders: {
    consola: { type: 'console' },
    archivoErrores: { type: 'file', filename: 'errores.log' },
    archivowarning : { type: 'file', filename: 'warning.log' },
    loggerConsola: {
      type: 'logLevelFilter',
      appender: 'consola',
      level: 'info',
    },
    loggerArchivoErrores: {
      type: 'logLevelFilter',
      appender: 'archivoErrores',
      level: 'error',
    },
    loggerArchivowarning: {
      type: 'logLevelFilter',
      appender: 'archivowarning ',
      level: 'warning',
    },
  },
  categories: {
    default: {
      appenders: ['loggerConsola'],
      level: 'all',
    },
    prod: {
      appenders: ['loggerArchivoErrores', 'loggerArchivowarning'],
      level: 'all',
    },
  },
})


const logger = log4js.getLogger()


export default logger