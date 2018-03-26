带加减按钮的滑动输入条

## 何时使用

当用户需要在数值区间内进行连续的选择

## API

``` html
<Slider width={200} step={0.1} maxValue={20} minValue={1} value={15} onChange={this.handleScaleChange} />
```

### Sidebar

|　参数　|　说明　|　类型　| 示例　|　默认值　|
| ---  | --- | --- | --- | --- |
| width ? | 空间宽度 |　string　or number　| 300 | '100%' |
| value | 数值 | number | 15 |  |
| minValue | 最小值 |　number　| １ |  |
| maxValue | 最大值 |　number　|  100 |  |
| step | 步长 | number | 0.1 | |
| onChange | 数值发生改变触发事件 | (value) => void
