import {Skills} from './skills';
import {Experience} from './experience';

export class Profile{
  id?: bigint;
  userId?: string;
  name?: string;
  title?: string;
  bio?: string;
  img?: string;
  skills?: Skills[];
  experiences?: Experience[];
}
