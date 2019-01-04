<template>
  <div class='container'>
    <div
      v-for="category of emojiData.categories"
      :key="category.id"
      class='category'
    >
      <div class='category-name'>
        {{category.name}}
      </div>

      <span
        class='emoji'
        v-for="emoji of category.emojis"
        :key="emoji"
        v-html="getImageUrl(unifiedToNative(emojiData.emojis[emoji].b)[0])"
      >
      <!-- <img
        class="emoji"
        draggable="false"
        :alt="unifiedToNative(emojiData.emojis[emoji].b)[0]"
        :src="`https://twemoji.maxcdn.com/72x72/${(emojiData.emojis[emoji].c || emojiData.emojis[emoji].b).split('-')[0].toLowerCase()}.png`"/> -->
      <!-- {{getImageUrl(unifiedToNative(emojiData.emojis[emoji].b)[0])}} -->
      </span>
    </div>
  </div>
</template>

<script lang='ts' src='./EmojiScroll.ts'>
</script>

<style scoped>
.container {
  padding: 8px;
  width: 100%;
  /* height: calc(100vh - 74px); */

  background: pink;
  overflow-y: auto;
}
</style>
