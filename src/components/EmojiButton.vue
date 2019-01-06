<template>
  <button
    class='emoji-button'
  >
    <span v-if="!isVisible"></span>
    <!-- <span v-else :style="{
      background: `url(${url}) 0% 0% / 36px`,
      'background-size': '36px ',
    }">{{url ? emoji.unicode : emoji.unicode}}</span> -->
    <template v-else>
      <img ref="img" :src="url" :style="{
        width: isImageLoaded ? '36px' : '0px',
        height: isImageLoaded ? '36px' : '0px',
      }"/>
      <!-- <span>{{emoji.unicode}}</span> -->
      <span v-if="!isImageLoaded">{{emoji.unicode}}</span>
    </template>

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
  background-size: 36px 36px;
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
