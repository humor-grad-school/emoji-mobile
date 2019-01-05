import { EmojiData } from '@/components/EmojiMobile';

const cache = {};
export function getUnicodeEmoji(emojiId: string, emojiData: EmojiData) {
  return unifiedToNative(emojiData.emojis[emojiId].b);
}

function unifiedToNative(unified: string): string {
  const cached = cache[unified];
  if (cached) {
    return cached;
  }
  const unicodes = unified.split('-');
  const codePoints = unicodes.map((u) => parseInt(`0x${u}`, 16));

  const result = String.fromCodePoint(...codePoints);
  cache[unified] = result;
  return result;
}
