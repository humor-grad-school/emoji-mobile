<template>
  <div ref="container" class='container'>
    <div
      v-for="(category, index) of emojiData.categories"
      :key="`emoji-scroll-category-${category.id}`"
      class='category'
    >
      <div
        class='category-name-container'
        ref="categoryNameContainerElements"
        :class="{ sticky: currentCategoryIndex === index }"
        :style="{ top: currentCategoryIndex === index
          ? `${stickyTop}px`
          : '0px',
        }"
      >
        <div
          class='category-name'
        >
          {{category.name}}
        </div>
      </div>

      <div
        class='emojis'
        ref="emojisElements"
        :style="{ 'margin-top': currentCategoryIndex === index
          ? `${emojisMarginTop}px`
          : '0px'
        }"
      >
        <ThrottleList v-for="emoji of category.emojis">
          <KeepAliveGlobal :key="`KeepAliveGlobal-${emoji.id}`">
            <EmojiButton
              :key="`EmojiButton-${emoji.id}`"
              :emoji="emoji"
              @click="onEmojiClicked(emoji)"
              @onLoaded="onEmojiButtonLoaded(emoji)"
            />
          </KeepAliveGlobal>
        </ThrottleList>

        <!-- <template v-for="emoji of loadingCategoryEmojisMap[index]">
          <KeepAliveGlobal :key="`KeepAliveGlobal-${emoji.id}`">
            <EmojiButton
              :key="`EmojiButton-${emoji.id}`"
              :emoji="emoji"
              @click="onEmojiClicked(emoji)"
              @onLoaded="onEmojiButtonLoaded(emoji)"
            />
          </KeepAliveGlobal>
        </template> -->
      </div>
    </div>
  </div>
</template>

<script lang='ts' src='./EmojiScroll.ts'>
</script>

<style scoped>
.container {
  padding: 0px 0px 1200px 0px;
  width: 100%;
}
.category-name-container {
  width: 100%;
}
.category-name {
  width: 100%;
  padding: 6px;
  font-weight: bold;
}
.category {

}
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
.sticky {
  position: fixed;
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
}
.emojis {
  padding: 12px 0px 12px 0px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
