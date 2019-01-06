import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';

let loadingCount = 0;
const maxLoadingCount = 50;
const queue: ThrottleList[] = [];

const vNodeCache: { [key: string]: VNode } = {};

@Component
export default class ThrottleList extends Vue {
  abstract = true;
  isLoaded: boolean = false;
  isLoading: boolean = false;
  isFirstRender: boolean = true;
  created() {
    // console.log('craeted');
  }
  startLoad() {
    // console.log('startLoad');
    this.isLoading = true;
    loadingCount += 1;
  }
  updated() {
    if (this.isLoading) {
      setTimeout(() => {
        loadingCount -= 1;
        this.isLoaded = true;
        this.isLoading = false;
        const nextComponent = queue.shift();
        if (!nextComponent) {
          return;
        }
        nextComponent.startLoad();
      }, 0);
    }
  }
  render() {
    // console.log('RENDER');
    const slots = this.$slots.default;
    if (!slots) {
      console.log('slot is undefined');
      return slots;
    }

    const vnode = slots[0];
    const key = vnode.key as string;

    if (this.isLoaded || this.isLoading) {
      if (vNodeCache[key]) {
        return vNodeCache[key];
      }
      vNodeCache[key] = vnode;
      return vnode;
    }

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
