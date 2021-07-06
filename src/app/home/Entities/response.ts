import {Evaluation} from './evaluation';

export class Response {
  id?: bigint;
  path?: string;
  userId?: string;
  UserName?: string;
  groupeId?: bigint;
  submitDate?: string;
  isValidated?: boolean;
  comment?: string;
  note?: number;
  evaluation?: Evaluation;
}
