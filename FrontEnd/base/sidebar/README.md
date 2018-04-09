为页面提供侧边栏的容器

## 何时使用

一般作为菜单栏等组件的上级容器，将其包裹。提供多级结构来收纳和排列网站架构。可分布在页面的左侧和右侧。

## API

``` html
 <Sidebar mode='left' width='350px' height='100%'>
    <Sidebar.Panel title='panel1'>
      <div>panel1</div>
    </Sidebar.Panel>
    <Sidebar.Panel title='panel2'>
      <div>panel2</div>
    </Sidebar.Panel>
</Sidebar>
```

### Sidebar

|　参数　|　说明　|　类型　| 示例　|　默认值　|
| ---  | --- | --- | --- | --- |
| width | 侧边栏的宽度 | string　| '300px' | '100%' |
| height | 侧边栏的高度　| string | '100%' | '100%' |
| mode | 分布方式:左侧、右侧 | string:'left' 'right'　| 'right' | 'left' |
| className | 样式选择器 | string　|  |  |
| onOpenChangeBefore | 侧边栏收缩展开事件(动效开始前触发) | ('close' or 'open')=>void
| onOpenChangeAfter | 侧边栏收缩展开事件(动效结束后触发) | ('close' or 'open')=>void
### Sidebar.Panel

|　参数　|　说明　|　类型　| 示例　|　默认值　|
| ---  | --- | --- | --- | --- |
| title | 面板名称 |　string　| '名称１' | |
| icon |　代替面板名称的图标字体 |　string | 'icon_pan' | |
| className | 样式选择器 |　string　|  |  |

## 依赖

- classnames