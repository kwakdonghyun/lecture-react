import { emit, on } from "../helpers.js";

const tag = "[View]";

export default class View {
  constructor(element) {
    if (!element) throw "no element"; // 없으면 exception던지고 있으면 내부변수로 넣는다.
    this.element = element;
    this.originalDisplay = this.element.style.dispaly || "";

    return this;
  }

  hide() {
    this.element.style.display = "none";
    return this;
  }

  show() {
    this.element.style.display = this.originalDisplay; // 원래값으로 복구할때 쓴다
    return this;
  }

 // 사용자와 인터렉션 이벤트를 수신하고있는 메소드
  on(eventName, handler) {
    // element에 eventName의 이벤트가 실행하면 handler를 실행해라.
    on(this.element, eventName, handler); 
    return this;
  }

  // 이벤트 발행 
  emit(eventName, data) {
    emit(this.element, eventName, data);
    return this;
  }
}
