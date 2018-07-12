const axios = require('axios');
const { GifFrame, GifCodec, GifUtil, BitmapImage } = require('gifwrap');
const Jimp: any = require('jimp');

const codec = new GifCodec;

require('dotenv').config({
  path: '../../../../.env',
});

class GifGetter {
  res: any;
  base: string;
  constructor(res: any) {
    this.res = res;
    const key: string = process.env.GIPHY_KEY;
    this.base = `http://api.giphy.com/v1/gifs/search?api_key=${key}`;
  }

  getGifs = (category: string = 'cats'): Promise<any>  => {
    return new Promise((resolve: any) => (
      axios.get(`${this.base}&q=${category}&limit=20`)
        .then(res => resolve(
          res.data.data.forEach((gif) => {
            this._resize(gif.images.original.url)
              .then(newGif => console.log(newGif));
          }),
        ),
      ).catch((err) => { throw err; })
    ));
  }

  // private methods

  _resize = async (gifUrl: string): Promise<any> => {
    const res = await axios.get(gifUrl, { responseType: 'arraybuffer' });
    return await this._manipulateFrames(res.data);
  }

  _cropFrame = (dimension: number, frame: any): void => {
    const jInstance: any = new Jimp(1, 1, 0);
    jInstance.bitmap = frame.bitmap;
    jInstance.cover(
      dimension,
      dimension,
      Jimp.HORIZONTAL_ALIGN_CENTER,
      Jimp.VERTICAL_ALIGN_TOP,
    );
    return new GifFrame(jInstance.bitmap);
    // return new GifFrame()
    // console.log(frame.bitmap);
  }

  _manipulateFrames = async (buffer: ArrayBuffer): Promise<any> => {
    // read array buffer into gif obj, loop through frames and apply _cropFrame
    let gif;
    try {
      gif = await codec.decodeGif(buffer);
    } catch (err) {
      console.log(err);
    }

    const frames = gif.frames.map((frame) => {
      const { width, height } = frame.bitmap;
      return this._cropFrame((width <= height ? width : height), frame);
    });
    codec.encodeGif(frames)
      .then(() => console.log('hi'));
  }
}

const test = new GifGetter(null);
test.getGifs()
  .then((data: any): void => console.log(data))
  .catch((err: any): any => console.log(err));
