<template>
  <button
    class='emoji-button'
  >
    <span :style="{
      'background': `url(${url}) -${x * 36}px -${y * 36}px`,
    }"
      :data="emoji.id"
    ></span>
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
/* .emoji-button > img {
  height: 0px;
  width: 0px;
} */
/* .loaded {
  height: 36px;
  width: 36px;
} */
</style>
