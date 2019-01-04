<template>
  <div class='emoji-mobile'>
    <EmojiSearch :categories="categories" :emojiData="emojiData" />
    <EmojiAnchor :categories="categories" :emojiData="emojiData" />
    <EmojiScroll :categories="categories" :emojiData="emojiData" />
  </div>
</template>

<script lang='ts' src="./EmojiMobile.ts">
</script>

<style scoped>
  .emoji-mobile {
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;

    justify-content: flex-start; /* align items in Main Axis */
    align-items: stretch; /* align items in Cross Axis */
    align-content: stretch; /* Extra space in Cross Axis */

    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    /* border: 1px solid red; */

    overflow: hidden;
  }
</style>

<style>
  body {
    margin: 0;
  }
</style>