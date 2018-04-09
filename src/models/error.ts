export interface IError {
  type: string;
  errors: Array<IErrorMessage>;
}

export interface IErrorMessage {
  message: string;
}