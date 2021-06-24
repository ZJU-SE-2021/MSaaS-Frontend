// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/Users/Login */
export async function Login(body: API.LoginForm, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/Users/Login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Users/Logout */
export async function Logout(options?: { [key: string]: any }) {
  return request<any>('/api/Users/Logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/Users */
export async function CreateUser(body: API.RegisterForm, options?: { [key: string]: any }) {
  return request<any>('/api/Users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Users/Current */
export async function GetCurrentUser(options?: { [key: string]: any }) {
  return request<API.UserDto>('/api/Users/Current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/Users/Current */
export async function UpdateCurrentUser(
  body: API.UpdateUserForm,
  options?: { [key: string]: any },
) {
  return request<API.UserDto>('/api/Users/Current', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Admin/Users/${param0} */
export async function GetUser(
  params: {
    // path
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserDto>(`/api/Admin/Users/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/Admin/Users/${param0} */
export async function UpdateUser(
  params: {
    // path
    id: number;
  },
  body: API.UpdateUserFormAdmin,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserDto>(`/api/Admin/Users/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/Admin/Users/${param0} */
export async function DeleteUser(
  params: {
    // path
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/Admin/Users/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Admin/Users */
export async function GetUsers(options?: { [key: string]: any }) {
  return request<API.UserDto[]>('/api/Admin/Users', {
    method: 'GET',
    ...(options || {}),
  });
}
