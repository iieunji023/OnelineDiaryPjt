let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const getCurrentDateTime = () => {
  console.log("getCurrentDateTime CALLED!!");

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1; //0: 1월, 1: 2월...
  let date = today.getDate();
  let day = today.getDay(); // 0: 일요일

  return `[${year}/${month}/${date}/ ${days[day]}]`;
};

// 개발단계(true), 배포단계(false)
// const consoleFlag = true;
// if (consoleFlag) {
//   console = {};
//   console.log = function () {};
//   console.warn = function () {};
//   console.error = function () {};
//   console.info = function () {};
// }
