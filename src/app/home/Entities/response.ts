import {Evaluation} from './evaluation';

export class Response {
  id?: bigint;
  path?: string;
  userId?: string;
  userName?: string;
  groupeId?: bigint;
  submitDate?: string;
  validated?: boolean;
  comment?: string;
  note?: number;
  evaluation?: Evaluation;
}
