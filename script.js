console.log("This is a side panel!");
const convertBtn = document.getElementById("convertBtn");
const copyBtn = document.getElementById("copyBtn");

/**
 * 변환 버튼 event 핸들러
 */
convertBtn.addEventListener("click", (event) => {
  const inputText = document.getElementById("inputText").value;
  console.log("입력된 값: ", inputText);
  // 비동기 function
  let userEmail = "";
  chrome.identity.getProfileUserInfo((userInfo) => {
    console.log("유저 email: ", userInfo.email);
    userEmail = userInfo.email;
  });
  /* 서버 api 요청 및 content script에게 전달 */
  getConvertedData(inputText, userEmail)
    .then((res) => {
      console.log("변환된 데이터:", res, "데이터 타입", typeof res);
      document.getElementById("resultText").innerText = res;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});

/**
 * 서버 api call - 추후 user email 값도 같이 넣어서 보내기
 */
async function getConvertedData(inputText, userEmail) {
  const response = await fetch("https://api.csmcat.kr/v", {
    method: "GET",
    mode: "cors",
  });
  const convertedData = await response.text();
  return convertedData;
}

/**
 * 복사 버튼 event 핸들러
 */
copyBtn.addEventListener("click", (event) =>
  writeClipboardText(document.getElementById("resultText").innerText)
);

async function writeClipboardText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error(error.message);
  }
  alert("복사 완료");
}
