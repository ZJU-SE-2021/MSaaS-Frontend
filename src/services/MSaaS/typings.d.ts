// @ts-ignore
/* eslint-disable */

declare namespace API {
  type LoginForm = {
    username: string;
    password: string;
  };

  type Gender = 'Male' | 'Female' | 'Other';

  type UserDto = {
    id?: number;
    username?: string;
    gender?: Gender;
    birthday?: string;
    age?: number;
    phone?: string;
    email?: string;
  };

  type LoginResult = {
    token?: string;
    user?: UserDto;
  };

  type ProblemDetails = {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
  };
}
