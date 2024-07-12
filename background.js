/**
 * content script에서 paste data 받아오고 유저정보와 함꼐 서버 api 요청
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("sender:", sender, "content paste 값: ", message);
  console.log("message type:", typeof message);
  let userEmail = "";
  // 비동기 function
  chrome.identity.getProfileUserInfo((userInfo) => {
    console.log("유저 email: ", userInfo.email);
    userEmail = userInfo.email;
  });
  /* 서버 api 요청 및 content script에게 전달 */
  getConvertedData(message, userEmail)
    .then((res) => {
      console.log("변환된 데이터:", res);
      sendResponse({ data: res });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
  return true; // 비동기적으로 동작하기 때문에 true 반환해야 response 전달
});

/**
 * 서버 api call - 추후 user email 값도 같이 넣어서 보내기
 */

async function getConvertedData(message, userEmail) {
  const response = await fetch("https://api.csmcat.kr/v", {
    method: "GET",
    mode: "cors",
  });
  const convertedData = await response.text();
  return convertedData;
}
