选项卡切换标签

## 何时使用

需要将内容进行平行收纳和展现

## API

``` html
    <Tab defaultActiveId='a'>
      <Tab.Panel id='a' tab='name1'>content1</Tab.Panel>
      <Tab.Panel id='b' tab='name2'>content2</Tab.Panel>
    </Tab>
```

### Tab

|　参数　|　说明　|　类型　| 示例　|　默认值　|
| ---  | --- | --- | --- | --- |
| defaultActiveId | 默认展示Panel的id |　any　| 'abc' |  |
| className? | 元素选择器名称 | string |      |       |  |
 
### Tab.Panel

|　参数　|　说明　|　类型　| 示例　|　默认值　|
| ---  | --- | --- | --- | --- |
| tab | 选项卡头显示的文字 |　string　| 'name1' |  |
| id  | 唯一标示 | any | 'abc'     |        |  |


