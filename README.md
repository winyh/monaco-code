# monaco-code

基于 `monaco-editor` Vue 版本编辑器

<div align="left">

![](https://img.shields.io/github/issues/winyh/monaco-code) ![](https://img.shields.io/github/languages/code-size/winyh/monaco-code) ![](https://img.shields.io/github/stars/winyh/monaco-code) ![](https://img.shields.io/github/last-commit/winyh/monaco-code)

</div>

### 在线示例

请查看

[monaco-code](https://winyh.github.io/monaco-code)

### 安装

```
cnpm i MonacoCode --save
```

### 使用方法

```
<template>
  <MonacoCode :value="...">
</template>

<script>
  import MonacoCode from "MonacoCode"
  Vue.use(MonacoCode)
</script>
```

### 参数说明

value, language 优先级更高，会覆盖 options 里相同字段

| 参数     | 说明   | 类型   | 默认值                                       |
| -------- | ------ | ------ | -------------------------------------------- |
| value    | 初始值 | string |                                              |
| language | 语言   | string | javascript \| json \| html 默认 `javascript` |
| height   | 初始值 | string |                                              |
| width    | 初始值 | string |                                              |
| theme    | 主题   | string | vs \| vs-dark \| hc-black 默认 `vs`          |
| options  | 配置项 | object |                                              |

### options 参数

| 参数                    | 说明                         | 类型    | 默认值                                                  |
| ----------------------- | ---------------------------- | ------- | ------------------------------------------------------- |
| theme                   | 主题                         | string  | vs \| vs-dark \| hc-black 默认 `vs`                     |
| value                   | 默认显示值                   | string  |                                                         |
| language                | 语言                         | string  | javascript \| json \| html 默认 `javascript`            |
| fontSize                | 字体大小                     | number  | 14                                                      |
| folding                 | 是否折叠                     | boolean | true                                                    |
| foldingHighlight        | 折叠等高线                   | boolean | true                                                    |
| foldingStrategy         | 折叠方式                     | string  | auto \| indentation 默认 `indentation`                  |
| showFoldingControls     | 是否一直显示折叠             | string  | always \| mouseover                                     |
| disableLayerHinting     | 等宽优化                     | boolean | true                                                    |
| emptySelectionClipboard | 空选择剪切板                 | boolean | false                                                   |
| selectionClipboard      | 选择剪切板                   | boolean | false                                                   |
| automaticLayout         | 自动布局                     | boolean | true                                                    |
| autoIndent              | 自动锁进                     | boolean | true                                                    |
| codeLens                | 代码镜头                     | boolean | false                                                   |
| scrollBeyondLastLine    | 滚动完最后一行后再滚动一屏幕 | boolean | false                                                   |
| colorDecorators         | 颜色装饰器                   | boolean | false                                                   |
| accessibilitySupport    | 辅助功能支持                 | string  | auto \| off \| on 默认值 `off`                          |
| selectOnLineNumbers     | 显示行号                     | boolean | true                                                    |
| lineNumbers             | 行号                         | string  | on \| off \| relative \| interval \| function 默认 `on` |
| lineNumbersMinChars     | 行号最小字符                 | number  | 5                                                       |
| enableSplitViewResizing | 自动切换视图                 | boolean | false                                                   |
| readOnly                | 是否只读                     | boolean | false                                                   |

### 方法说明

可供外部调用的方法

| 方法          | 说明               | 参数            | 返回值                    | 备注 |
| ------------- | ------------------ | --------------- | ------------------------- | ---- |
| mounted       | 编辑器创建完成后   | editor:instance | 编辑器实例                |      |
| setValue      | 设置初始值         | value:string    |                           |      |
| setTheme      | 设置主题           | theme:string    | vs \| vs-dark \| hc-black |      |
| getValue      | 获取编辑器值       |                 | value:string              |      |
| changeOptions | 修改编辑器配置     | options:object  |                           |      |
| setLanguage   | 动态修改编辑器语言 | language:string |                           |      |
| touchTrigger  | 主动触发编辑器事件 | action:string   |                           |      |

### Vue 插件配置

需要配置插件`monaco-editor-webpack-plugin`才可以使用

```
npm i monaco-editor-webpack-plugin -D
```

```
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")

module.exports = {
  ...
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: ["javascript", "css", "html", "typescript", "json", "xml"]
      })
    ]
  }
  ...
}
```
