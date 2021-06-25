import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {useIntl} from 'umi';
import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {Button, Card} from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {GetHospitals} from "@/services/MSaaS/hospitals";


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
          // request={GetUsers}
          request={async (params,sort,filter) => {
            const data = await GetHospitals()
            // data.map((appointment) => {
            //   // @ts-ignore
            //   // eslint-disable-next-line no-param-reassign
            //   appointment.username = appointment.user?.username;
            //   // @ts-ignore
            //   // eslint-disable-next-line no-param-reassign
            //   appointment.name = appointment.user?.name;
            //   // @ts-ignore
            //   // eslint-disable-next-line no-param-reassign
            //   appointment.doctorId = appointment.physician?.id;
            //   // @ts-ignore
            //   // eslint-disable-next-line no-param-reassign
            //   appointment.doctorName = appointment.physician?.name;
            //   return appointment
            // })
            console.log(params, sort, filter)
            return {
              data,
              success: true
            }
          }}
          editable={{
            type: 'multiple',
            onSave: async (rowKey, data, row) => {
              console.log(rowKey, data, row)
            }
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
            </Button>
          ]}
        />
      </Card>
    </PageHeaderWrapper>
  );
};
