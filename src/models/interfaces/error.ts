import { Enums } from '../../commons';

export interface IError {
  errors: Error[];
  type: Enums.Errors;
}
