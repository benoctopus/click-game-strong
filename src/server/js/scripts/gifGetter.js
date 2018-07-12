var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const axios = require('axios');
const { GifFrame, GifCodec, GifUtil, BitmapImage } = require('gifwrap');
const Jimp = require('jimp');
const codec = new GifCodec;
require('dotenv').config({
    path: '../../../../.env',
});
class GifGetter {
    constructor(res) {
        this.getGifs = (category = 'cats') => {
            return new Promise((resolve) => (axios.get(`${this.base}&q=${category}&limit=20`)
                .then(res => resolve(res.data.data.forEach((gif) => {
                this._resize(gif.images.original.url)
                    .then(newGif => console.log(newGif));
            }))).catch((err) => { throw err; })));
        };
        // private methods
        this._resize = (gifUrl) => __awaiter(this, void 0, void 0, function* () {
            const res = yield axios.get(gifUrl, { responseType: 'arraybuffer' });
            return yield this._manipulateFrames(res.data);
        });
        this._cropFrame = (dimension, frame) => {
            const jInstance = new Jimp(1, 1, 0);
            jInstance.bitmap = frame.bitmap;
            jInstance.cover(dimension, dimension, Jimp.HORIZONTAL_ALIGN_CENTER, Jimp.VERTICAL_ALIGN_TOP);
            return new GifFrame(jInstance.bitmap);
            // return new GifFrame()
            // console.log(frame.bitmap);
        };
        this._manipulateFrames = (buffer) => __awaiter(this, void 0, void 0, function* () {
            // read array buffer into gif obj, loop through frames and apply _cropFrame
            let gif;
            try {
                gif = yield codec.decodeGif(buffer);
            }
            catch (err) {
                console.log(err);
            }
            const frames = gif.frames.map((frame) => {
                const { width, height } = frame.bitmap;
                return this._cropFrame((width <= height ? width : height), frame);
            });
            codec.encodeGif(frames)
                .then(() => console.log('hi'));
        });
        this.res = res;
        const key = process.env.GIPHY_KEY;
        this.base = `http://api.giphy.com/v1/gifs/search?api_key=${key}`;
    }
}
const test = new GifGetter(null);
test.getGifs()
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
