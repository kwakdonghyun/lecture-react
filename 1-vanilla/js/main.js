import Controller from "./Controller.js";
import Store from "./store.js";
import storage from "./storage.js";
import SearchFormView from "./views/SearchFormView.js";
import SearchResultView from "./views/SearchResultView.js";
import TabView from "./views/TabView.js";
import KeywordListView from "./views/KeywordListView.js";
import HistoryListView from "./views/HistoryListView.js";

const tag = "[main]";

const tag = '[main]'
// DOM이 로딩완료됐을떄 main함수를 호출한다.
document.addEventListener("DOMContentLoaded", main);

function main() {
<<<<<<< HEAD
  console.log(tag, "main");

=======
  console.log(tag)

  // storage객체를통해서 store를 생성
>>>>>>> 027c3ed2c8ba3b3ef59527df7df1619c7740df22
  const store = new Store(storage);

  const views = {
    searchFormView: new SearchFormView(),
    searchResultView: new SearchResultView(),
    tabView: new TabView(),
    keywordListView: new KeywordListView(),
    historyListView: new HistoryListView(),
  };

  // MVC 객체들을 초기화해주는작업
  new Controller(store, views);
}
