import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import EmojiAnchor from './EmojiAnchor.vue';
import EmojiScroll from './EmojiScroll.vue';
import EmojiSearch from './EmojiSearch.vue';
import { convertHttpUrlToObjectUrl, convertHttpUrlToObjectUrlFromLocalCache } from '@/utils/convertImageUrlToBase64';
import { Emoji } from './EmojiMobile';

const caches = {};
let sum = 0;

type Func = () => Promise<void>;

const concurentMax = 10;
const lastPromises: Array<Promise<void>> = [];
for (let i = 0; i < concurentMax; i += 1) {
  lastPromises.push(Promise.resolve());
}

function waitQueue(func: Func) {
  const lastPromise = lastPromises.shift() as Promise<void>;
  const nextPromise = lastPromise.then(() => {
    return func();
    // return new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 0);
    // });
  });
  lastPromises.push(nextPromise);
}


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
  // @Prop(Boolean)
  isVisible: boolean = true;
  $refs!: {
    img: HTMLImageElement;
  };
  url: string = '';
  isImageLoaded = false;

  // @Watch('emoji.unicode', { immediate: true, deep: true })
  // onUnicodeChanged(unicode: string) {

  // }

  async mounted() {
    this.$refs.img.onload = () => {
      console.log('load');
      this.isImageLoaded = true;
    }
    // this.$emit('onLoaded');
    // console.log('mounted');
    waitQueue(async () => {
      const { url } = this.emoji;
      const cached = caches[url];
      if (cached) {
        this.url = cached;
        return;
      }

      const now = performance.now();


      // this.url = url;

      const localCachedUrl = convertHttpUrlToObjectUrlFromLocalCache(url);
      if (localCachedUrl) {
        this.url = localCachedUrl;
        caches[url] = url;
        return;
      }

      const objectUrl = await convertHttpUrlToObjectUrl(url);
      caches[url] = objectUrl;
      this.url = objectUrl;

      const end = performance.now();
      sum += end - now;
      console.log(sum, end - now);
    });
  }

  updated() {
    // console.log('updated');
  }

  created() {
    // console.log('created');
  }
}


