import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { EmojiData, Emoji } from './EmojiMobile';
import EmojiButton from './EmojiButton';
import KeepAliveGlobal from 'vue-keep-alive-global';
import ThrottleList from './ThrottleList';

@Component({
  components: {
    EmojiButton,
    KeepAliveGlobal,
    ThrottleList,
  },
})
export default class EmojiScroll extends Vue {
  @Prop(Object)
  emojiData!: EmojiData;
  @Prop(Number)
  scrollTop!: number;

  currentCategoryIndex: number = 0;
  containerOffsetTop: number = 0;

  $refs!: {
    emojisElements: HTMLDivElement[];
    categoryNameContainerElements: HTMLDivElement[];
    container: HTMLDivElement;
  };
  emojisMarginTop: number = 0;
  stickyTop: number = 0;

  loadingCategoryEmojisMap: { [index: number]: Emoji[] } = {};
  emojiLoadingMap: { [emojiId: string]: boolean } = {};
  loadedEmojiCount: number = 0;

  @Watch('scrollTop')
  onScrollTopChanged(scrollTop: number, prevScrollTop: number) {
    this.currentCategoryIndex = this.$refs.emojisElements.sort((a, b) => {
      return a.offsetTop - b.offsetTop;
    })
      .filter((emojisElement, index) => {
        const categoryNameContainerElement = this.$refs.categoryNameContainerElements[index];
        const categoryStartOffset = emojisElement.offsetTop - categoryNameContainerElement.clientHeight;

        return categoryStartOffset < scrollTop + this.containerOffsetTop;
      }).length - 1;
    if (this.currentCategoryIndex === -1) {
      this.currentCategoryIndex = 0;
    }
  }

  mounted() {
    this.updateCssValues();
  }

  updated() {
    this.updateCssValues();
  }

  updateCssValues() {
    this.containerOffsetTop = this.$refs.container.offsetTop;
    const currentCategoryElement = this.$refs.categoryNameContainerElements[this.currentCategoryIndex];
    this.emojisMarginTop = currentCategoryElement
      ? currentCategoryElement.clientHeight
      : 0;

    const containerParentElement = this.$refs.container.parentElement;
    if (containerParentElement) {
      this.stickyTop = containerParentElement.offsetTop;
    }
  }

  onEmojiClicked(emoji: string) {
    this.$emit('onEmojiClicked', emoji);
  }
  onEmojiButtonLoaded(emoji: Emoji) {
    this.emojiLoadingMap[emoji.id] = true;
    if (this.isLoadEmojiFinished()) {
      // console.log('isLoadEmojiFinished')
      this.loadNextEmojis();
    }
  }

  created() {
    this.loadNextEmojis();
  }

  loadNextEmojis() {
    let categoryIndex = 0;
    let emojiIndex = 0;
    let addedCount = 0;
    const loadMax = 10;
    while (this.emojiData.categories[categoryIndex] && addedCount < loadMax) {
      const emoji = this.emojiData.categories[categoryIndex].emojis[emojiIndex];
      if (!this.loadingCategoryEmojisMap[categoryIndex]) {
        this.loadingCategoryEmojisMap[categoryIndex] = [];
      }
      const loadingEmoji = this.loadingCategoryEmojisMap[categoryIndex][emojiIndex];
      if (!emoji) {
        categoryIndex += 1;
        emojiIndex = 0;
        continue;
      }

      if (loadingEmoji) {
        emojiIndex += 1;
        continue;
      }

      this.loadingCategoryEmojisMap[categoryIndex][emojiIndex] = emoji;
      emojiIndex += 1;
      addedCount += 1;
    }
    // console.log('addedCount', addedCount);
    this.loadedEmojiCount += addedCount;
  }

  isLoadEmojiFinished() {
    return Object.entries(this.loadingCategoryEmojisMap).every(([_, emojis]) => {
      return emojis.every((emoji) => {
        return this.emojiLoadingMap[emoji.id];
      });
    });
  }
}
