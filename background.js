/**
 * content script에서 paste data 받아오고 유저정보와 함꼐 서버 api 요청
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("content paste 값: ", message);
  chrome.identity.getProfileUserInfo((userInfo) => {
    console.log("유저 email: ", userInfo.email);
    const userEmail = userInfo.email;
  });
  /* 서버 api 요청 & content script에게 전달 */
});

async function getConvertedData() {
  const convertRes = await fetch("https://어쩌구저쩌구", {
    method: "GET",
    mode: "cors",
  });
  const convertedData = await res.json();
}
