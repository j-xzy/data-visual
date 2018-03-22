import * as React from 'react';

export default class Foo extends React.PureComponent {
  bar: number;
  async componentDidMount() {
    this.bar = 0;
    let echarts = await import('echarts'); // async import
    this.bar = 100;
  }
  render() {
    return <div></div>
  }
}