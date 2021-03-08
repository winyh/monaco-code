<template>
  <div id="app">
    <h3 class="title">monaco-code 在线编辑器</h3>
    <div class="tool">
      <select name="theme" id="" @change="themeChange">
        <option value="vs" selected>vs</option>
        <option value="vs-dark">vs-dark</option>
        <option value="hc-black">hc-black</option>
      </select>
    </div>
    <monaco-code-editor :value="value" ref="monaco" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      value: "const name = 'monaco code'",
      language: 'javascript',
    };
  },
  methods: {
    themeChange(e) {
      const target = this.$refs.monaco;
      const theme = e.target.value;
      target.changeOptions({ theme });
    },
  },
};
</script>

<style>
#app {
  height: 500px;
}

#app .title {
  text-align: center;
}

#app .tool {
  text-align: center;
}
</style>
