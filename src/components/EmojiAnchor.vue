<template>
  <div class="container">
    <span class="icon" v-for="category in categories" :key="category">
      <component :is="categorySvgMap[category]"></component>
    </span>
  </div>
</template>

<script lang='ts' src="./EmojiAnchor.ts">
</script>

<style scoped>
.container {
  height: 42px;
  padding: 8px;

  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  color: #858585
}
.icon {
  padding: 12px 4px;
}
.icon svg {
  fill: currentColor;
  height: 18px;
  width: 18px;
}
</style>
