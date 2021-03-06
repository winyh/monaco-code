<template>
  <div ref="code" class="monaco-code"></div>
</template>

<script>
import * as monaco from 'monaco-editor';

export { monaco };
export default {
  name: 'MonacoCode',
  data() {
    return {
      monacoEditor: '',
      defaultOptions: {
        theme: '', // 主题
        value: ['function x() {', '\tconsole.log("winyh!");', '}'].join('\n'), // 默认显示的值
        language: 'json',
        folding: true, // 是否折叠
        foldingHighlight: true, // 折叠等高线
        foldingStrategy: 'indentation', // 折叠方式  auto | indentation
        showFoldingControls: 'always', // 是否一直显示折叠 always | mouseover
        disableLayerHinting: true, // 等宽优化
        emptySelectionClipboard: false, // 空选择剪切板
        selectionClipboard: false, // 选择剪切板
        automaticLayout: true, // 自动布局
        autoIndent: true, // 自动布局
        codeLens: false, // 代码镜头
        scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
        colorDecorators: true, // 颜色装饰器
        accessibilitySupport: 'off', // 辅助功能支持  "auto" | "off" | "on"
        selectOnLineNumbers: true, // 显示行号
        lineNumbers: 'on', // 行号 取值： "on" | "off" | "relative" | "interval" | function
        lineNumbersMinChars: 5, // 行号最小字符   number
        enableSplitViewResizing: false,
        readOnly: true, //是否只读  取值 true | false
      },
    };
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: 'javascript',
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    options: {
      deep: true,
      handler(options) {
        this.monacoEditor && this.monacoEditor.updateOptions(options);
      },
    },

    value() {
      this.monacoEditor &&
        this.value !== this.getValue() &&
        this.setValue(this.value);
    },

    language() {
      this.monacoEditor.setModelLanguage(
        this.monacoEditor.getModel(),
        this.language,
      );
    },

    theme() {
      this.monacoEditor && monaco.editor.setTheme(this.theme);
    },

    style() {
      this.monacoEditor &&
        this.$nextTick(() => {
          this.monacoEditor.layout();
        });
    },
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    /* 编辑器初始化 */
    initEditor() {
      const { defaultOptions, options, value, language } = this;
      if (this.monacoEditor) this.monacoEditor.dispose();
      const monacoOptions = Object.assign({}, options);
      console.log(defaultOptions);
      this.monacoEditor = monaco.editor.create(this.$refs.code, {
        ...monacoOptions,
        value,
        language,
      });

      /* 对外抛出编辑器实例 */
      this.$emit('onMounted', this.monacoEditor);

      /* 监听内容变化：对外抛出 input, change 事件 */
      this.monacoEditor.onDidChangeModelContent(() => {
        const monacoValue = this.monacoEditor.getValue();
        this.$emit('input', monacoValue);
        this.$emit('change', monacoValue);
      });
    },
    /* 调用设置更新值 */
    setValue(value) {
      var oldEditor = this.monacoEditor.getModel();
      var oldValue = this.monacoEditor.getValue();
      value = value || oldValue;
      if (oldEditor) oldEditor.dispose();
      this.monacoEditor.setModel(monaco.editor.createModel(value));
    },
    /* 调用获取值 */
    getValue() {
      return this.monacoEditor.getValue();
    },
    /* 修改配置项 */
    changeOptions(options) {
      this.monacoEditor.updateOptions(options); // options = { readOnly:true } 将编辑器修改为只读，以此类推
    },
    /* 主动触发编辑器事件：默认为格式化 */
    touchTrigger(action) {
      action || 'editor.action.formatDocument';
      this.monacoEditor.trigger('anything', action);
    },
    /* 动态切换语言 */
    setLanguage(language) {
      this.monacoEditor.setModelLanguage(
        this.monacoEditor.getModel(),
        language,
      );
    },
    /* 设置主题 */
    setTheme(theme) {
      this.monacoEditor.setTheme(theme);
    },
  },
  beforeDestory() {
    this.monacoEditor.dispose();
  },
};
</script>

<style scoped>
.monaco-code {
  min-height: 300px;
}
</style>