import React, { useEffect, useState } from 'react';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage, useIntl } from 'umi';
import styles from '@/pages/user/Login/index.less';
import ProForm, { ProFormDatePicker, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import {
  UpdateCurrentUser as updateCurrentUser,
  GetCurrentUser as getCurrentUser,
} from '@/services/MSaaS/users';
import moment, { Moment } from 'moment';

function disabledDate(current: Moment) {
  // Can not select days after today and today
  return current && current > moment().endOf('day');
}

export default (): React.ReactNode => {
  const intl = useIntl();
  const [submitting, setSubmitting] = useState(false);
  const [initValue, setInitValue] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCurrentUser().then((res: API.UserDto) => {
      // @ts-ignore
      res.birthday = moment(res.birthday, 'YYYY/MM/DD');
      setInitValue(res);
      setLoading(false);
    });
  }, []);

  const handleUpdateSubmit = async (values: API.UpdateUserForm) => {
    setSubmitting(true);
    try {
      // 更新
      const msg = await updateCurrentUser({ ...values });
      if (msg.id !== undefined) {
        message.success('更新成功！');
        setSubmitting(false);
        return;
      }
    } catch (error) {
      message.error('更新失败，请重试！');
    }
    setSubmitting(false);
  };

  return (
    <PageHeaderWrapper>
      <Card>
        {!loading && (
          <ProForm
            initialValues={initValue}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.update.submit',
                  defaultMessage: '更新',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              await handleUpdateSubmit(values as API.UpdateUserForm);
            }}
          >
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                label={intl.formatMessage({
                  id: 'pages.register.username.placeholder',
                  defaultMessage: '用户名',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.register.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />

              <ProFormText
                name="name"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                label={intl.formatMessage({
                  id: 'pages.register.name.placeholder',
                  defaultMessage: '姓名',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.register.name.required"
                        defaultMessage="请输入姓名!"
                      />
                    ),
                  },
                ]}
              />

              <ProFormSelect
                name="gender"
                label={intl.formatMessage({ id: 'pages.register.gender.placeholder' })}
                valueEnum={{
                  Male: intl.formatMessage({ id: 'pages.register.gender.man' }),
                  Female: intl.formatMessage({ id: 'pages.register.gender.woman' }),
                }}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.register.gender.required"
                        defaultMessage="请选择性别!"
                      />
                    ),
                  },
                ]}
              />

              <ProFormDatePicker
                name="birthday"
                label={intl.formatMessage({ id: 'pages.register.birthday.placeholder' })}
                fieldProps={{
                  disabledDate,
                }}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.register.birthday.required"
                        defaultMessage="请输入生日!"
                      />
                    ),
                  },
                ]}
              />

              <ProFormText
                name="phone"
                fieldProps={{
                  size: 'large',
                  prefix: <PhoneOutlined className={styles.prefixIcon} />,
                }}
                label={intl.formatMessage({
                  id: 'pages.register.phone.placeholder',
                  defaultMessage: '手机',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.register.phone.required"
                        defaultMessage="请输入手机!"
                      />
                    ),
                  },
                ]}
              />

              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined className={styles.prefixIcon} />,
                }}
                label={intl.formatMessage({
                  id: 'pages.register.email.placeholder',
                  defaultMessage: 'email',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.register.email.required"
                        defaultMessage="请输入email!"
                      />
                    ),
                  },
                ]}
              />
            </>
            <div
              style={{
                marginBottom: 24,
              }}
            />
          </ProForm>
        )}
      </Card>
    </PageHeaderWrapper>
  );
};
