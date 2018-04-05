带输入控件的ColorPicker

## 何时使用

需要选择颜色并且与输入控件有交互时使用

## API

``` html
<ColorInput color='red' />
```

### ColorInput

|　参数　|　说明　|　类型　| 示例　|　默认值　|
| ---  | --- | --- | --- | --- |
| color | 颜色 | string | '#dedede' |  |
| isShowColorPicker ? | 是否显示调色板 | boolean | true | false  |
| style ? | 样式 | React.CSSProperties |  |   |
| onInputKeyDown ? | input键盘按下时触发事件 |(e: KeyboardEvent) => void　|  |  |
| onColorPreviewClick ? | 点击颜色预览触发事件 |()=>void　|  |  |
| onColorChange ? | 颜色发生改变时触发事件 | (color: string) => void　|  |  |
| onColorPickerChangeComplete ? | 调色板完成颜色选择触发事件 | colorResult: ColorResult) => void | | |

## 依赖

- react-color.ChromePicker