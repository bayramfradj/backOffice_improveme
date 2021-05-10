import {TypeMission} from './type-mission.enum';
import {StateMission} from './state-mission.enum';

export class Mission {
  id?: bigint;
  title?: string;
  description?: string;
  typeMission?: TypeMission;
  entrepriseId?: string;
  entrepriseName?: string;
  coachId?: string;
  coachName?: string;
  startDate?: string;
  endDate?: string;
  stateMission?: StateMission;
  content?: string;
  price?: number;
  nbrplace?: number;
  img?: string | ArrayBuffer | null;

}
