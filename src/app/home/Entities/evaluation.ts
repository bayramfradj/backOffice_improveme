import {TypeEval} from './Type-eval.enum';
import {TypeRes} from './type-res.enum';

export class Evaluation {
  id?: bigint;
  title?: string;
  type?: TypeEval;
  missionId?: bigint;
  startDate?: string;
  endDate?: string;
  decription?: string;
  typeRes?: TypeRes;
  responses?: Response[];
}
