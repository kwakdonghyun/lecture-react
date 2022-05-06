// helper함수는 DOM API를 매핑해둔것 쉽게쓰려고


// selector문자열을받고 옵션으로 scope 찾을 root element를받는다.
export function qs(selector, scope = document) {
  if (!selector) throw "no selector";

  return scope.querySelector(selector);
}

export function qsAll(selector, scope = document) {
  if (!selector) throw "no selector";

  // element를 (유사배열로)여러개반환하기때문에 다루기쉽게하려고 
  // Array.from으로 자바스크립트 array로 변환함.
  return Array.from(scope.querySelectorAll(selector));
}

// 
export function on(target, eventName, handler) {
  // target element에서 eventName을 수신하고 이벤트가 발행되면 handler함수를 호출한다.
  target.addEventListener(eventName, handler);
}

export function delegate(target, eventName, selector, handler) {
  const emitEvent = (event) => {
    // 후보element들을 다찾는다.
    const potentialElements = qsAll(selector, target);

    // 순회하면서 event의 target과 같은지(event를 발생시킨것과 같은지)
    for (const potentialElement of potentialElements) {
      if (potentialElement === event.target) {
        return handler.call(event.target, event); // 핸들러함수호출
      }
    }
  };

  // target element에서 eventName을 수신하는데 핸들러를 따로 emitEvent로 매핑해두었다.
  on(target, eventName, emitEvent);
}

// 발행할때
export function emit(target, evedntName, detail) {
  const event = new CustomEvent(eventName, { detail });
  // CustomEvent를 발행할수있게
  target.dispatchEvent(event);
}

export function formatRelativeDate(date = new Date()) {
  const TEN_SECOND = 10 * 1000;
  const A_MINUTE = 60 * 1000;
  const A_HOUR = 60 * A_MINUTE;
  const A_DAY = 24 * A_HOUR;

  const diff = new Date() - date;

  if (diff < TEN_SECOND) return `방금 전`;
  if (diff < A_MINUTE) return `${Math.floor(diff / 1000)}초 전`;
  if (diff < A_HOUR) return `${Math.floor(diff / 1000 / 60)}분 전`;
  if (diff < A_DAY) return `${Math.floor(diff / 1000 / 60 / 24)}시간 전`;
  return date.toLocaleString("ko-KR", {
    hour12: false,
    dateStyle: "medium",
  });
}

// 과거날짜를 얻을때
export function createPastDate(date = 1, now = new Date()) {
  if (date < 1) throw "date는 1 이상입니다";

  const yesterday = new Date(now.setDate(now.getDate() - 1));
  if (date === 1) return yesterday;

  return createPastDate(date - 1, yesterday);
}

// 하나씩 숫자올려가며 id만드는함수
export function createNextId(list = []) {
  return Math.max(...list.map((item) => item.id)) + 1;
}
