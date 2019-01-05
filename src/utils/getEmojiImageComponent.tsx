import { getUnicodeEmoji } from './getUnicodeEmoji';
import twemoji from 'twemoji';
import { EmojiData } from '@/components/EmojiMobile';
import Vue from 'vue';

export function getEmojiComponentFromUnicode(unicode: string): Vue.Component {
  const result = twemoji.parse(unicode, {
    base: 'https://emoji.humorgrad.com/',
  }) as string;

  const isResultImgTag = result.startsWith('<img');
  if (isResultImgTag) {
    const url = getImageSrcFromImgTag(result)

    return Vue.component('emojiComponent', {
      functional: true,
      render(h) {
        return <img
          src={url}
          alt={unicode}
        >
        </img>;
      },
    });
  }
  return Vue.component('emojiComponent', {
    functional: true,
    render(h) {
      return <span>{unicode}</span>;
    },
  });
}

function getImageSrcFromImgTag(tag: string): string {
  const startString = 'src=';
  const startIndex = tag.indexOf(startString);
  if (startIndex < 0) {
    throw new Error(`cannot find src from image tag : ${tag}`);
  }
  const endIndex = tag.indexOf('"', startIndex + startString.length + 1);
  const url = tag.substring(startIndex + startString.length + 1, endIndex);
  return url;
}

export function getEmojiComponentFromEmojiId(emojiId: string, emojiData: EmojiData): Vue.Component {
  return getEmojiComponentFromUnicode(getUnicodeEmoji(emojiId, emojiData));
}
