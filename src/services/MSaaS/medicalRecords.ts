// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/MedicalRecords/${param0} */
export async function GetMedicalRecordById(
  params: {
    // path
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.MedicalRecordDto>(`/api/MedicalRecords/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Physicians/MedicalRecords/${param0} */
export async function GetPhysicianMedicalRecordById(
  params: {
    // path
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.MedicalRecordDto>(`/api/Physicians/MedicalRecords/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/Physicians/MedicalRecords/${param0} */
export async function UpdateMedicalRecord(
  params: {
    // path
    id: number;
  },
  body: API.MedicalRecordForm,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/Physicians/MedicalRecords/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/Physicians/MedicalRecords */
export async function AddMedicalRecord(
  body: API.MedicalRecordForm,
  options?: { [key: string]: any },
) {
  return request<any>('/api/Physicians/MedicalRecords', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
