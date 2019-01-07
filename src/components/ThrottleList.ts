import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';

let loadingCount = 0;
const maxLoadingCount = 100;
const queue: ThrottleList[] = [];

const vNodeCache: { [key: string]: VNode } = {};

(window as any).sum = 0;

@Component
export default class ThrottleList extends Vue {
  abstract = true;
  isLoaded: boolean = false;
  isLoading: boolean = false;
  isFirstRender: boolean = true;
  prev: any;
  created() {
    // console.log('craeted');
  }
  startLoad() {
    // console.log('startLoad');
    this.isLoading = true;
    loadingCount += 1;
  }
  endLoad() {
    if (!this.isLoading) {
      return;
    }
    loadingCount -= 1;
    this.isLoaded = true;
    this.isLoading = false;
    const nextComponent = queue.shift();
    if (!nextComponent) {
      return;
    }
    nextComponent.startLoad();
  }
  mounted() {
    // console.log('mounted');
  }
  updated() {
    // console.log('updated');
    if (this.isLoading) {
      setTimeout(() => {
        this.endLoad();
      }, 0);
    }
  }
  beforeDestroy() {
    // console.log('mama~ uuuuuuuu~~~~ destoryed');
    setTimeout(() => {
      this.endLoad();
    }, 0);
  }
  render() {
    // console.log('RENDER');
    const slots = this.$slots.default;
    if (!slots) {
      // console.log('slot is undefined');
      return slots;
    }

    const vNode = slots[0];
    const key = vNode.key as string;

    const cachedVNode = vNodeCache[key];
    if (cachedVNode) {
      vNode.componentInstance = vNodeCache[key].componentInstance;
      return vNode;
      // if (cachedVNode !== vNode) {
      //   // console.log(cachedVNode, vNode, key);
      //   (window as any).sum += 1;
      // }
      // // console.log('cached', key);
      // return cachedVNode;
    }
    // console.log('not cached');
    if (this.isLoaded || this.isLoading) {
      // console.log('loaded but not cached', key);
      if (vNode.data) {
        vNode.data.keepAlive = true;
      }
      if (vNode.elm) {
        vNodeCache[key] = vNode;
      }
      return vNode;
    }
    // console.log('not loaded', key);


    if (loadingCount < maxLoadingCount) {
      // console.log('will load');
      this.startLoad();
    } else if (this.isFirstRender) {
      queue.push(this);
    }

    this.isFirstRender = false;

    return null;
  }
}
