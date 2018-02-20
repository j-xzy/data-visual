import * as React from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export default class Studio extends React.Component {
  render() {
    return (
      <div className='studio'>
        <Layout >
          <Sider >Sider</Sider>
          <Content >Content</Content>
          <Sider >Sider</Sider>
        </Layout>
      </div>
    );
  }
}