// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /Users/Login */
export async function login(body: API.LoginForm, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/Users/Login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
