# monaco-code

基于 `monaco-editor` Vue 版本编辑器

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

| 参数     | 说明   | 类型   | 默认值                                     |
| -------- | ------ | ------ | ------------------------------------------ |
| value    | 初始值 | string |                                            |
| language | 语言   | string | javascript \| json \| html 默认 javascript |
| options  | 配置项 | object |                                            |

### options 参数

| 参数     | 说明   | 类型   | 默认值                                     |
| -------- | ------ | ------ | ------------------------------------------ |
| value    | 初始值 | string |                                            |
| language | 语言   | string | javascript \| json \| html 默认 javascript |
| options  | 配置项 | object |                                            |

### 方法说明

可供外部调用的方法

| 方法          | 说明               | 参数            | 返回值                    | 备注 |
| ------------- | ------------------ | --------------- | ------------------------- | ---- |
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
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: ["javascript", "css", "html", "typescript", "json"]
      })
    ]
  }
}
```
