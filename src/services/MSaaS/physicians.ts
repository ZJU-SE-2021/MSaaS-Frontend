// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/Physicians/Appointments */
export async function GetPhysicianAppointments(options?: { [key: string]: any }) {
  return request<API.AppointmentDto[]>('/api/Physicians/Appointments', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Physicians/Appointments/${param0} */
export async function GetPhysicianAppointmentById(
  params: {
    // path
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AppointmentDto>(`/api/Physicians/Appointments/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Physicians */
export async function GetPhysicians(
  params: {
    // query
    departmentId?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.PhysicianDto[]>('/api/Physicians', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Physicians/${param0} */
export async function GetPhysicianById(
  params: {
    // path
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.PhysicianDto>(`/api/Physicians/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/Admin/Physicians/${param0} */
export async function DeletePhysician(
  params: {
    // path
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/Admin/Physicians/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/Admin/Physicians */
export async function RegisterPhysician(
  body: API.PhysicianRegisterForm,
  options?: { [key: string]: any },
) {
  return request<any>('/api/Admin/Physicians', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
