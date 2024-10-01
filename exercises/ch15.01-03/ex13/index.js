// index.html に対して以下の要素を CSS セレクタで指定して console.log に表示しなさい

// nav 要素内のリンク (<a>)
const navLinks = document.querySelectorAll("nav a");
console.log(navLinks);

// 商品リスト (.product-list) 内の最初の商品 (.product-item)
const productList = document.querySelector(".product-list");
const firstProduct = productList.children[0];
console.log(firstProduct);

// カートアイコンの画像 (<img>)
const cartIcon = document.querySelector("img[alt='カート']");
console.log(cartIcon);

// 商品リスト (.product-list) 内の価格 (.price) を表示する要素
const prices = document.querySelectorAll(".product-list .product-item .price");
console.log(prices);

// 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)
const productImg = document.querySelectorAll(".product-list .product-item img");
console.log(productImg);

// 検索バー (.search-bar) 内の検索ボタン (<button>)
const searchButton = document.querySelector(".search-bar button");
console.log(searchButton);

// フッター (footer) 内のパラグラフ (<p>) 要素
const footerParagraph = document.querySelector("footer p");
console.log(footerParagraph);

// 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
const products = productList.children;
const evenProducts = Array.from(products).filter((product, index) => {
  if ((index + 1) % 2 === 0) return product;
});
console.log(evenProducts);

// ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)
const accountImg = document.querySelector("img[alt='アカウント']");
console.log(accountImg);

// ナビゲーションリンクのうち、"会社情報" のリンク
const companyInfoLink = Array.from(navLinks).find((navLink) => {
  if (navLink.textContent === "会社情報") return navLink;
});
console.log(companyInfoLink);
