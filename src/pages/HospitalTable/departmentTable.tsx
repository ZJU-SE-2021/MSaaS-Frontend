import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { GetDepartments } from '@/services/MSaaS/departments';

const columns: ProColumns<API.DepartmentDto>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '科室',
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
    title: '部门',
    dataIndex: 'section',
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
    ],
  },
];

export default (props: { location: { query: { hospitalId: any } } }): React.ReactNode => {
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
        <ProTable<API.DepartmentDto>
          columns={columns}
          actionRef={actionRef}
          request={async (params) => {
            let data = await GetDepartments({ hospitalId: props.location.query.hospitalId });
            data = data.filter((department) => {
              return (
                (params.name === undefined ||
                  (department.name && department.name.includes(params.name))) &&
                (params.section === undefined ||
                  (department.section && department.section.includes(params.section)))
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
            onSave: async (rowKey, data, row) => {
              console.log(rowKey, data, row);
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
            <Button key="button" icon={<PlusOutlined />} type="primary">
              新建
            </Button>,
          ]}
        />
      </Card>
    </PageHeaderWrapper>
  );
};
