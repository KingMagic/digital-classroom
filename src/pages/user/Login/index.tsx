import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { history, useModel } from 'umi';
import styles from './index.less';
import { login } from './service';

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

const Login: React.FC = () => {

  const { setInitialState } = useModel("@@initialState")
  const [showErr, setShowErr] = useState(false)

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      login(values).then(res => {
        if (res.success) {
          window.sessionStorage.setItem('login', '1')
          /** 此方法会跳转到 redirect 参数所在的位置 */
  
          if (!history) return;
          const { query } = history.location;
          const { redirect } = query as {
            redirect: string;
          };
          history.push(redirect || '/');
          return;
        } else {
          setShowErr(true);
        }
      })

    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          title="数字教室课情分析平台"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {showErr ? (
            <LoginMessage content={'错误的用户名和密码'} />
          ) : (
            <div style={{ height: 43 }}></div>
          )}
          
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={'请输入用户名'}
            rules={[
              {
                required: true,
                message: '用户名是必填项！',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={'请输入密码'}
            rules={[
              {
                required: true,
                message: '密码是必填项！',
              },
            ]}
          />
        </LoginForm>
      </div>
      <div className={styles.left}></div>
    </div>
  );
};

export default Login;
