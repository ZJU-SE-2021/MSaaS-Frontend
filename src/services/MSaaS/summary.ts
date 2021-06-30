// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/Summary */
export async function GetSummary(options?: { [key: string]: any }) {
  return request<API.SummaryDto>('/api/Summary', {
    method: 'GET',
    ...(options || {}),
  });
}
