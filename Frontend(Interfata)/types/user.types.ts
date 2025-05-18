import type { responseType } from '../types/generic.types';
export interface userType extends responseType {
  User: {
    createdAt: Date,
    email: string,
    forgetPasswordObject?: {
      forgetPasswordExpires: Date,
      forgetPasswordToken: string
    },
    name: string,
    verification?: {
      isVerified: boolean,
      theCode: string
    },
    updatedAt: Date,
    __v: number,
    _id: string
  }
}