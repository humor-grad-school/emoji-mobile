import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import EmojiAnchor from './EmojiAnchor.vue';
import EmojiScroll from './EmojiScroll.vue';
import EmojiSearch from './EmojiSearch.vue';
import { convertHttpUrlToObjectUrl, convertHttpUrlToObjectUrlFromLocalCache } from '@/utils/convertImageUrlToBase64';
import { Emoji } from './EmojiMobile';

@Component({
  components: {
    EmojiAnchor,
    EmojiScroll,
    EmojiSearch,
  },
})
export default class EmojiButton extends Vue {
  @Prop(Object)
  emoji!: Emoji;
  $refs!: {
    img: HTMLImageElement;
  };
  url: string = '';
  isImageLoaded = false;
  x: number = 0;
  y: number = 0;

  async mounted() {
    // console.log('mounted', this.emoji.unicode);
    const {
      x,
      y,
      name,
    } = this.emoji.sprite;
    this.x = x;
    this.y = y;
    const url = `https://emoji.humorgrad.com/sprite/${name}_36.png`;

    const localCachedUrl = convertHttpUrlToObjectUrlFromLocalCache(url);
    if (localCachedUrl) {
      this.url = localCachedUrl;
      caches[url] = url;
      return;
    }

    const objectUrl = await convertHttpUrlToObjectUrl(url);
    caches[url] = objectUrl;
    this.url = objectUrl;
  }

  updated() {
    // console.log('updated', this.emoji.unicode);
  }

  created() {
    // console.log('created', this.emoji.unicode);
  }
}


