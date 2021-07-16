import {TypeEval} from './Type-eval.enum';
import {TypeRes} from './type-res.enum';
import {Response} from './response';

export class Evaluation {
  id?: bigint;
  title?: string;
  type?: TypeEval;
  missionId?: bigint;
  // @ts-ignore
  startDate: string;
  // @ts-ignore
  endDate: string;
  decription?: string;
  typeRes: TypeRes = TypeRes.OTHER;
  responses?: Response[];
}
