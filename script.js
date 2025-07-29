document.getElementById('imageInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    document.getElementById('preview').src = event.target.result;
  };
  reader.readAsDataURL(file);

  // ★ここに推論処理を後で追加予定（今は画像表示だけ）
});
