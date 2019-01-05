import { Component, Vue } from 'vue-property-decorator';
import EmojiAnchor from './EmojiAnchor.vue';
import EmojiScroll from './EmojiScroll.vue';
import EmojiSearch from './EmojiSearch.vue';
/* tslint:disable-next-line */
import emojiData from '../emojiData.json';
import { categories } from '@/data/categories';

export interface EmojiData {
  categories: Array<{
    emojis: string[],
    id: string,
    name: string,
  }>;
  emojis: {
    [id: string]: {
      a: string; // description
      b: string; // code
      j?: string[]; // keywords
    },
  };
  compressed: boolean;
  aliases: { [id: string]: string };
}

@Component({
  components: {
    EmojiAnchor,
    EmojiScroll,
    EmojiSearch,
  },
})
export default class EmojiMobile extends Vue {
  readonly categories = categories;
  readonly emojiData = emojiData as EmojiData;
  $refs!: {
    content: HTMLDivElement;
    header: HTMLDivElement;
  };
  contentScrollTop: number = 0;
  headerHeight: number = 0;
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
}
