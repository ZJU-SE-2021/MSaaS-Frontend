import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {useIntl} from 'umi';
import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {Button, Card} from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import {GetUsers} from "@/services/MSaaS/users";


const columns: ProColumns<API.UserDto>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
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
    editable: false,
  },
  {
    title: '姓名',
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
    title: '性别',
    dataIndex: 'gender',
    filters: true,
    // onFilter: true,
    hideInSearch: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      male: { text: '男', status: 'Male' },
      female: { text: '女', status: 'Female' }
    },
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    valueType: 'date',
    hideInSearch: true,
    sorter: true,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    valueType: 'digit',
    hideInSearch: true,
    editable: false,
    // sorter: true,
  },
  {
    title: '电话',
    dataIndex: 'phone',
    valueType: 'text',
    // sorter: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    valueType: 'text',
    // sorter: true,
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
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'delete', name: '删除' },
        ]}
      />,
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
        <ProTable<API.UserDto>
          columns={columns}
          actionRef={actionRef}
          // request={GetUsers}
          request={async (params,sort,filter) => {
            const data = await GetUsers()
            console.log(params, sort, filter)
            return {
              data,
              success: true
            }
          }}
          editable={{
            type: 'multiple',
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
          headerTitle="用户列表"
          toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined />} type="primary">
              新建
            </Button>
          ]}
        />
      </Card>
    </PageHeaderWrapper>
  );
};
