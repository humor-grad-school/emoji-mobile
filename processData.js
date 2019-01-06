const twemoji = require('twemoji');

function convertUnicodeToUrl(unicode) {
  const result = twemoji.parse(unicode, {
    base: 'https://emoji.humorgrad.com/',
  });

  const url = getImageSrcFromImgTag(result);
  return url;
}

function getImageSrcFromImgTag(tag) {
  const startString = 'src=';
  const startIndex = tag.indexOf(startString);
  if (startIndex < 0) {
    throw new Error(`cannot find src from image tag : ${tag}`);
  }
  const endIndex = tag.indexOf('"', startIndex + startString.length + 1);
  const url = tag.substring(startIndex + startString.length + 1, endIndex);
  return url;
}

const emojiData = require('./src/emojiData.json');
const newCategories = emojiData.categories.map((cate) => {
  return {
    id: cate.id,
    name: cate.name,
    emojis: cate.emojis.map((emoji) => {
      return {
        id: emoji.id,
        unicode: emoji.unicode,
        url: convertUnicodeToUrl(emoji.unicode),
      };
    }),
  };
});

const fs = require('fs');
fs.writeFileSync('emojiData.json', JSON.stringify({
  categories: newCategories,
}, null, 2));
