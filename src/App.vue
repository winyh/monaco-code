<template>
  <div id="app">
    <h3 class="title">monaco-code 在线编辑器</h3>
    <div class="tool">
      <select name="theme" id="" @change="selectChange">
        <option value="vs" selected>vs</option>
        <option value="vs-dark">vs-dark</option>
        <option value="hc-black">hc-black</option>
      </select>
    </div>
    <MonacoCode :value="value" ref="monaco" />
  </div>
</template>

<script>
import MonacoCode from './core/MonacoCode.vue';

export default {
  name: 'App',
  data() {
    return {
      value: "const name = 'winyh'", // '{"name":"winyh"}'
    };
  },
  components: {
    MonacoCode,
  },
  methods: {
    selectChange(e) {
      const target = this.$refs.monaco;
      const theme = e.target.value;
      console.log(target, theme);
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
}
</style>
