// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/Hospitals */
export async function GetHospitals(options?: { [key: string]: any }) {
  return request<API.HospitalDto[]>('/api/Hospitals', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Hospitals/${param0} */
export async function GetHospital(
  params: {
    // path
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.HospitalDto>(`/api/Hospitals/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/Admin/Hospitals */
export async function CreateHospital(
  body: API.HospitalCreationForm,
  options?: { [key: string]: any },
) {
  return request<any>('/api/Admin/Hospitals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/Admin/Hospitals/${param0} */
export async function UpdateHospital(
  params: {
    // path
    id: number;
  },
  body: API.HospitalCreationForm,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.HospitalDto>(`/api/Admin/Hospitals/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/Admin/Hospitals/${param0} */
export async function DeleteHospital(
  params: {
    // path
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/Admin/Hospitals/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
