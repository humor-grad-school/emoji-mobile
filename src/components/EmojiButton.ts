import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import EmojiAnchor from './EmojiAnchor.vue';
import EmojiScroll from './EmojiScroll.vue';
import EmojiSearch from './EmojiSearch.vue';
import twemoji from 'twemoji';
import { convertImageUrlToBase64 } from '@/utils/convertImageUrlToBase64';

const caches = {};

@Component({
  components: {
    EmojiAnchor,
    EmojiScroll,
    EmojiSearch,
  },
})
export default class EmojiButton extends Vue {
  @Prop(String)
  unicode!: string;

  url: string = '';

  @Watch('unicode', { immediate: true })
  async onUnicodeChanged(unicode: string) {
    const cached = caches[unicode];
    if (cached) {
      this.url = cached;
      return;
    }

    const result = twemoji.parse(this.unicode, {
      // base: 'https://emoji.humorgrad.com/',
      base: 'https://s3.ap-northeast-2.amazonaws.com/humor-grad-emoji/',
    }) as string;

    const url = this.getImageSrcFromImgTag(result);
    const base64Image = await convertImageUrlToBase64(url);

    this.url = base64Image;
    caches[unicode] = base64Image;
  }

  getImageSrcFromImgTag(tag: string): string {
    const startString = 'src=';
    const startIndex = tag.indexOf(startString);
    if (startIndex < 0) {
      throw new Error(`cannot find src from image tag : ${tag}`);
    }
    const endIndex = tag.indexOf('"', startIndex + startString.length + 1);
    const url = tag.substring(startIndex + startString.length + 1, endIndex);
    return url;
  }
}


