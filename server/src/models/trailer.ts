import { Entity } from './entity';
import { Amount } from './amount';
import { User } from './user';

export interface Trailer extends Entity {
  title: string;
  price: Amount;
  available: boolean;
  owner: User;
  //TODO: This needs to be discussed
}
