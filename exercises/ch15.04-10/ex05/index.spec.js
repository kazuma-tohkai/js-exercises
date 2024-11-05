import { expect, test } from "@playwright/test";

test.describe("inline circle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.04-10/ex05");
  });

  // 2つ目のサークルのCSS
  test("second", async ({ page }) => {
    const secondInlineCircle = await page.getByTestId("marble2");
    const inlineStyle = await secondInlineCircle.getAttribute("style");

    const StyleProperties = await page.evaluate((el) => {
      // 一時的な要素を作成し、スタイルを設定
      const tempElement = document.createElement("div");
      tempElement.setAttribute("style", el);

      return {
        borderRadius: tempElement.style.borderRadius,
        borderColor: tempElement.style.borderColor,
        borderWidth: tempElement.style.borderWidth,
        borderStyle: tempElement.style.borderStyle,
        width: tempElement.style.width,
        height: tempElement.style.height,
        backgroundColor: tempElement.style.backgroundColor,
      };
    }, inlineStyle);

    expect(StyleProperties.borderRadius).toBe("50%");
    expect(StyleProperties.borderColor).toBe("gold");
    expect(StyleProperties.borderWidth).toBe("1px");
    expect(StyleProperties.borderStyle).toBe("solid");
    expect(StyleProperties.width).toBe("1.2em");
    expect(StyleProperties.height).toBe("1.2em");
    expect(StyleProperties.backgroundColor).toBe("blue");
  });

  // 3つ目のサークルのCSS
  test("third", async ({ page }) => {
    const thirdInlineCircle = await page.getByTestId("marble3");
    const inlineStyle = await thirdInlineCircle.getAttribute("style");

    const StyleProperties = await page.evaluate((el) => {
      // 一時的な要素を作成し、スタイルを設定
      const tempElement = document.createElement("div");
      tempElement.setAttribute("style", el);

      return {
        borderRadius: tempElement.style.borderRadius,
        borderColor: tempElement.style.borderColor,
        borderWidth: tempElement.style.borderWidth,
        borderStyle: tempElement.style.borderStyle,
        width: tempElement.style.width,
        height: tempElement.style.height,
        backgroundColor: tempElement.style.backgroundColor,
      };
    }, inlineStyle);

    expect(StyleProperties.borderRadius).toBe("20%");
    expect(StyleProperties.borderColor).toBe("blue");
    expect(StyleProperties.borderWidth).toBe("1px");
    expect(StyleProperties.borderStyle).toBe("solid");
    expect(StyleProperties.width).toBe("0.6em");
    expect(StyleProperties.height).toBe("0.6em");
    expect(StyleProperties.backgroundColor).toBe("gold");
  });
});
