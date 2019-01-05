<template>
  <div class="container">
    <div class="search-svg-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="13"
        viewBox="0 0 20 20"
        opacity="0.5"
      >
        <path
          d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
        ></path>
      </svg>
    </div>

    <input type="text" placeholder="search">
    <!-- <label>

    </label>-->
    <button class="cancel-button">취소</button>
  </div>
</template>

<script lang='ts' src="./EmojiSearch.ts">
</script>

<style scoped>
.container {
  width: 100%;
  margin: 6px 0px 6px 0px;
  padding: 0 6px;
  display: flex;

  -webkit-justify-content: space-around;
  justify-content: space-around;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  -webkit-align-items: stretch;
  align-items: stretch;
}
.container input {
  padding: 5px 5px 6px 5px;
  border: 1px solid #d9d9d9;
  outline: 0;
  font-size: 16px;
  flex: 1;
}
.search-svg-container {
  position: relative;
  padding: 6px 5px 5px 5px;
}
.icon-serach {
  content: "\f002";
}
.cancel-button {
  padding: 0px 15px 0px 15px;
  font-weight: bold;
  color: #3BB9FF;
  border: 0px;
  background: transparent;
  font-size: 16px;
}
</style>
