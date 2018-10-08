import * as HTTP_CODES from 'http-status';
import { Enums } from '../';
import { Interfaces } from '../../models';
import { MONGO_ERRORS } from '../constants/error';

export default class ErrorUtil {
  public static generateCodeHttp = (error): number => {
    let httpCode: number;

    if (error && error.type) {
      switch (error.type) {
        case Enums.Errors.BadRequest:
          httpCode = HTTP_CODES.BAD_REQUEST;
          break;
        case Enums.Errors.Conflict:
          httpCode = HTTP_CODES.CONFLICT;
          break;
        case Enums.Errors.InternalServerError:
          httpCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
          break;
        default:
          httpCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
          break;
      }
    } else {
      httpCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
    }
    return httpCode;
  }

  public static generateErrorRepository = (param): Interfaces.IError => {
    const error: Interfaces.IError = {
      errors: [],
      type: Enums.Errors.InternalServerError
    };

    if (param.code === MONGO_ERRORS.uniqueError) {
      const regex = /index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i;
      const match = param.message.match(regex);
      const indexName = match[1] || match[2];

      const errorMessage = new Error(`${indexName} já utilizado.`);

      error.type = Enums.Errors.Conflict;
      error.errors.push(errorMessage);
    } else if (param.name === MONGO_ERRORS.validationErrorName) {
      let errorMessages: Error[];
      errorMessages = Object.keys(param.errors).map((errorField) => {
        return new Error(`${param.errors[errorField].message}`);
      });

      error.type = Enums.Errors.BadRequest;
      error.errors = errorMessages;
    } else {
      const errorMessage = new Error(
        `Ocorreu um erro inesperado. Tente novamente mais tarde.`
      );
      error.type = Enums.Errors.InternalServerError;
      error.errors.push(errorMessage);
    }
    return error;
  }
}
