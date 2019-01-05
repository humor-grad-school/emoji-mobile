import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { EmojiData } from './EmojiMobile';
import twemoji from 'twemoji';

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

    const offsetTops = this.$refs.emojisElements
      .map((categoryNameElement) => {
        return categoryNameElement.offsetTop;
      });
    console.log(this.currentCategoryIndex);
    console.log(scrollTop, offsetTops);
    console.log('');
  }

  mounted() {
    this.containerOffsetTop = this.$refs.container.offsetTop;
  }

  unifiedToNative(unified: string): string[] {
    const unicodes = unified.split('-');
    const codePoints = unicodes.map((u) => parseInt(`0x${u}`, 16));

    return codePoints.map((codePoint) => {
      return String.fromCodePoint(codePoint);
    });
  }

  getImageUrl(codePoint: string) {
    return twemoji.parse(codePoint,   {
      // callback: () => {

      // },   // default the common replacer
      attributes: () => {
        return {};
      }, // default returns {}
      base: 'https://emoji.humorgrad.com/',
    });
  }
}
