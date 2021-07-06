import {Room} from './room';

export class Message{
  id?: bigint;
  content?: string;
  date?: string;
  time?: string;
  userId?: string;
  userName?: string;
  room?: Room;
}
