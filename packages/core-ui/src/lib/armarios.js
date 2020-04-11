import unfetch from 'unfetch';
import b64toBlob from './b64-to-blob';
import store from '../store';

const getBlobUrl = async (url) => {
  console.log('generating blob url...');
  if (store.state.gallery.blobCache[url]) {
    console.log('blob url already cached!');
    return store.state.gallery.blobCache[url];
  }

  const { VUE_APP_B64_URL } = process.env;
  const b64 = await unfetch(VUE_APP_B64_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url })
  })
    .then(r => r.json())
    .then(r => JSON.parse(r.body));

  const contentType = 'image/png';
  const blob = b64toBlob(b64, contentType);
  const blobUrl = URL.createObjectURL(blob);

  console.log('blob url generated!');
  store.commit('gallery/setBlobCache', { url, blobUrl });
  return blobUrl;
}

const loadImage = src => {
  return new Promise((resolve, reject) => {
    getBlobUrl(src).then(blobUrl => {
      const image = new Image;
      image.crossOrigin = 'Anonymous';
      image.addEventListener('load', () => {
        resolve(image);
      });
      image.addEventListener('error', reject);
      image.src = blobUrl;
    })
  });
}

export const canvasRender = async (options) => {
  console.log('preview using canvasRender')
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const base = await loadImage(options.template.base);

  canvas.width = base.naturalWidth;
  canvas.height = base.naturalHeight;

  for (const i in options.template.sources) {
    const model = options.template.sources[i];

    const validCoord = {
      x1: Math.min(model.compose.start[0], model.compose.end[0]),
      y1: Math.min(model.compose.start[1], model.compose.end[1]),
      x2: Math.max(model.compose.start[0], model.compose.end[0]),
      y2: Math.max(model.compose.start[1], model.compose.end[1]),
    }
    const width = validCoord.x2 - validCoord.x1;
    const height = validCoord.y2 - validCoord.y1;

    const source = options.sources[i];
    if (source) {
      ctx.drawImage(await loadImage(source), validCoord.x1, validCoord.y1, width, height);
    } else {
      ctx.fillStyle = 'white';
      ctx.fillRect(validCoord.x1, validCoord.y1, width, height);
    }
  }

  ctx.drawImage(base, 0, 0);

  return new Promise(resolve => {
    canvas.toBlob((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      resolve(blobUrl);
    }, 'image/jpeg');
  });
}

export const serverRender = async (options) => {
  options.sources = options.sources.map(i => {
    if(!i) return [1, 1, '#FFFF'];
    return i;
  });

  return unfetch(process.env.VUE_APP_GENERATOR_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ options })
  })
    .then(res => res.json())
    .then(res => res.body)
}