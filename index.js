document.addEventListener("DOMContentLoaded", function () {
  console.log("DOCUMENT READY!!");

  init();
});

const init = () => {
  console.log("init() CALLED!!");

  //화면 초기화(처음에 안보이는 부분 가리기)
  initViews();
  //이벤트 실행
  addEvents();
};

const addEvents = () => {
  console.log("addEvents() CALLED!!");
};
