// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/Departments */
export async function GetDepartments(
  params: {
    // query
    hospitalId?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.DepartmentDto[]>('/api/Departments', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Departments/${param0} */
export async function GetDepartment(
  params: {
    // path
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DepartmentDto>(`/api/Departments/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/Admin/Departments/${param0} */
export async function UpdateDepartment(
  params: {
    // path
    id: number;
  },
  body: API.DepartmentCreationForm,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DepartmentDto>(`/api/Admin/Departments/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/Admin/Departments/${param0} */
export async function DeleteDepartment(
  params: {
    // path
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/Admin/Departments/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/Admin/Departments */
export async function CreateDepartment(
  body: API.DepartmentCreationForm,
  options?: { [key: string]: any },
) {
  return request<any>('/api/Admin/Departments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
