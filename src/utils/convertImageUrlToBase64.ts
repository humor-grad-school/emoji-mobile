import { convertDataURItoBlob } from './convertDataURItoBlob';

const promises = {};

let sum = 0;
function convertBlobToDataUrl(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result as string);
    };
    reader.readAsDataURL(blob);
  });
}

function getLocalStorageKey(url: string): string {
  return `data-url-cache-of-url-${url}`;
}

const objectUrlCache: {[url: string]: string} = {}

export function convertHttpUrlToObjectUrlFromLocalCache(url: string): string | null {
  if (objectUrlCache[url]) {
    return objectUrlCache[url];
  }

  const localStorageKey = getLocalStorageKey(url);

  const cachedDataUrl = localStorage.getItem(localStorageKey);
  // return cachedDataUrl;
  return null;

  // if (cachedDataUrl) {
  //   const blob = convertDataURItoBlob(cachedDataUrl);
  //   const objectUrl = URL.createObjectURL(blob);
  //   // const now = performance.now();
  //   // const end = performance.now();
  //   // sum += end - now;
  //   // console.log(sum, end - now);

  //   objectUrlCache[url] = objectUrl;
  //   promises[url] = objectUrl;

  //   return objectUrl;
  // }
}

export async function convertHttpUrlToObjectUrl(url: string): Promise<string> {
  const cachedPromise = promises[url];
  if (cachedPromise) {
    return cachedPromise;
  }

  const cachedInLocal = convertHttpUrlToObjectUrlFromLocalCache(url);
  if (cachedInLocal) {
    console.log('cached in local');
    promises[url] = cachedInLocal;
    return cachedInLocal;
  }
  // console.log('not cached in local');

  promises[url] = new Promise<string>(async (resolve, reject) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const objectUrl = URL.createObjectURL(blob);

      objectUrlCache[url] = objectUrl;
      promises[url] = objectUrl;

      resolve(objectUrl);

      const dataUrl = await convertBlobToDataUrl(blob);
      const localStorageKey = getLocalStorageKey(url);
      localStorage.setItem(localStorageKey, dataUrl);
    } catch (err) {
      reject(err);
    }
  });

  return promises[url];
}
