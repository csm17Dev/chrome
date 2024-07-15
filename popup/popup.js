console.log("This is a popup!");
const convertBtn = document.getElementById("convertBtn");
const copyBtn = document.getElementById("copyBtn");

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
