console.log("This is a popup!");
const convertBtn = document.getElementById("convertBtn");

convertBtn.addEventListener("click", (event) => {
  const inputText = document.getElementById("inputText").value;
  console.log("입력된 값: ", inputText);
  chrome.runtime.sendMessage({ message: inputText }, (response) => {
    console.log(
      "background로부터 온 response:",
      response.data,
      "res의 type: ",
      typeof response.data
    );
    document.getElementById("resultText").innerText = response.data;
    console.log("완료");
  });
});
