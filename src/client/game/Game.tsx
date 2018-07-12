import axios from 'axios';

class Game {
  selected: object;
  unpicked: object;
  picked: object;
  all: object;
  round: number;
  level: number;
  onProgress: any;
  gameOver: any;

  constructor(onProgress, gameOver) {
    this.selected = {};
    this.round = 1;
    this.level = 0;
    this.unpicked = {};
    this.picked = {};
    this.all = {};
    this.onProgress = onProgress;
    this.gameOver = gameOver;
  }

  startGame = (): void => this._onLevel();

  getSelected = (): object[] => (
    Object.keys(this.selected).map(id => (
      { id, url: this.selected[id] }
    ))
  )

  onClick = (event): void => {
    const { id } = event.target;
    if (id in this.picked) {
      this._gameOver();
    } else {
      this.picked[id] = this.all[id];
      delete this.unpicked[id];
      (this.round < 20 ? this._onRound : this._onLevel)();
    }
  }

  _gameOver = () => {
    this.level = 0;
    this.unpicked = {};
    this.gameOver();
  }

  _onLevel = (): void => {
    this.level += 1;
    this.round = 0;
    this._getGifs()
     .then(() => this._onRound());
  }

  _onRound = (): void => {
    this.round += 1;
    this._selectGifs;
    this.onProgress({
      selected: this.selected,
      round: this.round,
      level: this.level,
    });
  }

  _selectGifs = (): void => {
    const selected: object = {};
    let i: number = 0;
    let fulfilled: boolean = false;
    const tempAllKeys = Object.keys(this.all);
    const unpickedKeys = Object.keys(this.unpicked);
    while (i < 4) {
      console.log('picking:', i);
      if (i < 3 || fulfilled) {
        const randInt: number = this._randomIndex(tempAllKeys.length);
        const randKey: string = tempAllKeys.splice(randInt, 1).join('');
        selected[randKey] = this.all[randKey];
        if (randKey in this.unpicked && !fulfilled) {
          fulfilled = true;
        }
        i += 1;
      } else {
        const randInt: number = this._randomIndex(unpickedKeys.length);
        const randKey: string = unpickedKeys.splice(randInt, 1).join('');
        if (!(randKey in selected)) {
          selected[randKey] = this.all[randKey];
          i += 1;
        }
      }
    }
    this.selected = selected;
  }

  _randomIndex = (limit: number): number => {
    return Math.round(Math.random() * limit);
  }

  _createGifs = (giphyResponse: any): void => {
    giphyResponse.forEach((gif: any) => {
      const id = gif.id;
      const url = gif.images.original.url;
      this.unpicked[id] = url;
    });
    this.all = { ...this.unpicked };
  }

  _getGifs = (): Promise<void> => {
    return new Promise(resolve => axios.get(this._giphyUrl())
      .then((res) => {
        resolve(this._createGifs(res.data.data));
      })
      .catch((err) => {
        throw new Error(err);
      }),
    );
  }

  _giphyUrl = (): string => (
    `http://api.giphy.com/v1/unpicked/trending`
    + `?api_key=8RyL5yKVPUkiFr9On6gOTfeW60B0PnRs&offset=${this.level - 1}`
  )
}
export default Game;
