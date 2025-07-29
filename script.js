document.getElementById("imageUpload").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("imagePreview").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

function processJson() {
  const rawText = document.getElementById("jsonInput").value;

  let parsed;
  try {
    const parsedOuter = JSON.parse(rawText);
    parsed = parsedOuter["予測"] || parsedOuter;
  } catch (e) {
    alert("JSONの形式が正しくありません");
    return;
  }

  const coinValues = {
    "1yen": 1,
    "5yen": 5,
    "10yen": 10,
    "50yen": 50,
    "100yen": 100,
    "500yen": 500,
    "1円": 1,
    "5円": 5,
    "10円": 10,
    "50円": 50,
    "100円": 100,
    "500円": 500
  };

  const count = {};
  let total = 0;

  for (const item of parsed) {
    const label = item["クラス"] || item["class"] || item["name"];
    if (!coinValues[label]) continue;

    count[label] = (count[label] || 0) + 1;
    total += coinValues[label];
  }

  let result = "各硬貨の枚数：<br>";
  for (const [label, num] of Object.entries(count)) {
    result += `${label}: ${num}枚<br>`;
  }
  result += `<br><strong>合計金額: ${total}円</strong>`;

  document.getElementById("result").innerHTML = result;
}
