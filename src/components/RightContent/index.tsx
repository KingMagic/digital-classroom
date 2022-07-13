import { Space } from 'antd';
import React from 'react';
import { history, useModel } from 'umi';
import styles from './index.less';
export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      <a href="http://qctk.nat300.top/admin" style={{color: '#ffffff'}}>控制后台</a>
      <a onClick={() => {
        window.sessionStorage.removeItem('login')
        history.push('/')
      }} style={{color: '#ffffff'}}>退出登录</a>
      {/* <Avatar menu /> */}
    </Space>
  );
};

export default GlobalHeaderRight;
