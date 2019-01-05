import { EmojiData } from '@/components/EmojiMobile';

export function getUnicodeEmoji(emojiId: string, emojiData: EmojiData) {
  return unifiedToNative(emojiData.emojis[emojiId].b);
}

function unifiedToNative(unified: string): string {
  const unicodes = unified.split('-');
  const codePoints = unicodes.map((u) => parseInt(`0x${u}`, 16));

  return String.fromCodePoint(...codePoints);
}
