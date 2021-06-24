// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/Appointments */
export async function GetAppointments(options?: { [key: string]: any }) {
  return request<API.AppointmentDto[]>('/api/Appointments', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/Appointments */
export async function AddAppointment(body: API.AppointmentForm, options?: { [key: string]: any }) {
  return request<any>('/api/Appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Appointments/${param0} */
export async function GetAppointmentById(
  params: {
    // path
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AppointmentDto>(`/api/Appointments/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
