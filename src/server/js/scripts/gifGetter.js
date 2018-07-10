var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// #script to help get images from giphy
const axios = require('axios');
// const jimp = require('jimp');
const { GifFrame, GifCodec, GifUtil, BitmapImage } = require('gifwrap');
const codec = new GifCodec;
console.log(GifFrame, GifUtil);
require('dotenv').config({
    path: '../../../../.env',
});
class GifGetter {
    constructor(res) {
        this.resize = (gifUrl) => __awaiter(this, void 0, void 0, function* () {
            const res = yield axios.get(gifUrl, { responseType: 'arraybuffer' });
            return yield this.manipulateFrames(res.data);
        });
        this.cropFrame = (dimension, frame) => {
            const bm = new BitmapImage(frame.bitmap);
            console.log(bm);
            bm.reframe(0, 0, dimension, dimension);
            console.log(bm);
            return bm;
        };
        this.manipulateFrames = (buffer) => __awaiter(this, void 0, void 0, function* () {
            let oldGif;
            try {
                oldGif = yield codec.decodeGif(buffer);
            }
            catch (err) {
                console.log(err);
            }
            // const newGif =
            oldGif.frames.map((frame) => {
                const { width, height } = frame.bitmap;
                return this.cropFrame((width <= height ? width : height), frame);
            });
        });
        this.getGifs = (category = 'cats') => {
            // closure(?) so that the gc doesn't destroy the url var every sweep
            return new Promise((resolve) => (axios.get(`${this.base}&q=${category}&limit=20`)
                .then(res => resolve(res.data.data.map((gif) => {
                this.resize(gif.images.original.url)
                    .then(() => console.log());
            }))).catch((err) => { throw err; })));
        };
        this.res = res;
        const key = process.env.GIPHY_KEY;
        this.base = `http://api.giphy.com/v1/gifs/search?api_key=${key}`;
    }
}
const test = new GifGetter(null);
test.getGifs()
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
