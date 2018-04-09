import * as HTTP_CODES from 'http-status';
import { ERRORS, MONGO_ERRORS } from '../../commons/constants/error';
import { IError, IErrorMessage } from '../../models/error';

export function generateDatabaseError(param: any): IError {
  let error: IError;

  if (param.code === MONGO_ERRORS.uniqueError) {
    let errorMessage: IErrorMessage;
    const regex = /index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i,
      match = param.message.match(regex),
      indexName = match[1] || match[2];

    errorMessage = {
      message: indexName + ' já utilizado.'
    };

    error = {
      type: ERRORS.conflict,
      errors: [errorMessage]
    };

  } else if (param.name === MONGO_ERRORS.validationErrorName) {
    let errorMessages: IErrorMessage[];
    errorMessages = Object.keys(param.errors).map(errorField => {
      return { message: param.errors[errorField].message };
    });

    error = {
      type: ERRORS.badRequest,
      errors: errorMessages
		};

  } else {
    let errorMessage: IErrorMessage = {
      message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
    };

		error = {
      type: ERRORS.internalServerError,
      errors: [errorMessage]
    };
  }

  return error;
}

export function generateHttpCode(error: any): number {
  let httpCode: number;
  if (error && error.type) {
    switch (error.type) {
      case ERRORS.badRequest:
        httpCode = HTTP_CODES.BAD_REQUEST;
        break;
      case ERRORS.conflict:
        httpCode = HTTP_CODES.CONFLICT;
        break;
      case ERRORS.internalServerError:
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
