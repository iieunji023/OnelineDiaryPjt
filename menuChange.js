const SIGN_OUT_STATUS = 1;
const SIGN_IN_STATUS = 2;

const setMenuStatus = (menuNO) => {
  console.log("setMenuStatus CALLED!!");

  //menuNO out , in이냐를 받음
  switch (menuNO) {
    // 로그아웃을 하면 sing_up, in 보이고, out 안보이게
    case SIGN_OUT_STATUS:
      document.querySelector("div.menu_wrap a.sign_up").style.display =
        "inline-block";
      document.querySelector("div.menu_wrap a.sign_in").style.display =
        "inline-block";
      document.querySelector("div.menu_wrap a.sign_out").style.display = "none";
      break;

    // 로그인하면 out창만 보여라
    case SIGN_IN_STATUS:
      document.querySelector("div.menu_wrap a.sign_up").style.display = "none";
      document.querySelector("div.menu_wrap a.sign_in").style.display = "none";
      document.querySelector("div.menu_wrap a.sign_out").style.display =
        "inline-block";
      break;
  }
};
