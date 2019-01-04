import { Component, Vue, Prop } from 'vue-property-decorator';

import { categorySvgMap } from './svgs';

@Component({
  components: {
  },
})
export default class EmojiAnchor extends Vue {
  @Prop(Array)
  categories!: string[];
  categorySvgMap = categorySvgMap;
  public mounted() {
    console.log(categorySvgMap);
  }
}
