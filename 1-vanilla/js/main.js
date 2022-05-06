import Controller from "./Controller.js";
import Store from "./store.js";
import storage from "./storage.js";

const tag = '[main]'
// DOM이 로딩완료됐을떄 main함수를 호출한다.
document.addEventListener("DOMContentLoaded", main);

function main() {
  console.log(tag)

  // storage객체를통해서 store를 생성
  const store = new Store(storage);

  const views = {
    // TODO
  };

  // MVC 객체들을 초기화해주는작업
  new Controller(store, views);
}
