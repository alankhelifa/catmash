import Dexie from 'dexie';
import { Cat } from 'types/cat';

class CatMashDatabase extends Dexie {
  cats: Dexie.Table<Cat, number>;

  constructor() {
    super('CatMashDB');
    this.version(1).stores({
      cats: '++id, image, currentElo, *eloEvolution',
    });
    this.cats = this.table('cats');
  }
}

export default new CatMashDatabase();
