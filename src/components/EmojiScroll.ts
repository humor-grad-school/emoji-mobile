import { Component, Vue, Prop } from 'vue-property-decorator';
import { EmojiData } from './EmojiMobile';
import twemoji from 'twemoji';

@Component({
  components: {
  },
})
export default class EmojiScroll extends Vue {
  @Prop(Object)
  emojiData!: EmojiData;

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
