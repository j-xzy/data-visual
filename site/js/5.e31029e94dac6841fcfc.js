(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{761:function(e,t,s){"use strict";s.r(t),s.d(t,"default",function(){return c});var n=s(0),a=s(6),h=s.n(a),i=s(34),r=(s(76),s(10)),l=(s(78),s(8));class c extends n.Component{constructor(e){super(e),this.handleSeriesChange=this.handleSeriesChange.bind(this),this.handleSwitchChange=this.handleSwitchChange.bind(this),this.handleInputChange=this.handleInputChange.bind(this),this.state={select:0}}handleSeriesChange(e){this.setState({select:e})}handleSwitchChange(e){let t=e?"默认":null;const{chart:s,updateChart:n}=this.props,{select:a}=this.state;n(h()(s,{option:{series:{[a]:{stack:{$set:t}}}}}))}handleInputChange(e){const t=e.target.value,{select:s}=this.state,{updateChart:n,chart:a}=this.props;n(h()(a,{option:{series:{[s]:{stack:{$set:t}}}}}))}renderSeries(){const{series:e}=this.props.chart.option;return e.map((e,t)=>n.createElement(r.a.Option,{key:t,value:t},`系列${t+1}`))}static getDerivedStateFromProps(e,t){return e.chart.option.series.length<=t.select?{select:0}:null}shouldComponentUpdate(e,t){return t.select!==this.state.select||e.chart.option.series[this.state.select]!==this.props.chart.option.series[this.state.select]}render(){const{series:e}=this.props.chart.option;if(0===e.length)return n.createElement("div",{style:{color:"#fff",textAlign:"center"}},"系列为空");let t=e[this.state.select].stack;return void 0===t&&(t=null),n.createElement("div",null,n.createElement(l.a,{name:"选择系列"},n.createElement(r.a,{size:"small",value:this.state.select,onChange:this.handleSeriesChange},this.renderSeries())),n.createElement(l.a,{name:"开启"},n.createElement(i.a,{checked:null!==t,onChange:this.handleSwitchChange})),null!==t&&n.createElement(l.a,{name:"stack"},n.createElement("input",{className:"input",value:t,onChange:this.handleInputChange})))}}}}]);
//# sourceMappingURL=5.e31029e94dac6841fcfc.js.map