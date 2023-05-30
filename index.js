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

  /* MENU CLICK EVENT START */
  let signUpMenuBtn = document.querySelector("div.menu_wrap a.sign_up");
  signUpMenuBtn.addEventListener("click", function () {
    console.log("signUpMenuBtn CLICKED!!");

    //signUpMenuBtn을 했을 때 회원가입 창 나오게 하는 것
    showSelectedView(SIGN_UP_VIEW);
  });

  let signInMenuBtn = document.querySelector("div.menu_wrap a.sign_in");
  signInMenuBtn.addEventListener("click", function () {
    console.log("signInMenuBtn CLICKED!!");

    //signInMenuBtn 했을 때  창 나오게 하는 것
    showSelectedView(SIGN_IN_VIEW);
  });

  let signOutMenuBtn = document.querySelector("div.menu_wrap a.sign_out");
  signOutMenuBtn.addEventListener("click", function () {
    console.log("signOutMenuBtn CLICKED!!");

    signInedMemberId = "";
    // signout을 하면 로그인 정보 날려야 함
    //menuChange.js파일 생성 -> signout 하면 signin과 singup나오게끔
    setMenuStatus(SIGN_OUT_STATUS);

    //signOutMenuBtn 했을 때 창 나오게 하는 것
    showSelectedView(SIGN_OUT_VIEW);
  });

  let writeMenuBtn = document.querySelector("div.menu_wrap a.write");
  writeMenuBtn.addEventListener("click", function () {
    console.log("writeMenuBtn CLICKED!!");

    // 로그인 안하고 write창 갈 수 없도록 로그인 유무 체크
    if (signInedMemberId === "") {
      alert("PLEASE SIGN IN!");
      // 로그인 되어 있지 않으면 로그인 창 뜨도록 함
      showSelectedView(SIGN_IN_VIEW);
      return; //로그인 창 보내고 if문 종료하기 위함
    }
    // 로그인이 되어 있으면 글 쓰기 창으로 가기
    showSelectedView(DIARY_WRITE_VIEW);
  });

  let listMenuBtn = document.querySelector("div.menu_wrap a.list");
  listMenuBtn.addEventListener("click", function () {
    console.log("listMenuBtn CLICKED!!");

    if (signInedMemberId === "") {
      alert("PLEASE SIGN IN!");
      // 로그인 되어 있지 않으면 로그인 창 뜨도록 함
      showSelectedView(SIGN_IN_VIEW);
      return; //로그인 창 보내고 if문 종료하기 위함
    }

    // 화면에 띄워주기 전에 데이터 먼저 가져옴
    listupDiaries();
    // 화면에 띄움
    showSelectedView(DIARY_LIST_VIEW);
  });
  /* MENU CLICK EVENT END */

  /* FUNCTION CLICK EVENT START */
  // 회원가입 버튼 클릭 시 이벤트
  let signUpBtn = document.querySelector(
    'div.sign_up_wrap input[type="button"]'
  );
  signUpBtn.addEventListener("click", function () {
    console.log("signUpBtn CALLED!!");

    // 회원가입하면 id, pw, mail 들고 옴
    let u_id = document.querySelector(
      'div.sign_up_wrap input[name="u_id"]'
    ).value;
    let u_pw = document.querySelector(
      'div.sign_up_wrap input[name="u_pw"]'
    ).value;
    let u_mail = document.querySelector(
      'div.sign_up_wrap input[name="u_mail"]'
    ).value;

    // db에서 들고옴
    addMember(u_id, u_pw, u_mail);

    alert("SIGN UP SUCCESS!!");

    // id pw mail 비워주기
    document.querySelector('div.sign_up_wrap input[name="u_id"]').value = "";
    document.querySelector('div.sign_up_wrap input[name="u_pw"]').value = "";
    document.querySelector('div.sign_up_wrap input[name="u_mail"]').value = "";
  });

  let signInBtn = document.querySelector(
    'div.sign_in_wrap input[type="button"]'
  );
  signInBtn.addEventListener("click", function () {
    console.log("addEventListener CALLED!!");

    //로그인 하기 위한 id pw 입력
    let u_id = document.querySelector(
      'div.sign_in_wrap input[name="u_id"]'
    ).value;
    let u_pw = document.querySelector(
      'div.sign_in_wrap input[name="u_pw"]'
    ).value;

    // id, pw 유효성 검사
    let isMember = searchMember(u_id, u_pw);
    if (isMember) {
      alert("SIGN IN SUCCESS!!");

      // 현재 로그인한 아이디로 바꿔주는 작업
      signInedMemberId = u_id;

      // 메뉴화면 바꿔줌
      setMenuStatus(SIGN_IN_STATUS);

      // 전의 것 모두 청소
      listupDiaries();

      // 화면 바꾸는 작업 => list로 보내기
      showSelectedView(DIARY_LIST_VIEW);
    } else {
      alert("SIGN IN FAIL!!");

      // 실패시 값 비워주는 작업
      signInedMemberId = "";
    }

    // 성공를 하든 실패를 하든 값 날려줘야 함
    document.querySelector('div.sign_in_wrap input[name="u_id"]').value = "";
    document.querySelector('div.sign_in_wrap input[name="u_pw"]').value = "";
  });

  let writeBtn = document.querySelector("div.write_wrap button");
  writeBtn.addEventListener("click", function () {
    console.log("writeBtn CALLED!!");

    // 버튼 클릭 시 input에 적은 내용이 list로 가게 해야하므로 값을 들고옴
    // utils.js 파일 생성 -> 날짜 계속 뜨게 하기 위해
    let txt =
      getCurrentDateTime() +
      document.querySelector("div.write_wrap input").value;
    addDiary(txt);

    // 새로운 일기 등록되었으므로 그전의 일기 지워줌
    document.querySelector("div.write_wrap input").value = "";

    // 화면 전환
    listupDiaries();
    showSelectedView(DIARY_LIST_VIEW);
  });
  /* FUNCTION CLICK EVENT END */
};

const listupDiaries = () => {
  console.log("listupDiary CALLED!!");

  // 기존의 데이터 정보 다 날림(현재 조회한 사람의 데이터 넣어야 하므로)
  listWrap.textContent = "";
  let diaryArr = searchDiaries();
  for (let i = 0; i < diaryArr.length; i++) {
    console.log(diaryArr[i]);

    let tpl = document.querySelector("#list_item");
    // true => 자식 태그까지, false => 엄마만
    let clone = document.importNode(tpl.content, true);
    let txt = clone.querySelector("div.txt");

    txt.textContent = diaryArr[i];

    //가장 최신글이 위로 올라옴(appendChild는 최신 글 밑으로 감)
    listWrap.prepend(clone);
  }
};
