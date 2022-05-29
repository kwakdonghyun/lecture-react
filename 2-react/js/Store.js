import { createNextId } from "./helpers.js";
import storage from "./storage.js";

const tag = "[Store]";

class Store {
  constructor(storage) {
    console.log(tag, "constructor");

    if (!storage) throw "no storage";

    this.storage = storage;

  }

  search(keyword) {
    this.addHistory(keyword);
    return this.storage.productData.filter((product) =>
      product.name.includes(keyword) // product의 이름과 keyword가 일치하는게있는지 찾느다.

    );
  }

  getKeywordList() {
    return this.storage.keywordData;
  }

  getHistoryList() {
    return this.storage.historyData.sort(this._sortHistory); // 날짜의 역순으로 
  }

  _sortHistory(history1, history2) {
    return history2.date > history1.date; // boolean 반환
  }

  removeHistory(keyword) {
    this.storage.historyData = this.storage.historyData.filter(
      (history) => history.keyword !== keyword
    );
  }

  addHistory(keyword = "") {
    keyword = keyword.trim();
    if (!keyword) {
      return;
    }
    // historyData 배열돌면서 some함수로 체크 현재 keyword가 있으면 삭제
    const hasHistory = this.storage.historyData.some(
      (history) => history.keyword === keyword
    );
    if (hasHistory) this.removeHistory(keyword);

    const id = createNextId(this.storage.historyData)
    // 새로운날짜
    const date = new Date();
    this.storage.historyData.push({ id, keyword, date });
    this.storage.historyData = this.storage.historyData.sort(this._sortHistory);
  }
}

const store = new Store(storage)
export default store
