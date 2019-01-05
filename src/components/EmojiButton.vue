<template>
  <button
    class='emoji-button'
  >
    <span v-if="url.length === 0">{{unicode}}</span>
    <img
      v-else
      :src="url"
      :alt="unicode"
    ></img>
  </button>
</template>

<script lang='ts' src='./EmojiButton.ts'>
</script>

<style scoped>
.emoji-button {
  padding: 6px;
  background: transparent;
  border: none;
  text-decoration: none;
  cursor: pointer;
}
.emoji-button:active {
  position:relative;
  top:1px;
}
.emoji-button > * {
  height: 36px;
  width: 36px;
  font-size: 36px;
  display: inline-block;
  font-family: "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji";
}
</style>
