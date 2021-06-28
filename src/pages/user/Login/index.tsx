import { LockOutlined, UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormDatePicker, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import Footer from '@/components/Footer';
import { CreateUser as createUser, Login as login } from '@/services/MSaaS/users';

import styles from './index.less';
import type { Moment } from 'moment';
import moment from 'moment';

function disabledDate(current: Moment) {
  // Can not select days after today and today
  return current && current > moment().endOf('day');
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/** 此方法会跳转到 redirect 参数所在的位置 */
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const { initialState, setInitialState } = useModel('@@initialState');
  const [type, setType] = useState<string>('login');
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
      });
    }
  };

  const handleLoginSubmit = async (values: API.LoginForm) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await login({ ...values });
      if (msg.token !== undefined) {
        message.success('登录成功！');
        await fetchUserInfo();
        goto();
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
    setSubmitting(false);
  };

  const handleRegisterSubmit = async (values: API.RegisterForm) => {
    setSubmitting(true);
    try {
      // 注册
      const msg = await createUser({ ...values });
      if (msg.id !== undefined) {
        message.success('注册成功！');
        setType('login');
        setSubmitting(false);
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      message.error('注册失败，请重试！');
    }
    setSubmitting(false);
  };

  // @ts-ignore
  const { status } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.lang}>{SelectLang && <SelectLang />}</div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
              <span className={styles.title}>
                {intl.formatMessage({
                  id: 'pages.layouts.title',
                  defaultMessage: 'MSaaS 后台系统',
                })}
              </span>
            </Link>
          </div>
          <div className={styles.desc}>
            {intl.formatMessage({
              id: 'pages.layouts.userLayout.title',
              defaultMessage: 'Medical System as a Service 是西湖区最具技术力的智能医疗系统',
            })}
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig:
                type === 'login'
                  ? {
                      submitText: intl.formatMessage({
                        id: 'pages.login.submit',
                        defaultMessage: '登录',
                      }),
                    }
                  : {
                      submitText: intl.formatMessage({
                        id: 'pages.register.submit',
                        defaultMessage: '注册',
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
              if (type === 'login') await handleLoginSubmit(values as API.LoginForm);
              else if (type === 'register') await handleRegisterSubmit(values as API.RegisterForm);
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane
                key="account"
                tab={intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: 'Account password login',
                })}
              />
              <Tabs.TabPane
                key="register"
                tab={intl.formatMessage({
                  id: 'pages.login.registerAccount',
                  defaultMessage: 'Register new account',
                })}
              />
            </Tabs>

            {status === 0 && (
              <LoginMessage
                content={intl.formatMessage({
                  id: 'pages.login.accountLogin.errorMessage',
                  defaultMessage: '账户或密码错误（admin/ant.design)',
                })}
              />
            )}

            {type === 'login' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.username.placeholder',
                    defaultMessage: '用户名',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="请输入用户名!"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.password.placeholder',
                    defaultMessage: '密码',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="请输入密码！"
                        />
                      ),
                    },
                  ]}
                />
              </>
            )}

            {type === 'register' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
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
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.register.password.placeholder',
                    defaultMessage: '密码',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.register.password.required"
                          defaultMessage="请输入密码!"
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
                  placeholder={intl.formatMessage({
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
                  placeholder={intl.formatMessage({
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
                  placeholder={intl.formatMessage({
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
            )}
            <div
              style={{
                marginBottom: 24,
              }}
            />
          </ProForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
