const memberDB = new Map();
const diaryDB = new Map();

/* MEMBER DB START */
// 새ㄹ운 회원이 들어올 때마다 db로 추가
// API SERVER..?
// 덩치가 커지만 mvc에서 들어내서 하나의 물리적인 서버를 가짐
const addMember = (id, pw, mail) => {
  console.log("addMember() CALLED!!");

  //회원가입
  memberDB.set(id, {
    u_id: id,
    u_pw: pw,
    u_mail: mail,
  });
  //회원가입한 멤버가 다이어리 쓸 수 있도록 함
  //"오늘 날씨 좋다!!"같은 글 여러 개 배열로 묶음
  diaryDB.set(id, []);

  console.log(memberDB.get(id));
};

const searchMember = (id, pw) => {
  console.log("searchMember() CALLED!!");
  let memObj = memberDB.get(id);
  // id를 가져오면 pw와 동일한지 확인해야 하므로 pw확인을ㅇ ㅟ함
  if (memObj !== undefined && memObj.u_pw === pw) {
    console.log("SIGN In SUCCESS!!");
    return true;
  }
  console.log("SIGN In FAIL!!");
  return false;
};
/* MEMBER DB END */

/* DIARY DB START */
const addDiary = (text) => {
  console.log("addDiary() CALLED!!");

  // 하기 전에 singinsession.js 생성
  // 로그인 한 사람들의 diaryDB정보 들고 오기 위함
  let diaryArr = diaryDB.get(signInedMemberId);
  diaryArr.push(txt);

  console.log("diartArr: ", diaryArr);
};

const searchDiary = () => {
  console.log("searchDiary() CALLED!!");

  let diaryArr = diaryDB.get(signInedMemberId);
  console.log("diartArr: ", diaryArr);

  return diaryArr;
};

/* DIARY DB END */
