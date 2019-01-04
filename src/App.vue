<template>
  <div id="app">
    <EmojiMobile />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EmojiMobile from './components/EmojiMobile.vue';

@Component({
  components: {
    EmojiMobile,
  },
})
export default class App extends Vue {}
</script>
