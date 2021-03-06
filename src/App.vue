<template>
  <div id="app">
    <MonacoCode :value="value" />
  </div>
</template>

<script>
import MonacoCode from './core/MonacoCode.vue';

export default {
  name: 'App',
  data() {
    return {
      value: "const name = 'winyh'",
    };
  },
  components: {
    MonacoCode,
  },
};
</script>
