import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { EmojiData } from './EmojiMobile';
import { getEmojiComponentFromEmojiId } from '@/utils/getEmojiImageComponent';

@Component({
  components: {
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
  getEmojiComponentFromEmojiId = getEmojiComponentFromEmojiId;

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
}
