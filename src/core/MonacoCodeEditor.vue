<template>
  <div ref="code" class="monaco-code" :style="style"></div>
</template>

<script>
import * as monaco from 'monaco-editor';

// import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands';
// import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';

// // javascript依赖包，提供代码语法解析及代码高亮等功能
// import 'monaco-editor/esm/vs/language/css/monaco.contribution.js';
// import 'monaco-editor/esm/vs/language/html/monaco.contribution.js';
// import 'monaco-editor/esm/vs/language/json/monaco.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript';
// import 'monaco-editor/esm/vs/basic-languages/css/css.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/html/html.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/less/less.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/mysql/mysql.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution.js';

// self.MonacoEnvironment = {
//   getWorkerUrl: function (moduleId, label) {
//     if (label === 'json') {
//       return './json.worker.js';
//     }
//     if (label === 'css' || label === 'scss' || label === 'less') {
//       return './css.worker.js';
//     }
//     if (label === 'html' || label === 'handlebars' || label === 'razor') {
//       return './html.worker.js';
//     }
//     if (label === 'typescript' || label === 'javascript') {
//       return './ts.worker.js';
//     }
//     return './editor.worker.js';
//   },
// };

export default {
  name: 'MonacoCodeEditor',
  data() {
    return {
      monacoEditor: '',
      defaultOptions: {
        theme: 'vs',
        value: ['function x() {', '\tconsole.log("winyh!");', '}'].join('\n'),
        language: 'javascript',
        fontSize: 14,
        folding: true,
        foldingHighlight: true,
        foldingStrategy: 'indentation',
        showFoldingControls: 'always',
        disableLayerHinting: true,
        emptySelectionClipboard: false,
        selectionClipboard: false,
        automaticLayout: true,
        autoIndent: true,
        codeLens: false,
        scrollBeyondLastLine: false,
        colorDecorators: true,
        accessibilitySupport: 'off',
        selectOnLineNumbers: true,
        lineNumbers: 'on',
        lineNumbersMinChars: 5,
        enableSplitViewResizing: false,
        readOnly: false, //是否只读  取值 true | false
      },
    };
  },
  props: {
    value: {
      type: String,
      default: ['function x() {', '\tconsole.log("winyh!");', '}'].join('\n'),
    },
    language: {
      type: String,
      default: 'javascript',
    },
    width: {
      type: [String, Number],
      default: '100%',
    },
    height: {
      type: [String, Number],
      default: '100%',
    },
    theme: {
      type: String,
      default: 'vs',
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
      this.monacoEditor && this.editor.setTheme(this.theme);
    },

    style() {
      this.monacoEditor &&
        this.$nextTick(() => {
          this.monacoEditor.layout();
        });
    },
  },
  computed: {
    style() {
      let { width, height } = this;
      let fixedWidth =
        width.toString().indexOf('%') !== -1 ? width : `${width}px`;
      let fixedHeight =
        height.toString().indexOf('%') !== -1 ? height : `${height}px`;
      if (this.editor) {
        this.editor.layout({
          width: fixedWidth.replace('px', ''),
          height: fixedHeight.replace('px', ''),
        });
      }
      return {
        width: fixedWidth,
        height: fixedHeight,
      };
    },
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    /* 编辑器初始化 */
    initEditor() {
      const { defaultOptions, options, value, language, theme } = this;
      if (this.monacoEditor) this.monacoEditor.dispose();
      const monacoOptions = Object.assign(defaultOptions, options);
      this.monacoEditor = monaco.editor.create(this.$refs.code, {
        ...monacoOptions,
        value,
        language,
        theme,
      });

      /* 对外抛出编辑器实例 */
      this.$emit('mounted', this.monacoEditor);

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
  min-height: 100px;
}
</style>