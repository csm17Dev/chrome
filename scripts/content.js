/**
 * paste 이벤트 감지 & background에 메세지전송 & response 받고 clipboard paste data 바꾸기
 */
document.addEventListener("paste", (event) => {
  const pasteObj = event.clipboardData.getData("text");
  console.log("복사한 값: ", pasteObj);
  chrome.runtime.sendMessage({ message: pasteObj }, (res) => {
    console.log("background로부터 온 response:", res);
  });
});
