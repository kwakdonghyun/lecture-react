const tag = "[store]";

export default class Store {
  constructor(storage) {
    console.log(tag)

    if (!storage) throw "no storage"; // 없으면 exception 던지고 있으면 내부변수로 저장하고있다.

    this.storage = storage; 
  }
}
