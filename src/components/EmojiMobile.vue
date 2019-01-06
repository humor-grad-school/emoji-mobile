<template>
  <div class='emoji-mobile'>
    <div ref="header" class='header'>
      <EmojiSearch
        :emojiData="emojiData"
        @onSearchTextChanged="onSearchTextChanged"
      />
      <EmojiAnchor :emojiData="emojiData" />
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
        :emojiData="isSearching ? searchedEmojiData : emojiData"
        :scrollTop="contentScrollTop"
        @onEmojiClicked="onEmojiClicked"
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
  width: 100vw;
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