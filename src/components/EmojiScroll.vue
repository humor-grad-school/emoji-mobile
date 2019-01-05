<template>
  <div ref="container" class='container'>
    <div
      v-for="(category, index) of emojiData.categories"
      :key="`category-${category.id}`"
      class='category'
    >
      <div
        class='category-name-container'
        ref="categoryNameContainerElements"
        :class="{ sticky: currentCategoryIndex === index }"
        :style="{ top: currentCategoryIndex === index
          ? `${containerOffsetTop}px`
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
        :style="{ 'margin-top': currentCategoryIndex === index && $refs.categoryNameContainerElements
          ? `${$refs.categoryNameContainerElements[index].clientHeight}px`
          : '0px'
        }"
      >
        <span
          class='emoji'
          v-for="emoji of category.emojis"
          :key="emoji"
          v-html="getImageUrl(unifiedToNative(emojiData.emojis[emoji].b)[0])"
        ></span>
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
span.emoji {
  padding: 6px;
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
<style>
img.emoji {
  height: 36px;
  width: 36px;
}
</style>
