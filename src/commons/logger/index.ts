import * as path from 'path';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, colorize, align } = format;

const errorFile = path.join(__dirname, 'error.log');
const combinedFile = path.join(__dirname, 'combined.log');

console.log('ERROR LOG: ', errorFile);

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    align(),
    format.printf(
      (info) => `${info.timestamp} [${info.level}]: ${info.message}`
    )
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: errorFile, level: 'error' }),
    new transports.File({ filename: combinedFile })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'qual') {
  logger.add(
    new transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        align(),
        format.printf(
          (info) => `${info.timestamp} [${info.level}]: ${info.message}`
        )
      )
    })
  );
} else {
  logger.add(
    new transports.Console({
      format: combine(
        timestamp(),
        align(),
        format.printf(
          (info) => `${info.timestamp} [${info.level}]: ${info.message}`
        )
      )
    })
  );
}

export default logger;
