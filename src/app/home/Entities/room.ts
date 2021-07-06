import {Message} from './message';

export class Room {
  id?: bigint;
  groupeId?: bigint;
  messages?: Message[];
}
