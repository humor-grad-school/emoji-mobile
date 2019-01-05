const promises = {};

function convertBlobToBase64(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result as string);
    };
    reader.readAsDataURL(blob);
  });
}

export async function convertImageUrlToBase64(url: string): Promise<string> {
  const key = `emoji-image-${url}`;

  const cachedPromise = promises[url];
  if (cachedPromise) {
    // console.log('cached in promises');
    return await cachedPromise;
  }
  // console.log('not cached in promises');

  const cachedFromLocalStrage = localStorage.getItem(key);
  if (cachedFromLocalStrage) {
    // console.log('cached in local storage');
    promises[url] = cachedFromLocalStrage;
    return cachedFromLocalStrage;
  }
  // console.log('not cached in local storage');

  const newPromise = promises[url] = new Promise<string>(async (resolve, reject) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const base64 = await convertBlobToBase64(blob);

      localStorage.setItem(key, base64);
      return resolve(base64);
    } catch (err) {
      reject(err);
    }
  });

  return await newPromise;
}