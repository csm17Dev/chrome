/**
 * 전제 ) 브라우저에서 paste 진행한다고 가정
 * paste 이벤트 감지 & background에 메세지전송 & response 받고 clipboard paste data 바꾸기
 */

document.addEventListener("paste", (event) => {
  const copyObj = event.clipboardData.getData("text");
  console.log("복사한 값: ", copyObj);
  let convertedData = "";
  chrome.runtime.sendMessage({ message: copyObj }, (response) => {
    console.log(
      "background로부터 온 response:",
      response.data,
      "res의 type: ",
      typeof response.data
    );
    convertedData = response.data;
    // 원래 이벤트를 막고 직접 삽입
    event.preventDefault();

    // 커서 위치에 변환된 텍스트 삽입
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();

    const textNode = document.createTextNode(convertedData);
    range.insertNode(textNode);

    // 새로 삽입된 텍스트 뒤로 커서 위치 이동
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
    console.log("완료");
  });
  /**
   * clipboard paste data 바꾸기
   */

  // navigator.clipboard
  //   .writeText(convertedData)
  //   .then(() => {
  //     console.log("clipboard에 변경된 데이터 넣기 완료");
  //   })
  //   .catch((err) => {
  //     console.log("붙여넣기 진행 중 오류 발생");
  //   });
});
