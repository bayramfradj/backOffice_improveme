import {Membre} from './membre';

export class Groupe  {
  id?: bigint;
  name?: string;
  missionId?: bigint;
  archived?: boolean;
  membres?: Membre[];


}
