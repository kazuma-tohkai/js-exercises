window.addEventListener("load", () => {
  // 位置情報を取得して、脅迫文を表示する
  window.navigator.geolocation.getCurrentPosition((pos) => {
    const h1 = document.createElement("h1");
    h1.textContent = "契約申請手続きが完了しました。";

    const p1 = document.createElement("p");
    p1.textContent = "月額料金は100,000円となっております。";

    const p2 = document.createElement("p");
    const date = new Date();
    date.setDate(date.getDate() + 2);
    p2.textContent = `${Intl.DateTimeFormat("ja-jp", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "narrow",
    }).format(date)}までに申請を取り下げない場合は、契約が成立します。`;

    const p3 = document.createElement("p");
    p3.textContent =
      "申請を取り下げるには、こちらの番号までお電話ください。012-3456-7890";

    const p4 = document.createElement("p");
    p4.textContent =
      "なお、あなたの位置情報は自動記録されております。" +
      "緯度: " +
      pos.coords.latitude +
      " 経度: " +
      pos.coords.longitude;

    document.body.append(h1, p1, p2, p3, p4);
  });
});
