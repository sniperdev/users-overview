import { Gender } from '../types/gender.type';

export interface UsersParams {
  gender: Gender;
  nationality: string;
  amount: number;
}
