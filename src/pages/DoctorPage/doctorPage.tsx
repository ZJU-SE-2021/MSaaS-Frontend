import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import React, { useRef } from 'react';
import { Card } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { GetPhysicianAppointments } from '@/services/MSaaS/physicians';
import { history } from 'umi';

const columns: ProColumns<API.AppointmentDto>[] = [
  {
    title: '预约编号',
    dataIndex: 'id',
    valueType: 'text',
    hideInSearch: true,
    width: 96,
  },
  {
    title: '用户姓名',
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
    title: '预约时间',
    dataIndex: 'time',
    valueType: 'date',
    // hideInSearch: true,
    sorter: true,
  },
  {
    title: '描述',
    dataIndex: 'description',
    valueType: 'text',
    hideInSearch: true,
    editable: false,
    // sorter: true,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record) => [
      <a
        key="editable"
        onClick={() => {
          // @ts-ignore
          history.push({
            pathname: '/doctor-area/addMedicalRecord',
            query: {
              appointmentId: record.id,
            },
          });
        }}
      >
        诊疗
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
        id: 'pages.physician.subPage.title',
        defaultMessage: ' 这个页面只有医生才能查看',
      })}
    >
      <Card>
        <ProTable<API.AppointmentDto>
          columns={columns}
          actionRef={actionRef}
          request={async (params, sort) => {
            let data = await GetPhysicianAppointments();
            data = data
              .filter((appointment) => {
                return (
                  (params.time === undefined ||
                    (appointment.time && appointment.time.slice(0, 10) === params.time)) &&
                  (params.name === undefined ||
                    (appointment.user &&
                      appointment.user.name &&
                      appointment.user.name.includes(params.name)))
                );
              })
              .map((appointment) => {
                // @ts-ignore
                // eslint-disable-next-line no-param-reassign
                appointment.username = appointment.user?.username;
                // @ts-ignore
                // eslint-disable-next-line no-param-reassign
                appointment.name = appointment.user?.name;
                // @ts-ignore
                // eslint-disable-next-line no-param-reassign
                appointment.doctorId = appointment.physician?.id;
                // @ts-ignore
                // eslint-disable-next-line no-param-reassign
                appointment.doctorName = appointment.physician?.name;
                return appointment;
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
          headerTitle="预约列表"
        />
      </Card>
    </PageHeaderWrapper>
  );
};
