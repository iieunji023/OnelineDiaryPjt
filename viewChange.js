/* [index.js]의 const initViews에 넣으면 지역 변수이므로 사용하기 위해 반복적으로 써야함.
따라서 따로 빼줘서 전역변수로 바꿔줘야 함*/

// const initViews = () => {
//     console.log("initViews() CALLED!!");

//     let signUpWrap = document.querySelector("div.sign_up_wrap");
//     let signInWrap = document.querySelector("div.sign_in_wrap");
//     let writeWrap = document.querySelector("div.write_wrap");
//     let listWrap = document.querySelector("div.list_wrap");
//   };

//3
const SIGN_UP_VIEW = 1;
const SIGN_IN_VIEW = 2;
const SIGN_OUT_VIEW = 3;
const DIARY_WRITE_VIEW = 4;
const DIARY_LIST_VIEW = 5;

//2
let signUpWrap = "";
let signInWrap = "";
let writeWrap = "";
let listWrap = "";

//1
const initViews = () => {
  console.log("initViews() CALLED!!");

  signUpWrap = document.querySelector("div.sign_up_wrap");
  signInWrap = document.querySelector("div.sign_in_wrap");
  writeWrap = document.querySelector("div.write_wrap");
  listWrap = document.querySelector("div.list_wrap");
};

//4
// 선택된 뷰만 보이게 하기 위해
const showSelectedView = (viewNO) => {
  console.log("showSelectedView() CALLED!!");
  switch (viewNO) {
    //SIGN_UP_VIEW일 때 signUpWrap만 보여라
    case SIGN_UP_VIEW:
      signUpWrap.style.display = "block";
      signInWrap.style.display = "none";
      writeWrap.style.display = "none";
      listWrap.style.display = "none";
      break;

    case SIGN_IN_VIEW:
      signUpWrap.style.display = "none";
      signInWrap.style.display = "block";
      writeWrap.style.display = "none";
      listWrap.style.display = "none";
      break;

    //logout했을 시 , 모두 안보이거나 로그인 화면 창 띄우면 됨
    case SIGN_OUT_VIEW:
      signUpWrap.style.display = "none";
      signInWrap.style.display = "block";
      writeWrap.style.display = "none";
      listWrap.style.display = "none";
      break;

    case DIARY_WRITE_VIEW:
      signUpWrap.style.display = "none";
      signInWrap.style.display = "none";
      writeWrap.style.display = "block";
      listWrap.style.display = "none";
      break;

    case DIARY_LIST_VIEW:
      signUpWrap.style.display = "none";
      signInWrap.style.display = "none";
      writeWrap.style.display = "none";
      listWrap.style.display = "block";
      break;
  }
};
