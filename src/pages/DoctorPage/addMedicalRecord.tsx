// @ts-ignore
import React from 'react';
import { StepsForm, ProFormTextArea } from '@ant-design/pro-form';
import { history } from 'umi';
import ProCard from '@ant-design/pro-card';
import { Card, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl } from '@@/plugin-locale/localeExports';
import ChatUI from '@/components/ChatUI/ChatUI';
import { AddMedicalRecord } from '@/services/MSaaS/medicalRecords';

export default (props: { location: { query: { appointmentId: any } } }) => {
  const intl = useIntl();
  return (
    <PageHeaderWrapper
      content={intl.formatMessage({
        id: 'pages.physician.subPage.title',
        defaultMessage: ' 这个页面只有医生才能查看',
      })}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Card
          title="在线诊断"
          style={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            margin: '10px',
            maxWidth: '450px',
          }}
        >
          <ChatUI appointmentId={props.location.query.appointmentId} />
        </Card>
        <Card
          title="诊断结果"
          style={{ display: 'flex', flex: '1', flexDirection: 'column', margin: '10px' }}
        >
          <StepsForm
            onFinish={async (values) => {
              const res = await AddMedicalRecord({
                ...values,
                appointmentId: props.location.query.appointmentId,
              });
              if (res.id) {
                message.success('提交成功');
                history.goBack();
              } else {
                message.error('提交失败');
              }
            }}
            formProps={{
              validateMessages: {
                required: '此项为必填项',
              },
            }}
          >
            <StepsForm.StepForm name="base" title="基本信息">
              <ProCard
                title="既往病史"
                bordered
                headerBordered
                style={{
                  marginBottom: 16,
                  minWidth: 800,
                  maxWidth: '100%',
                }}
              >
                <ProFormTextArea
                  name="pastMedicalHistory"
                  label="既往病史"
                  placeholder="请输入"
                  rules={[{ required: true }]}
                />
              </ProCard>

              <ProCard
                title="症状描述"
                bordered
                headerBordered
                style={{
                  minWidth: 800,
                  marginBottom: 16,
                }}
              >
                <ProFormTextArea
                  name="symptom"
                  label="症状"
                  placeholder="请输入"
                  rules={[{ required: true }]}
                />
              </ProCard>
            </StepsForm.StepForm>
            <StepsForm.StepForm name="diagnosis" title="诊断结果">
              <ProCard
                title="诊断结果"
                bordered
                headerBordered
                style={{
                  marginBottom: 16,
                  minWidth: 800,
                  maxWidth: '100%',
                }}
              >
                <ProFormTextArea
                  name="diagnosis"
                  label="诊断结果"
                  placeholder="请输入"
                  rules={[{ required: true }]}
                />
              </ProCard>
            </StepsForm.StepForm>
            <StepsForm.StepForm name="prescription" title="开具处方">
              <ProCard
                title="处方与医嘱"
                bordered
                headerBordered
                style={{
                  marginBottom: 16,
                  minWidth: 800,
                  maxWidth: '100%',
                }}
              >
                <ProFormTextArea
                  name="prescription"
                  label="处方与医嘱"
                  placeholder="请输入"
                  rules={[{ required: true }]}
                />
              </ProCard>
            </StepsForm.StepForm>
          </StepsForm>
        </Card>
      </div>
    </PageHeaderWrapper>
  );
};
