<template>
  <div class='emoji-mobile'>
    <div ref="header" class='header'>
      <EmojiSearch :categories="categories" :emojiData="emojiData" />
      <EmojiAnchor :categories="categories" :emojiData="emojiData" />
    </div>
    <div
      ref="content"
      class='content'
      :style="{
        'margin-top': `${headerHeight}px`,
        height: `calc(100vh - ${headerHeight}px)`,
      }"
    >
      <EmojiScroll
        :categories="categories"
        :emojiData="emojiData"
        :scrollTop="contentScrollTop"
      />
    </div>
  </div>
</template>

<script lang='ts' src="./EmojiMobile.ts">
</script>

<style scoped>
.header {
  position: fixed;
  width: 100%;
}
.content {
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
.emoji-mobile {
  width: 100%;
  height: 100vh;

  overflow: hidden;
}
</style>

<style>
  body {
    margin: 0;
    position: fixed;
  }
</style>