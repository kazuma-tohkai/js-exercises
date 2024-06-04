// プロパティ名が数値および文字列であるプロパティを持つprototype1(すべて列挙可)
const prototype1 = { 1: 1, "B": "B", 0.2: 0.2, 5: 5, 0.1: 0.1, 0.3: 0.3, "A": "A", "E": "E", 2: 2 }

// prototype1を継承してprototype2を生成
const prototype2 = Object.create(prototype1)
// prototype2にプロパティを追加
prototype2[3] = 3
prototype2.D = "D"

// prototype2を継承してobjを生成
const obj = Object.create(prototype2)
// プロトタイプと同名でないプロパティを追加
obj[4] = 4
obj.C = "C"

// prototype1のプロパティ（列挙可）と同名の列挙不可のプロパティをobjに追加
Object.defineProperty(obj, "A", {
    value: "A",
    writable: true,
    enumerable: false,
    configurable: true,
});

// for/inループで出力
for (const p in obj) {
    console.log(p);
}

// 出力結果
// 4 (objの独自プロパティ)
// C (objの独自プロパティ)
// 3 (prototype2から継承したプロパティ)
// D (prototype2から継承したプロパティ)
// 1 (prototype1から継承したプロパティ)
// 2 (prototype1から継承したプロパティ)
// 5 (prototype1から継承したプロパティ)
// B (prototype1から継承したプロパティ)
// 0.2 (prototype1から継承したプロパティ)
// 0.1 (prototype1から継承したプロパティ)
// 0.3 (prototype1から継承したプロパティ)
// E (prototype1から継承したプロパティ)