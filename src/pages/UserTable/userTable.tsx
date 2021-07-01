import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import React, { useRef } from 'react';
import { Card, message } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { DeleteUser, GetUsers, UpdateUser } from '@/services/MSaaS/users';

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
    hideInSearch: true,
    valueType: 'select',
    valueEnum: {
      Male: { text: '男' },
      Female: { text: '女' },
      Other: { text: '其他' },
    },
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    valueType: 'date',
    sorter: true,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    valueType: 'digit',
    hideInSearch: true,
    editable: false,
  },
  {
    title: '电话',
    dataIndex: 'phone',
    valueType: 'text',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    valueType: 'text',
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
          request={async (params, sort, filter) => {
            let data = await GetUsers();
            data = data.filter((user) => {
              return (
                (params.birthday === undefined ||
                  (user.birthday && user.birthday.slice(0, 10) === params.birthday)) &&
                (params.name === undefined || (user.name && user.name.includes(params.name))) &&
                (params.username === undefined ||
                  (user.username && user.username.includes(params.username))) &&
                (params.email === undefined || (user.email && user.email.includes(params.email))) &&
                (params.phone === undefined || (user.phone && user.phone.includes(params.phone))) &&
                (filter.gender === undefined ||
                  filter.gender === null ||
                  (user.gender && filter.gender.includes(user.gender)))
              );
            });
            const total = data.length;
            if (sort !== undefined) {
              switch (sort.time) {
                case 'ascend':
                  data.sort((a, b) => {
                    // @ts-ignore
                    return new Date(a.time) - new Date(b.time);
                  });
                  break;
                case 'descend':
                  data.sort((a, b) => {
                    // @ts-ignore
                    return new Date(b.time) - new Date(a.time);
                  });
                  break;
                default:
                // do nothing
              }
            }
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
              UpdateUser({ id: data.id }, { ...data })
                .then(() => message.success('更新成功！'))
                .catch(() => message.error('更新失败！'));
            },
            onDelete: async (_, data) => {
              // @ts-ignore
              DeleteUser({ id: data.id })
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
          headerTitle="用户列表"
        />
      </Card>
    </PageHeaderWrapper>
  );
};
