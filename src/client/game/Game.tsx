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
    this.all = {};
    this.onProgress = onProgress;
    this.gameOver = gameOver;
  }

  startGame = (): void => this._onLevel();

  getSelected = (): any[] => (
    Object.keys(this.selected).map((id) => {
      if (!this.selected[id]) {
        throw new Error('umm no');
      }
      return { id, url: this.selected[id] };
    })
  )

  onClick = (id): void => {
    if (!(id in this.unpicked)) {
      this._gameOver();
    } else {
      delete this.unpicked[id];
      (this.round < 15 ? this._onRound : this._onLevel)();
    }
  }

  outOfTime = ():void => this._gameOver();

  _gameOver = (): void => {
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
    this._selectGifs();
    this.onProgress({
      selected: this.selected,
      round: this.round,
      level: this.level,
    });
  }

  _selectGifs = (): void => {
    const selected: object = {};
    let i: number = 0;
    let j: number = 0;
    let fulfilled: boolean = false;
    const tempAllKeys = Object.keys(this.all);
    const unpickedKeys = Object.keys(this.unpicked);
    while (i < 4) {
      if (i < 3 || fulfilled) {
        const randInt: number = this._randomIndex(tempAllKeys.length);
        const randKey: string = tempAllKeys.splice(randInt, 1).join('');
        if (!this.all[randKey]) {
          continue;
        }
        selected[randKey] = this.all[randKey];
        if (randKey in this.unpicked && !fulfilled) {
          fulfilled = true;
        }
        i += 1;
      } else {
        const randInt: number = this._randomIndex(unpickedKeys.length);
        const randKey: string = unpickedKeys.splice(randInt, 1).join('');
        if (!(randKey in selected)) {
          selected[randKey] = this.unpicked[randKey];
          i += 1;
        }
      }
      if (j > 100) throw new Error('failed to select gifs');
      j += 1;
    }
    this.selected = selected;
  }

  _randomIndex = (limit: number): number => {
    return Math.round(Math.random() * limit);
  }

  _createGifs = (giphyResponse: any): void => {
    giphyResponse.forEach((gif: any) => {
      if (!gif.images.fixed_height.url) {
        return;
      }
      const id = gif.id;
      const url = gif.images.fixed_height.url;
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
    `http://api.giphy.com/v1/gifs/trending`
    + `?api_key=8RyL5yKVPUkiFr9On6gOTfeW60B0PnRs&offset=${this.level * 25}`
  )
}
export default Game;
