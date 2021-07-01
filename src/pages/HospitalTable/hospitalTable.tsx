import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history, useIntl } from 'umi';
import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, message } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  CreateHospital,
  DeleteHospital,
  GetHospitals,
  UpdateHospital,
} from '@/services/MSaaS/hospitals';

const columns: ProColumns<API.HospitalDto>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '医院名称',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '医院地址',
    dataIndex: 'address',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          // @ts-ignore
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a
        key="departmentTable"
        onClick={() => {
          // @ts-ignore
          history.push({
            pathname: '/admin/hospital-table-page/department-table-page',
            query: {
              hospitalId: record.id,
            },
          });
        }}
      >
        查看科室
      </a>,
    ],
  },
];

export default (): React.ReactNode => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();

  return (
    <PageHeaderWrapper
      content={intl.formatMessage({
        id: 'pages.admin.subPage.title',
        defaultMessage: ' 这个页面只有管理员权限才能查看',
      })}
    >
      <Card>
        <ProTable<API.HospitalDto>
          columns={columns}
          actionRef={actionRef}
          request={async (params) => {
            let data = await GetHospitals();
            data = data.filter((hospital) => {
              return (
                (params.name === undefined ||
                  (hospital.name && hospital.name.includes(params.name))) &&
                (params.address === undefined ||
                  (hospital.address && hospital.address.includes(params.address)))
              );
            });
            const total = data.length;
            if (params.current && params.pageSize)
              data = data.slice(
                (params.current - 1) * params.pageSize,
                params.current * params.pageSize,
              );
            return {
              data,
              total,
              success: true,
            };
          }}
          editable={{
            type: 'multiple',
            onSave: async (_, data) => {
              // @ts-ignore
              if (data.newItem) {
                // @ts-ignore
                CreateHospital({ name: data.name, address: data.address })
                  .then(() => message.success('创建成功！'))
                  .catch(() => message.error('创建失败！'));
                actionRef.current?.reload();
              } else {
                // @ts-ignore
                UpdateHospital({ id: data.id }, { ...data })
                  .then(() => message.success('更新成功！'))
                  .catch(() => message.error('更新失败！'));
              }
            },
            onDelete: async (_, data) => {
              // @ts-ignore
              DeleteHospital({ id: data.id })
                .then(() => message.success('删除成功！'))
                .catch(() => message.error('删除失败！'));
            },
          }}
          rowKey="id"
          search={{
            labelWidth: 'auto',
          }}
          form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return {
                  ...values,
                  created_at: [values.startTime, values.endTime],
                };
              }
              return values;
            },
          }}
          pagination={{
            pageSize: 20,
          }}
          dateFormatter="string"
          headerTitle="医院列表"
          toolBarRender={() => [
            <Button
              key="button"
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => {
                actionRef.current?.addEditRecord?.({
                  id: 'New Item',
                  newItem: true,
                });
              }}
            >
              新建
            </Button>,
          ]}
        />
      </Card>
    </PageHeaderWrapper>
  );
};
