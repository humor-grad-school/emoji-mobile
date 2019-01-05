import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class EmojiSearch extends Vue {
  text: string = '';

  @Watch('text')
  onTextChanged(text: string, prevText: string) {
    this.$emit('onSearchTextChanged', text);
  }
}
