import * as React from 'react';
import { Layout, Menu } from 'antd';
import Sidebar from '@base/sidebar';

const { Header, Footer, Sider, Content } = Layout;

export default class Studio extends React.Component {
  render() {
    return (
      <div className='studio'>
        <Layout >
          <Sider>
          <Sidebar>
              <Sidebar.Panel title='组件'>
                <div>这是组件</div>
              </Sidebar.Panel>
              <Sidebar.Panel title='图层'>
                <div>这是图层</div>
              </Sidebar.Panel>
              <Sidebar.Panel title='图层'>
                <div>这是图层</div>
              </Sidebar.Panel>
            </Sidebar>
          </Sider>
          <Content >Content</Content>
          <Sider >Sider</Sider>
        </Layout>
      </div>
    );
  }
}