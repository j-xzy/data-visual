编辑器

## 何时使用

输入文字或代码。

## API

``` html
  <Editor value={value} onChange={this.handleValueChange} mode='json' theme='dracula' width='100%' height='600px' />
```

### Editor

|　参数　|　说明　|　类型　| 示例　|　默认值　|
| ---  | --- | --- | --- | --- |
| mode | 模式 | 'json' or 'javascript' | 'json' |  |
| theme  | 主题 |  'dracula' or 'github' | 'dracula' |  |
| value ? | 值 | string | 'foo'  |   |
| onChange ? | 值更改时触发事件 | (text: string)=>void |  |   |
| width ? | 宽度 | string | '300px' | '100%' |  
| height ? | 高度 | string | '300px'  | '100%'  |


## 依赖

- brace