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

/**
 * toolbar icon 클릭하면 side panel 열 수 있게 함
 */
// chrome.sidePanel
//   .setPanelBehavior({ openPanelOnActionClick: true })
//   .catch((error) => console.error(error));

/**
 * 컨텍스트 메뉴에 측면 패널 열기 추가
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openSidePanel",
    title: "Latex로 변환하기",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openSidePanel") {
    // This will open the panel in all the pages on the current window.
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});
