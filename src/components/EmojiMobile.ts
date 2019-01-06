import { Component, Vue } from 'vue-property-decorator';
import EmojiAnchor from './EmojiAnchor.vue';
import EmojiScroll from './EmojiScroll.vue';
import EmojiSearch from './EmojiSearch.vue';
/* tslint:disable-next-line */
import emojiData from '../emojiData.json';

export interface CategoryData {
  emojis: Emoji[];
  id: string;
  name: string;
}

export interface Emoji {
  id: string;
  unicode: string;
  url: string;
}

export interface EmojiData {
  categories: CategoryData[];
}

@Component({
  components: {
    EmojiAnchor,
    EmojiScroll,
    EmojiSearch,
  },
})
export default class EmojiMobile extends Vue {
  readonly emojiData = {
    ...emojiData,
    categories: emojiData.categories.filter(cate => cate.id === 'people'),
    // categories: [
    //   {
    //     "id": "people",
    //     "name": "Smileys & People",
    //     "emojis": [
    //       {
    //         "id": "grinning",
    //         "unicode": "😀",
    //         "url": "https://emoji.humorgrad.com/72x72/1f600.png"
    //       },
    //     ],
    //   }
    // ],
  } as EmojiData;
  searchedEmojiData = emojiData;
  isSearching = false;
  $refs!: {
    content: HTMLDivElement;
    header: HTMLDivElement;
  };
  contentScrollTop: number = 0;
  headerHeight: number = 0;
  prev = performance.now();

  mounted() {
    this.addRecent();
    this.addCustom();

    this.$refs.content.scroll(0, 1);
    this.$refs.content.onscroll = () => {
      this.contentScrollTop = this.$refs.content.scrollTop;
      if (this.$refs.content.scrollTop === 0) {
        this.$refs.content.scroll(0, 1);
      }
    };

    this.headerHeight = this.$refs.header.clientHeight;
  }

  updated() {
    this.headerHeight = this.$refs.header.clientHeight;

    const now = performance.now();
    console.log(now - this.prev);
    this.prev = now;
  }

  addRecent() {
    this.emojiData.categories.push({
      emojis: [],
      id: 'recent',
      name: 'Frequently Used',
    });
  }
  addCustom() {
    this.emojiData.categories.push({
      emojis: [],
      id: 'custom',
      name: 'Custom',
    });
  }
  onEmojiClicked(emoji: string) {
    console.log('onEmojiClicked', emoji);
  }

  onSearchTextChanged(text: string) {
    console.log('onSearchTextChanged', text);
    this.isSearching = text.length > 0;
    if (!this.isSearching) {
      return;
    }

    const foundEmojis = emojiData.categories.flatMap((category) => category.emojis).flat()
    .filter((emoji) => emoji.id.indexOf(text) >= 0)
    .sort((a, b) => a.id.indexOf(text) - a.id.indexOf(text));
    this.searchedEmojiData = {
      ...emojiData,
      categories: [{
        emojis: foundEmojis,
        id: 'search',
        name: 'Search',
      }],
    };
  }
}
