// https://learn.microsoft.com/ja-jp/onedrive/developer/rest-api/?view=odsp-graph-online
// OneDrive REST APIを使用して、ファイルをアップロードする

// 必要最低限のコア機能だけ実装した。

let TOKEN = "";
let file = null;

const inputToken = document.querySelector("#token");
const inputFile = document.querySelector("#file");
const uploadButton = document.querySelector("#upload");

// 改良ポイント：トークンの入力方法を工夫したい
inputToken.addEventListener("change", async (event) => {
  // トークンの取得
  // 必要なトークンは、ユーザーがGraph Explorerで取得したものを入力する仕様
  // Graph Explorerにサインインし、左側メニューのSample queriesの中から何でも良いのでクリックし、
  // 画面中央のデータ表示欄のAccess tokenタブを開くと、トークンが表示されているのでコピーする
  TOKEN = event.target.value;
});

inputFile.addEventListener("change", async (event) => {
  file = event.target.files[0];
  if (!file) {
    return;
  }
});

// アップロードボタンをおしたときの処理
// 改良ポイント：アップロード先のフォルダを指定できるようにしたい
uploadButton.addEventListener("click", async () => {
  if (!TOKEN) {
    alert("トークンを入力してください");
    return;
  }
  if (!file) {
    alert("ファイルを選択してください");
    return;
  }

  // とりあえずrootフォルダにアップロードする
  try {
    const response = await fetch(
      `https://graph.microsoft.com/v1.0/me/drive/root:/${file.name}:/content`,
      {
        method: "PUT",
        // fetch apiへのトークンの設定方法
        // MDN見ても分からなかったので下記のサイトを参考にした
        // https://qiita.com/yonex/items/ce8c38e75efeaf13a07c
        // https://developer.mozilla.org/ja/docs/Web/API/RequestInit
        body: file,
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      }
    );
    console.log(response);

    if (!response.ok) {
      throw new Error("アップロードに失敗しました");
    }
    alert("アップロードが完了しました");
  } catch (error) {
    console.error(error);
    alert(error.message);
  } finally {
    inputFile.value = "";
    file = null;
  }
});
